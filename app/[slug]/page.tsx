import { notFound } from 'next/navigation';
import { prisma } from '@/lib/database';
import { LandingPageTemplate } from '@/templates/landing-page-template';
import type { Metadata } from 'next';
export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      brandStyle: true,
      page: true
    }
  });

  if (!project || !project.page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    };
  }

  const sections = project.page.sections as any;
  
  return {
    title: `${project.clientName} - Send Money Home Safely & Affordably`,
    description: sections.hero?.subheadline || `Send money internationally with ${project.clientName}. Low fees, great rates, fast delivery.`,
    keywords: 'money transfer, remittance, international payments, send money abroad',
    openGraph: {
      title: `${project.clientName} - Money Transfer Services`,
      description: sections.hero?.subheadline || `Send money internationally with ${project.clientName}`,
      type: 'website',
      images: [
        {
          url: sections.hero?.visual?.imageUrl || 'https://images.pexels.com/photos/7414284/pexels-photo-7414284.jpeg',
          width: 1200,
          height: 630,
          alt: `${project.clientName} Money Transfer Services`
        }
      ]
    },
    icons: {
      icon: project.brandStyle?.faviconUrl || '/favicon.ico',
    },
    robots: process.env.DEMO_MODE === 'true' ? 'noindex, nofollow' : 'index, follow'
  };
}

export default async function LandingPage({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      brandStyle: true,
      page: true
    }
  });

  if (!project || !project.page || project.status !== 'ready') {
    notFound();
  }

  // Check if page has expired (demo mode)
  if (project.expiresAt && new Date() > project.expiresAt) {
    notFound();
  }

  const sections = project.page.sections as any;
  const isDemo = process.env.DEMO_MODE === 'true' || !!project.expiresAt;

  return (
    <LandingPageTemplate
      sections={sections}
      clientName={project.clientName}
      brandStyle={
        project.brandStyle
          ? {
              primaryColor: project.brandStyle.primaryColor ?? undefined,
              secondaryColor: project.brandStyle.secondaryColor ?? undefined,
              accentColor: project.brandStyle.accentColor ?? undefined,
              fontFamilies: project.brandStyle.fontFamilies ?? [],
              logoUrl: project.brandStyle.logoUrl ?? undefined,
              faviconUrl: project.brandStyle.faviconUrl ?? undefined,
            }
          : undefined
      }
      isDemo={isDemo}
    />
  );
}

/* Static export for [slug] is disabled due to Prisma/Postgres limitations during build.
   This page will use runtime rendering (ISR/SSR) only.
*/

// Enable ISR with revalidation
export const revalidate = process.env.NODE_ENV === 'production' ? 3600 : 0; // 1 hour in production