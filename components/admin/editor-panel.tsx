'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Wand2, Save, Eye, RotateCcw } from 'lucide-react';
import { TONES, LANGUAGES } from '@/lib/constants';

interface Project {
  id: string;
  slug: string;
  clientName: string;
  status: string;
  page?: {
    sections: any;
  };
}

interface EditorPanelProps {
  project: Project;
}

export function EditorPanel({ project }: EditorPanelProps) {
  const [sections, setSections] = useState(project.page?.sections || {});
  const [selectedTone, setSelectedTone] = useState('neutral');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [rewritingField, setRewritingField] = useState<string | null>(null);
  
  const sectionLabels = {
    hero: 'Hero Section',
    howItWorks: 'How It Works',
    pricing: 'Transparent Pricing',
    why: 'Why Choose Us',
    stories: 'Customer Stories',
    compliance: 'Regulatory & Compliance',
    compare: 'Compare Fees & Times',
    finalCta: 'Final Call-to-Action',
    footer: 'Footer'
  };
  
  const handleFieldUpdate = (sectionKey: string, fieldPath: string, value: string) => {
    setSections((prev: any) => {
      const newSections = { ...prev };
      const pathParts = fieldPath.split('.');
      let current = newSections[sectionKey];
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      current[pathParts[pathParts.length - 1]] = value;
      return newSections;
    });
  };
  
  const rewriteField = async (sectionKey: string, fieldPath: string, currentText: string) => {
    const fullPath = `${sectionKey}.${fieldPath}`;
    setRewritingField(fullPath);
    
    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          fields: [{ path: fullPath, text: currentText }],
          tone: selectedTone,
          language: selectedLanguage
        })
      });
      
      if (!response.ok) throw new Error('Rewrite failed');
      
      const result = await response.json();
      
      if (result.rewrites && result.rewrites.length > 0) {
        handleFieldUpdate(sectionKey, fieldPath, result.rewrites[0].text);
      }
      
      if (result.warnings && result.warnings.length > 0) {
        console.warn('Rewrite warnings:', result.warnings);
      }
    } catch (error) {
      console.error('Rewrite error:', error);
      alert('Failed to rewrite content. Please try again.');
    } finally {
      setRewritingField(null);
    }
  };
  
  const saveChanges = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch(`/api/projects/${project.id}/sections`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sections)
      });
      
      if (!response.ok) throw new Error('Save failed');
      
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderField = (
    sectionKey: string,
    fieldPath: string,
    value: string,
    label: string,
    rows: number = 2
  ) => {
    const fullPath = `${sectionKey}.${fieldPath}`;
    const isRewriting = rewritingField === fullPath;
    
    return (
      <div key={fieldPath} className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{label}</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => rewriteField(sectionKey, fieldPath, value)}
            disabled={isRewriting || !value.trim()}
            className="h-7 px-2"
          >
            {isRewriting ? (
              <Spinner size="sm" className="mr-1" />
            ) : (
              <Wand2 className="w-3 h-3 mr-1" />
            )}
            {isRewriting ? 'Rewriting...' : 'Rewrite with AI'}
          </Button>
        </div>
        <Textarea
          value={value}
          onChange={(e) => handleFieldUpdate(sectionKey, fieldPath, e.target.value)}
          rows={rows}
          className="resize-none"
          disabled={isRewriting}
        />
      </div>
    );
  };
  
  const renderArrayField = (
    sectionKey: string,
    fieldPath: string,
    items: any[],
    itemRenderer: (item: any, index: number) => React.ReactNode
  ) => {
    return (
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="p-3 border rounded-lg bg-gray-50">
            {itemRenderer(item, index)}
          </div>
        ))}
      </div>
    );
  };
  
  if (project.status !== 'ready') {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <Spinner className="mx-auto mb-4" />
          <p className="text-lg font-medium">
            {project.status === 'pending' ? 'Processing your brand...' : 'Something went wrong'}
          </p>
          <p className="text-gray-600 mt-2">
            {project.status === 'pending' 
              ? 'We\'re analyzing your website and generating your landing page. This usually takes 30-60 seconds.'
              : 'Please try creating a new project.'
            }
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Edit Landing Page Content</CardTitle>
              <p className="text-gray-600 mt-1">
                Project: {project.clientName} • 
                <a 
                  href={`/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  View Live Page
                </a>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{project.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Tone:</Label>
              <Select value={selectedTone} onValueChange={setSelectedTone}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map(tone => (
                    <SelectItem key={tone.key} value={tone.key}>
                      {tone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Language:</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.filter(lang => lang.key !== 'auto').map(lang => (
                    <SelectItem key={lang.key} value={lang.key}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={saveChanges} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
          
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-9">
              {Object.keys(sectionLabels).map(key => (
                <TabsTrigger key={key} value={key} className="text-xs">
                  {sectionLabels[key as keyof typeof sectionLabels].split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(sections).map(([sectionKey, sectionData]: [string, any]) => (
              <TabsContent key={sectionKey} value={sectionKey} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {sectionLabels[sectionKey as keyof typeof sectionLabels]}
                </h3>
                
                {/* Hero Section */}
                {sectionKey === 'hero' && (
                  <div className="space-y-4">
                    {renderField(sectionKey, 'headline', sectionData.headline, 'Headline', 2)}
                    {renderField(sectionKey, 'subheadline', sectionData.subheadline, 'Subheadline', 3)}
                    {renderField(sectionKey, 'primaryCtaText', sectionData.primaryCtaText, 'Button Text', 1)}
                  </div>
                )}
                
                {/* How It Works Section */}
                {sectionKey === 'howItWorks' && (
                  <div className="space-y-4">
                    {renderField(sectionKey, 'headline', sectionData.headline, 'Headline', 1)}
                    {renderField(sectionKey, 'copy', sectionData.copy, 'Supporting Copy', 2)}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Steps</Label>
                      {renderArrayField(sectionKey, 'steps', sectionData.steps, (step, index) => (
                        <div className="space-y-2">
                          {renderField(sectionKey, `steps.${index}.title`, step.title, `Step ${index + 1} Title`, 1)}
                          {renderField(sectionKey, `steps.${index}.body`, step.body, `Step ${index + 1} Description`, 2)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Other sections with similar patterns... */}
                {sectionKey === 'pricing' && (
                  <div className="space-y-4">
                    {renderField(sectionKey, 'headline', sectionData.headline, 'Headline', 1)}
                    {renderField(sectionKey, 'copy', sectionData.copy, 'Copy', 3)}
                    {renderField(sectionKey, 'ctaText', sectionData.ctaText, 'CTA Text', 1)}
                  </div>
                )}
                
                {sectionKey === 'finalCta' && (
                  <div className="space-y-4">
                    {renderField(sectionKey, 'headline', sectionData.headline, 'Headline', 2)}
                    {renderField(sectionKey, 'ctaText', sectionData.ctaText, 'Button Text', 1)}
                    {renderField(sectionKey, 'subcopy', sectionData.subcopy, 'Subcopy', 2)}
                  </div>
                )}
                
                {/* Add other section renderers as needed */}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}