import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Examples', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#131313]">
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center">
          <span className="font-inter font-bold tracking-tighter text-[#E5E2E1] text-xl">
            Meta Agent Harness
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-space-grotesk text-[12px] font-bold tracking-widest uppercase text-[#E5E2E1]/70 hover:text-[#00F2FF] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#E5E2E1]/70 hover:text-[#00F2FF] p-2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-space-grotesk text-[12px] font-bold tracking-widest uppercase text-[#E5E2E1]/70 hover:text-[#00F2FF] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
