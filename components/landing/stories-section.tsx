interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

interface StoriesSectionProps {
  headline: string;
  testimonials: Testimonial[];
  images?: string[];
  brandStyle?: {
    primaryColor?: string;
    fontFamilies: string[];
  };
}

export function StoriesSection({ headline, testimonials, images, brandStyle }: StoriesSectionProps) {
  return (
    <section className="py-24 bg-white">
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
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-2xl p-8 relative"
            >
              {/* Quote mark */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                style={{ 
                  backgroundColor: brandStyle?.primaryColor || '#1d4ed8'
                }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Star rating */}
        <div className="text-center mt-16">
          <div className="flex justify-center items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className="w-6 h-6 text-yellow-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600">
            Rated 4.9/5 by over 10,000+ customers
          </p>
        </div>
      </div>
    </section>
  );
}