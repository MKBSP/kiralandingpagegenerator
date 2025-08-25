// pages/api/projects/[id]/sections.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid project id' });
    return;
  }

  switch (method) {
    case 'GET':
      try {
        const project = await prisma.project.findUnique({
          where: { id },
          include: { page: true },
        });
        if (!project?.page) {
          res.status(404).json({ error: 'Project or page not found' });
          return;
        }
        res.status(200).json(project.page.sections);
      } catch (error) {
        console.error('Get sections error:', error);
        res.status(500).json({ error: 'Failed to fetch sections' });
      }
      break;

    case 'PUT':
      try {
        const sections = req.body;
        const project = await prisma.project.findUnique({
          where: { id },
          include: { page: true },
        });
        if (!project?.page) {
          res.status(404).json({ error: 'Project or page not found' });
          return;
        }
        const updatedPage = await prisma.page.update({
          where: { id: project.page.id },
          data: {
            sections,
            updatedAt: new Date(),
          },
        });
        res.status(200).json({ success: true, sections: updatedPage.sections });
      } catch (error) {
        console.error('Update sections error:', error);
        res.status(500).json({ error: 'Failed to update sections' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}