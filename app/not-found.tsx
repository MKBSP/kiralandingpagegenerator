import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            The landing page you're looking for doesn't exist or may have expired.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/admin">
              Create New Landing Page
            </Link>
          </Button>
          
          <p className="text-sm text-gray-500">
            Demo pages automatically expire after 48 hours
          </p>
        </div>
        
        <div className="mt-8 text-xs text-gray-400">
          <p>Need help? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
}