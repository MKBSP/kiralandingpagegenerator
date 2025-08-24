'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES } from '@/lib/constants';

interface CompareData {
  subcopy: string;
  disclaimer: string;
  microcopyByCompetitor: {
    [key: string]: {
      tooltip: string;
      sources: Array<{ label: string; href: string }>;
    };
  };
}

interface CompareSectionProps {
  data: CompareData;
  clientName: string;
  brandStyle?: {
    primaryColor?: string;
    fontFamilies: string[];
  };
}

export function CompareSection({ data, clientName, brandStyle }: CompareSectionProps) {
  const [amount, setAmount] = useState('500');
  const [country, setCountry] = useState('Mexico');
  const [competitor, setCompetitor] = useState('wise');
  
  const competitors = [
    { key: 'wise', name: 'Wise' },
    { key: 'remitly', name: 'Remitly' },
    { key: 'westernUnion', name: 'Western Union' }
  ];
  
  // Mock data for comparison
  const ourData = {
    fee: Math.max(2.99, Number(amount) * 0.005),
    rate: country === 'Mexico' ? 20.15 : country === 'Philippines' ? 56.25 : 4.85,
    eta: 'Minutes'
  };
  
  const competitorData = {
    wise: { fee: Number(amount) * 0.012, rate: ourData.rate * 0.98, eta: '1-2 hours' },
    remitly: { fee: 6.99, rate: ourData.rate * 0.95, eta: '30 minutes' },
    westernUnion: { fee: 12.99, rate: ourData.rate * 0.92, eta: '10 minutes' }
  };
  
  const selectedCompetitor = competitorData[competitor as keyof typeof competitorData];
  const currency = country === 'Mexico' ? 'MXN' : country === 'Philippines' ? 'PHP' : 'BRL';
  
  const ourAmount = (Number(amount) - ourData.fee) * ourData.rate;
  const theirAmount = (Number(amount) - selectedCompetitor.fee) * selectedCompetitor.rate;
  
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
            Compare Fees & Delivery Times
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subcopy.replace('{Bank}', clientName)}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Input controls */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Country
                </label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.slice(0, 8).map(countryName => (
                      <SelectItem key={countryName} value={countryName}>
                        {countryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compare vs
                </label>
                <Select value={competitor} onValueChange={setCompetitor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {competitors.map(comp => (
                      <SelectItem key={comp.key} value={comp.key}>
                        {comp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Comparison cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Our card */}
            <div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2"
              style={{ borderColor: brandStyle?.primaryColor || '#1d4ed8' }}
            >
              <div className="text-center mb-4">
                <h3 
                  className="text-xl font-bold mb-1"
                  style={{ color: brandStyle?.primaryColor || '#1d4ed8' }}
                >
                  {clientName}
                </h3>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✨ Recommended
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transfer fee:</span>
                  <span className="font-semibold text-green-600">
                    ${ourData.fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exchange rate:</span>
                  <span className="font-semibold">
                    1 USD = {ourData.rate} {currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery time:</span>
                  <span className="font-semibold text-green-600">
                    {ourData.eta}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Recipient gets:</span>
                  <span 
                    className="text-xl font-bold"
                    style={{ color: brandStyle?.primaryColor || '#1d4ed8' }}
                  >
                    {ourAmount.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })} {currency}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Competitor card */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {competitors.find(c => c.key === competitor)?.name}
                </h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {data.microcopyByCompetitor[competitor]?.tooltip}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transfer fee:</span>
                  <span className="font-semibold text-red-600">
                    ${selectedCompetitor.fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exchange rate:</span>
                  <span className="font-semibold">
                    1 USD = {selectedCompetitor.rate.toFixed(2)} {currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery time:</span>
                  <span className="font-semibold">
                    {selectedCompetitor.eta}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Recipient gets:</span>
                  <span className="text-xl font-bold text-gray-700">
                    {theirAmount.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })} {currency}
                  </span>
                </div>
              </div>
              
              {/* Source link */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2">
                  {data.microcopyByCompetitor[competitor]?.sources?.map((source, index) => (
                    <a
                      key={index}
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center"
                    >
                      {source.label}
                      <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Savings highlight */}
          {ourAmount > theirAmount && (
            <div 
              className="text-center p-4 rounded-lg"
              style={{ 
                backgroundColor: `${brandStyle?.primaryColor || '#059669'}15`
              }}
            >
              <p className="font-semibold" style={{ color: brandStyle?.primaryColor || '#059669' }}>
                💰 You save {(ourAmount - theirAmount).toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })} {currency} with {clientName}
              </p>
            </div>
          )}
          
          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center mt-8">
            {data.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}