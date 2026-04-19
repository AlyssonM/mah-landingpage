const resourcesLinks = [
  { label: 'Documentation', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Examples', href: '#' },
  { label: 'Changelog', href: '#' },
];

const communityLinks = [
  { label: 'Discord', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'Contributor Guide', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] w-full border-t border-white/5 font-inter">
      {/* Main Footer Content Shell */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-12 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Left Column: Branding */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#00F2FF]" style={{ boxShadow: '0 0 15px rgba(0,242,255,0.4)' }}></div>
            <span className="font-inter font-black text-2xl tracking-tighter text-[#e5e2e1]">MAH</span>
          </div>
          <div className="space-y-2">
            <p className="font-space-grotesk text-[#e5e2e1]/50 text-sm tracking-wide">Meta-Agents Harness</p>
            <p className="text-[#e5e2e1]/50 text-xs max-w-[240px] leading-relaxed">
              Open source agent orchestration for developers who ship.
            </p>
          </div>
        </div>

        {/* Center Column: Technical Resources */}
        <div className="flex flex-col gap-6">
          <h4 className="font-space-grotesk text-xs uppercase tracking-widest text-[#e5e2e1]/40 font-bold">Resources</h4>
          <nav className="flex flex-col gap-4">
            {resourcesLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-space-grotesk text-sm text-[#b9cacb]/60 hover:text-[#00F2FF] hover:translate-x-1 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Column: Community & Engagement */}
        <div className="flex flex-col md:items-end">
          <div className="w-full md:max-w-[200px]">
            <h4 className="font-space-grotesk text-xs uppercase tracking-widest text-[#e5e2e1]/40 font-bold mb-6">Connect</h4>
            <nav className="flex flex-col gap-4">
              {communityLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-space-grotesk text-sm text-[#b9cacb]/60 hover:text-[#00F2FF] hover:translate-x-1 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#201f1f] w-full pt-6 pb-8 border-t border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#e5e2e1]/50 font-inter">
            © 2025 Meta-Agents Harness. Precision Intelligence Execution. MIT License.
          </p>
          <div className="flex items-center gap-6">
            {/* Badge Component */}
            <div className="px-3 py-1 bg-[#0e0e0e] border border-[#3a494b]/20 rounded-sm">
              <span className="font-space-grotesk text-[10px] uppercase tracking-[0.2em] text-[#00F2FF]">Built with MAH</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
