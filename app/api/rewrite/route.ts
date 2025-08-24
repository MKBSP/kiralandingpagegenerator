import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rewriteContent, RewriteRequest } from '@/lib/anthropic';
import { prisma } from '@/lib/database';

const rewriteSchema = z.object({
  projectId: z.string(),
  fields: z.array(z.object({
    path: z.string(),
    text: z.string()
  })),
  tone: z.enum(['corporate', 'neutral', 'friendly']),
  language: z.enum(['en', 'es', 'pt']),
  styleHints: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = rewriteSchema.parse(body);
    
    // Get project info for context
    const project = await prisma.project.findUnique({
      where: { id: data.projectId },
      include: { brandStyle: true }
    });
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    const rewriteRequest: RewriteRequest = {
      tone: data.tone,
      language: data.language,
      fields: data.fields,
      styleHints: data.styleHints || project.brandStyle?.styleNotes?.toString(),
      clientName: project.clientName
    };
    
    const result = await rewriteContent(rewriteRequest);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Rewrite error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to rewrite content' },
      { status: 500 }
    );
  }
}