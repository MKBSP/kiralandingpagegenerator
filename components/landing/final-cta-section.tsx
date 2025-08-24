import { Button } from '@/components/ui/button';

interface FinalCtaSectionProps {
  headline: string;
  ctaText: string;
  ctaHref: string;
  subcopy: string;
  brandStyle?: {
    primaryColor?: string;
    fontFamilies: string[];
  };
}

export function FinalCtaSection({ 
  headline, 
  ctaText, 
  ctaHref, 
  subcopy, 
  brandStyle 
}: FinalCtaSectionProps) {
  return (
    <section 
      className="py-24 text-white relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${brandStyle?.primaryColor || '#1d4ed8'} 0%, ${brandStyle?.primaryColor ? `${brandStyle.primaryColor}dd` : '#1e40af'} 100%)`
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="text-3xl lg:text-5xl font-bold mb-6 leading-tight"
          style={{ 
            fontFamily: brandStyle?.fontFamilies?.[0] || 'Inter, system-ui, sans-serif'
          }}
        >
          {headline}
        </h2>
        
        <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
          {subcopy}
        </p>
        
        <div className="space-y-4">
          <Button 
            size="lg"
            variant="secondary"
            className="text-lg px-12 py-4 h-auto text-gray-900 bg-white hover:bg-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            asChild
          >
            <a href={ctaHref}>
              {ctaText}
            </a>
          </Button>
          
          <div className="flex justify-center items-center space-x-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No signup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>First transfer on us</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Ready in 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}