'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES } from '@/lib/constants';

interface PricingSectionProps {
  headline: string;
  copy: string;
  ctaText: string;
  ctaHref: string;
  brandStyle?: {
    primaryColor?: string;
    fontFamilies: string[];
  };
}

export function PricingSection({ headline, copy, ctaText, ctaHref, brandStyle }: PricingSectionProps) {
  const [amount, setAmount] = useState('500');
  const [country, setCountry] = useState('Mexico');
  
  // Mock calculation
  const fee = Math.max(2.99, Number(amount) * 0.005);
  const rate = country === 'Mexico' ? 20.15 : country === 'Philippines' ? 56.25 : 4.85;
  const currency = country === 'Mexico' ? 'MXN' : country === 'Philippines' ? 'PHP' : 'BRL';
  const recipientGets = (Number(amount) - fee) * rate;
  
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {copy}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Fee Calculator
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Send (USD)
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500"
                  className="text-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Country
                </label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.slice(0, 10).map(countryName => (
                      <SelectItem key={countryName} value={countryName}>
                        {countryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>You send:</span>
                  <span className="font-medium">${Number(amount).toFixed(2)} USD</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Transfer fee:</span>
                  <span 
                    className="font-medium"
                    style={{ color: brandStyle?.primaryColor || '#059669' }}
                  >
                    ${fee.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Exchange rate:</span>
                  <span className="font-medium">1 USD = {rate} {currency}</span>
                </div>
                
                <hr />
                
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Recipient gets:</span>
                  <span 
                    style={{ color: brandStyle?.primaryColor || '#1d4ed8' }}
                  >
                    {recipientGets.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })} {currency}
                  </span>
                </div>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  ⚡ Arrives in minutes
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                size="lg"
                className="px-8 py-3"
                style={{
                  backgroundColor: brandStyle?.primaryColor || '#1d4ed8',
                  borderColor: brandStyle?.primaryColor || '#1d4ed8',
                }}
                asChild
              >
                <a href={ctaHref}>
                  {ctaText}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}