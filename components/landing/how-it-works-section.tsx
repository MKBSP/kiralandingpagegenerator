interface Step {
  title: string;
  body: string;
}

interface HowItWorksSectionProps {
  headline: string;
  steps: Step[];
  copy: string;
  brandStyle?: {
    primaryColor?: string;
    fontFamilies: string[];
  };
}

export function HowItWorksSection({ headline, steps, copy, brandStyle }: HowItWorksSectionProps) {
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {copy}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6"
                style={{ 
                  backgroundColor: brandStyle?.primaryColor || '#1d4ed8'
                }}
              >
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
        
        {/* Flow visualization */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-4 max-w-4xl overflow-x-auto pb-4">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ 
                    backgroundColor: brandStyle?.primaryColor || '#1d4ed8'
                  }}
                />
                {index < steps.length - 1 && (
                  <div 
                    className="w-24 h-0.5 mx-4"
                    style={{ 
                      backgroundColor: brandStyle?.primaryColor || '#1d4ed8',
                      opacity: 0.3
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}