interface Badge {
  name: string;
  logoUrl?: string;
}

interface ComplianceSectionProps {
  headline: string;
  copy: string;
  badges: Badge[];
  linkText: string;
  linkHref: string;
  brandStyle?: {
    primaryColor?: string;
    fontFamilies: string[];
  };
}

export function ComplianceSection({ 
  headline, 
  copy, 
  badges, 
  linkText, 
  linkHref, 
  brandStyle 
}: ComplianceSectionProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
            style={{ 
              fontFamily: brandStyle?.fontFamilies?.[0] || 'Inter, system-ui, sans-serif'
            }}
          >
            {headline}
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            {copy}
          </p>
          
          {/* Compliance badges */}
          {badges.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {badges.map((badge, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center justify-center mb-4">
                    {badge.logoUrl ? (
                      <img 
                        src={badge.logoUrl} 
                        alt={badge.name}
                        className="h-12 object-contain"
                      />
                    ) : (
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${brandStyle?.primaryColor || '#1d4ed8'}15`
                        }}
                      >
                        <svg 
                          className="w-8 h-8" 
                          style={{ color: brandStyle?.primaryColor || '#1d4ed8' }} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M10 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-7-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {badge.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
          
          <a 
            href={linkHref}
            className="inline-flex items-center font-semibold hover:underline"
            style={{ color: brandStyle?.primaryColor || '#1d4ed8' }}
          >
            {linkText}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}