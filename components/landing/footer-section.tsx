interface FooterLink {
  label: string;
  href: string;
}

interface FooterSectionProps {
  links: FooterLink[];
  clientName: string;
  brandStyle?: {
    primaryColor?: string;
    logoUrl?: string;
    fontFamilies: string[];
  };
}

export function FooterSection({ links, clientName, brandStyle }: FooterSectionProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {brandStyle?.logoUrl ? (
              <img 
                src={brandStyle.logoUrl} 
                alt={`${clientName} Logo`} 
                className="h-8 w-auto object-contain mb-4 filter brightness-0 invert"
              />
            ) : (
              <h3 
                className="text-xl font-bold mb-4"
                style={{ 
                  fontFamily: brandStyle?.fontFamilies?.[0] || 'Inter, system-ui, sans-serif'
                }}
              >
                {clientName}
              </h3>
            )}
            <p className="text-gray-400 text-sm leading-relaxed">
              Send money home safely, quickly, and affordably. Licensed and regulated financial services you can trust.
            </p>
          </div>
          
          {/* Links columns */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  {links.filter(link => 
                    ['About Us', 'About'].some(keyword => link.label.includes(keyword))
                  ).concat(links.slice(0, 2)).map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-3">
                  {links.filter(link => 
                    ['Support', 'FAQ', 'Help'].some(keyword => link.label.includes(keyword))
                  ).concat([
                    { label: 'Call Us: 1-800-TRANSFER', href: 'tel:1-800-8726733' },
                    { label: 'WhatsApp Support', href: 'https://wa.me/18008726733' }
                  ]).map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-3">
                  {links.filter(link => 
                    ['Security', 'Terms', 'Privacy', 'Compliance'].some(keyword => link.label.includes(keyword))
                  ).map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 {clientName}. All rights reserved. Licensed Money Service Business.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-7-4z" />
                </svg>
                <span className="text-xs text-gray-500">FDIC</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" />
                </svg>
                <span className="text-xs text-gray-500">256-bit SSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-500">FinCEN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}