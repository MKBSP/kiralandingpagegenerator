import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/database';
import { scrapeBrandData, createBrandStyle } from '@/lib/brand-scraper';
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
    processBrandScraping(project.id, data.sourceUrl, data.clientName, data.templateKey);
    
    return NextResponse.json({
      projectId: project.id,
      slug: project.slug,
      status: project.status
    });
    
  } catch (error) {
    console.error('Create project error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
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

async function processBrandScraping(projectId: string, sourceUrl: string, clientName: string, templateKey: string) {
  try {
    // Scrape brand data
    const brandData = await scrapeBrandData(sourceUrl);
    
    // Create brand style
    const brandStyle = await createBrandStyle(projectId, brandData);
    
    // Select template
    const finalTemplateKey = selectTemplate(brandStyle, templateKey);
    
    // Create page with sections
    await createPage(projectId, clientName);
    
    // Update project status
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: 'ready',
        templateKey: finalTemplateKey
      }
    });
    
    console.log(`Project ${projectId} processed successfully`);
    
  } catch (error) {
    console.error(`Brand scraping failed for project ${projectId}:`, error);
    
    await prisma.project.update({
      where: { id: projectId },
      data: { status: 'error' }
    });
  }
}