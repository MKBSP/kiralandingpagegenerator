import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/database';
import { createPage, generateSlug, selectTemplate } from '@/lib/page-generator';

const createProjectSchema = z.object({
  sourceUrl: z.string().url(),
  clientName: z.string().min(1),
  templateKey: z.string().default('auto'),
  tone: z.enum(['corporate', 'neutral', 'friendly']).default('neutral'),
  locale: z.enum(['auto', 'en', 'es', 'pt']).default('auto')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createProjectSchema.parse(body);
    
    // Check for existing projects with similar names
    const existingProjects = await prisma.project.findMany({
      select: { slug: true }
    });
    const existingSlugs = existingProjects.map(p => p.slug);
    
    // Generate unique slug
    const slug = generateSlug(data.clientName, existingSlugs);
    
    // Create project
    const project = await prisma.project.create({
      data: {
        slug,
        clientName: data.clientName,
        sourceUrl: data.sourceUrl,
        templateKey: data.templateKey,
        tone: data.tone,
        locale: data.locale,
        status: 'pending',
        expiresAt: process.env.DEMO_MODE === 'true' 
          ? new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours
          : null
      }
    });
    
    // Start background processing (in a real app, this would be queued)
    // Dynamically import BullMQ and enqueue job only at runtime
    if (process.env.NODE_ENV !== 'test') {
      const { Queue } = await import('bullmq');
      const redisConnection = {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
      };
      const brandScrapeQueue = new Queue('brandScrape', { connection: redisConnection });
      await brandScrapeQueue.add('brandScrape', {
        projectId: project.id,
        sourceUrl: data.sourceUrl,
        clientName: data.clientName,
        templateKey: data.templateKey,
      });
    }
    
    return NextResponse.json({
      projectId: project.id,
      slug: project.slug,
      status: project.status
    });
    
  } catch (error) {
    console.error('Create project error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
  }
  
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        brandStyle: true,
        page: true
      }
    });
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

/*
  Brand scraping and page generation is now handled by the BullMQ worker.
  This function is no longer needed in the API route.
*/