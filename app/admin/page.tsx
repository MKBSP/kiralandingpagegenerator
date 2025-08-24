'use client';

import { useState } from 'react';
import { ProjectForm } from '@/components/admin/project-form';
import { EditorPanel } from '@/components/admin/editor-panel';

interface Project {
  id: string;
  slug: string;
  clientName: string;
  status: string;
  page?: {
    sections: any;
  };
}

export default function AdminPage() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleProjectSuccess = async (result: { projectId: string; slug: string }) => {
    setIsLoading(true);
    
    // Poll for project completion
    const pollProject = async () => {
      try {
        const response = await fetch(`/api/projects?id=${result.projectId}`);
        if (response.ok) {
          const project = await response.json();
          
          if (project.status === 'ready') {
            setCurrentProject(project);
            setIsLoading(false);
          } else if (project.status === 'error') {
            alert('Project generation failed. Please try again.');
            setIsLoading(false);
          } else {
            // Still processing, poll again
            setTimeout(pollProject, 2000);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
        setTimeout(pollProject, 2000);
      }
    };
    
    pollProject();
  };
  
  const handleNewProject = () => {
    setCurrentProject(null);
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Demo Banner */}
      <div className="bg-yellow-300 border-b border-yellow-400 px-4 py-2">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium text-yellow-800">
            🚀 Demo Mode - AI-Generated Content - Pages Auto-Expire After 48 Hours
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Landing Page Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate beautiful, brand-matched landing pages for financial services in minutes. 
            Just provide a corporate website URL and we'll handle the rest.
          </p>
        </div>
        
        {!currentProject && !isLoading && (
          <ProjectForm onSuccess={handleProjectSuccess} />
        )}
        
        {isLoading && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Generating Your Landing Page</h2>
              <p className="text-gray-600 mb-4">
                Our AI is analyzing your brand and creating a custom landing page. This typically takes 30-60 seconds.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>✓ Scraping brand colors and fonts</p>
                <p>✓ Extracting logo and imagery</p>
                <p>✓ Detecting language and tone</p>
                <p>✓ Generating optimized content</p>
              </div>
            </div>
          </div>
        )}
        
        {currentProject && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Landing page generated successfully!
                  </h3>
                  <div className="mt-2 text-sm text-green-700 space-x-4">
                    <a 
                      href={`/${currentProject.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline hover:text-green-600"
                    >
                      View Live Page →
                    </a>
                    <button 
                      onClick={handleNewProject}
                      className="font-medium underline hover:text-green-600"
                    >
                      Create Another Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <EditorPanel project={currentProject} />
          </div>
        )}
      </div>
    </div>
  );
}