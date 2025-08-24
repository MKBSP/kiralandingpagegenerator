import { HeroSection } from '@/components/landing/hero-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { WhySection } from '@/components/landing/why-section';
import { StoriesSection } from '@/components/landing/stories-section';
import { ComplianceSection } from '@/components/landing/compliance-section';
import { CompareSection } from '@/components/landing/compare-section';
import { FinalCtaSection } from '@/components/landing/final-cta-section';
import { FooterSection } from '@/components/landing/footer-section';

interface LandingPageTemplateProps {
  sections: any;
  clientName: string;
  brandStyle?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    fontFamilies: string[];
    logoUrl?: string;
    faviconUrl?: string;
  };
  isDemo?: boolean;
}

export function LandingPageTemplate({ 
  sections, 
  clientName, 
  brandStyle, 
  isDemo 
}: LandingPageTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Demo Banner */}
      {isDemo && (
        <div className="bg-yellow-300 border-b border-yellow-400 px-4 py-2 relative z-50">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-medium text-yellow-800">
              🚀 Demo Only - AI-Generated Content - This page will auto-expire after 48 hours
            </p>
          </div>
        </div>
      )}
      
      {/* Global font styles */}
      <style jsx global>{`
        body {
          font-family: ${brandStyle?.fontFamilies?.[1] || brandStyle?.fontFamilies?.[0] || 'Inter, system-ui, sans-serif'};
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: ${brandStyle?.fontFamilies?.[0] || 'Inter, system-ui, sans-serif'};
        }
      `}</style>
      
      {sections.hero && (
        <HeroSection
          headline={sections.hero.headline}
          subheadline={sections.hero.subheadline}
          countries={sections.hero.countries}
          primaryCtaText={sections.hero.primaryCtaText}
          primaryCtaHref={sections.hero.primaryCtaHref}
          visual={sections.hero.visual}
          brandStyle={brandStyle}
        />
      )}
      
      {sections.howItWorks && (
        <HowItWorksSection
          headline={sections.howItWorks.headline}
          steps={sections.howItWorks.steps}
          copy={sections.howItWorks.copy}
          brandStyle={brandStyle}
        />
      )}
      
      {sections.pricing && (
        <PricingSection
          headline={sections.pricing.headline}
          copy={sections.pricing.copy}
          ctaText={sections.pricing.ctaText}
          ctaHref={sections.pricing.ctaHref}
          brandStyle={brandStyle}
        />
      )}
      
      {sections.why && (
        <WhySection
          headline={sections.why.headline}
          bullets={sections.why.bullets}
          trustBadges={sections.why.trustBadges}
          brandStyle={brandStyle}
        />
      )}
      
      {sections.stories && (
        <StoriesSection
          headline={sections.stories.headline}
          testimonials={sections.stories.testimonials}
          images={sections.stories.images}
          brandStyle={brandStyle}
        />
      )}
      
      {sections.compliance && (
        <ComplianceSection
          headline={sections.compliance.headline}
          copy={sections.compliance.copy}
          badges={sections.compliance.badges}
          linkText={sections.compliance.linkText}
          linkHref={sections.compliance.linkHref}
          brandStyle={brandStyle}
        />
      )}
      
      {sections.compare && (
        <CompareSection
          data={sections.compare}
          clientName={clientName}
          brandStyle={brandStyle}
        />
      )}
      
      {sections.finalCta && (
        <FinalCtaSection
          headline={sections.finalCta.headline}
          ctaText={sections.finalCta.ctaText}
          ctaHref={sections.finalCta.ctaHref}
          subcopy={sections.finalCta.subcopy}
          brandStyle={brandStyle}
        />
      )}
      
      {sections.footer && (
        <FooterSection
          links={sections.footer.links}
          clientName={clientName}
          brandStyle={brandStyle}
        />
      )}
    </div>
  );
}