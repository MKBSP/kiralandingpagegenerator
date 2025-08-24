interface Bullet {
  title: string;
  body: string;
}

interface TrustBadge {
  name: string;
  logoUrl?: string;
}

interface WhySectionProps {
  headline: string;
  bullets: Bullet[];
  trustBadges: TrustBadge[];
  brandStyle?: {
    primaryColor?: string;
    fontFamilies: string[];
  };
}

export function WhySection({ headline, bullets, trustBadges, brandStyle }: WhySectionProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            style={{ 
              fontFamily: brandStyle?.fontFamilies?.[0] || 'Inter, system-ui, sans-serif'
            }}
          >
            {headline}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {bullets.map((bullet, index) => (
            <div key={index} className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ 
                  backgroundColor: `${brandStyle?.primaryColor || '#1d4ed8'}15`
                }}
              >
                {index === 0 && (
                  <svg className="w-8 h-8" style={{ color: brandStyle?.primaryColor || '#1d4ed8' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-7-4z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-8 h-8" style={{ color: brandStyle?.primaryColor || '#1d4ed8' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-8 h-8" style={{ color: brandStyle?.primaryColor || '#1d4ed8' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {bullet.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {bullet.body}
              </p>
            </div>
          ))}
        </div>
        
        {/* Trust badges */}
        {trustBadges.length > 0 && (
          <div className="text-center">
            <p className="text-gray-600 mb-8">Trusted and regulated by:</p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center">
                  {badge.logoUrl ? (
                    <img 
                      src={badge.logoUrl} 
                      alt={badge.name}
                      className="h-8 object-contain grayscale"
                    />
                  ) : (
                    <div className="px-4 py-2 bg-gray-200 rounded text-sm font-medium text-gray-600">
                      {badge.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}