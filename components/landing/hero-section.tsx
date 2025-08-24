'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  countries: string[];
  primaryCtaText: string;
  primaryCtaHref: string;
  visual: {
    imageUrl: string;
    overlayMockUrl?: string;
  };
  brandStyle?: {
    primaryColor?: string;
    logoUrl?: string;
    fontFamilies: string[];
  };
}

export function HeroSection({ 
  headline, 
  subheadline, 
  countries, 
  primaryCtaText, 
  primaryCtaHref, 
  visual,
  brandStyle 
}: HeroSectionProps) {
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isPaused || countries.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentCountryIndex((prev) => (prev + 1) % countries.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [countries.length, isPaused]);
  
  const currentCountry = countries[currentCountryIndex] || 'your family';
  
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      {/* Background Image */}
      {visual.imageUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${visual.imageUrl})` }}
        />
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Logo */}
            {brandStyle?.logoUrl && (
              <img 
                src={brandStyle.logoUrl} 
                alt="Logo" 
                className="h-12 w-auto object-contain"
              />
            )}
            
            {/* Headline */}
            <h1 
              className="text-4xl lg:text-6xl font-bold leading-tight"
              style={{ 
                fontFamily: brandStyle?.fontFamilies?.[0] || 'Inter, system-ui, sans-serif'
              }}
            >
              {headline}
            </h1>
            
            {/* Subheadline with country rotator */}
            <p 
              className="text-xl lg:text-2xl text-blue-100 leading-relaxed"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-live="polite"
            >
              {subheadline.replace('{Country}', currentCountry)}
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg"
                className="text-lg px-8 py-4 h-auto"
                style={{
                  backgroundColor: brandStyle?.primaryColor || '#1d4ed8',
                  borderColor: brandStyle?.primaryColor || '#1d4ed8',
                }}
                asChild
              >
                <a href={primaryCtaHref}>
                  {primaryCtaText}
                </a>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-7-4z" />
                </svg>
                <span className="text-sm">FDIC Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" />
                </svg>
                <span className="text-sm">256-bit SSL</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Licensed in All 50 States</span>
              </div>
            </div>
          </div>
          
          {/* Visual/Mock */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-4">
                <div className="text-center text-white/80 text-sm">Transfer Preview</div>
                <div className="bg-white rounded-lg p-6 text-gray-900">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>You send:</span>
                      <span className="font-bold">$500.00 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transfer fee:</span>
                      <span className="text-green-600">$2.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Exchange rate:</span>
                      <span>1 USD = 20.15 MXN</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Recipient gets:</span>
                      <span>$9,974.85 MXN</span>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      Arrives in minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}