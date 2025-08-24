import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { z } from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { page: true }
    });
    
    if (!project?.page) {
      return NextResponse.json({ error: 'Project or page not found' }, { status: 404 });
    }
    
    return NextResponse.json(project.page.sections);
  } catch (error) {
    console.error('Get sections error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sections = await request.json();
    
    // Find the project and its page
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { page: true }
    });
    
    if (!project?.page) {
      return NextResponse.json({ error: 'Project or page not found' }, { status: 404 });
    }
    
    // Update sections
    const updatedPage = await prisma.page.update({
      where: { id: project.page.id },
      data: {
        sections,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({ success: true, sections: updatedPage.sections });
  } catch (error) {
    console.error('Update sections error:', error);
    return NextResponse.json(
      { error: 'Failed to update sections' },
      { status: 500 }
    );
  }
}