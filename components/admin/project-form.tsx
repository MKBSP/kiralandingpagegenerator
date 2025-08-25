'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { TEMPLATES, TONES, LANGUAGES } from '@/lib/constants';

const formSchema = z.object({
  sourceUrl: z.string().url('Please enter a valid URL'),
  clientName: z.string().min(1, 'Client name is required'),
  templateKey: z.string(),
  tone: z.enum(['corporate', 'neutral', 'friendly']),
  locale: z.enum(['auto', 'en', 'es', 'pt'])
});

type FormData = z.infer<typeof formSchema>;

interface ProjectFormProps {
  onSuccess: (project: { projectId: string; slug: string }) => void;
}

export function ProjectForm({ onSuccess }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceUrl: '',
      clientName: '',
      templateKey: 'auto',
      tone: 'neutral',
      locale: 'auto'
    }
  });
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      
      const result = await response.json();
      onSuccess(result);
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate AI-Powered Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sourceUrl">Corporate Website URL *</Label>
            <Input
              id="sourceUrl"
              placeholder="https://example-bank.com"
              {...register('sourceUrl')}
              disabled={isLoading}
            />
            {errors.sourceUrl && (
              <p className="text-sm text-red-600">{errors.sourceUrl.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Display Name *</Label>
            <Input
              id="clientName"
              placeholder="Acme Bank"
              {...register('clientName')}
              disabled={isLoading}
            />
            {errors.clientName && (
              <p className="text-sm text-red-600">{errors.clientName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="templateKey">Template Family</Label>
            <Select
              value={watch('templateKey')}
              onValueChange={(value) => setValue('templateKey', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATES.map(template => (
                  <SelectItem key={template.key} value={template.key}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tone">Tone Control (Optional)</Label>
            <Select
              value={watch('tone')}
              onValueChange={(value) => setValue('tone', value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
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
          
          <div className="space-y-2">
            <Label htmlFor="locale">Language</Label>
            <Select
              value={watch('locale')}
              onValueChange={(value) => setValue('locale', value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map(lang => (
                  <SelectItem key={lang.key} value={lang.key}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Generating Landing Page...
              </>
            ) : (
              'Generate Landing Page'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}