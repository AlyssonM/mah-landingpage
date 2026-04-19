export default function CTASection() {
  return (
    <section className="w-full flex justify-center py-[100px]">
      <div
        className="w-full max-w-[720px] bg-[#1c1b1b] rounded-[16px] py-20 px-8 md:px-16 relative z-10 text-center flex flex-col items-center"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.05) 0%, transparent 70%)',
        }}
      >
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f2ff]/5 rounded-full blur-[120px] -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2792ff]/5 rounded-full blur-[120px] translate-x-1/2"></div>

        {/* Headline */}
        <h1 className="text-[48px] font-bold text-[#e5e2e1] leading-[1.1] tracking-tight font-inter mb-4">
          Stop wrestling agents. Start shipping clusters.
        </h1>

        {/* Subheadline */}
        <p className="text-[#e5e2e1]/70 text-lg md:text-xl max-w-[540px] font-inter mb-8">
          One YAML manifest. Any runtime. Structured expertise routing, operational memory, and headless execution — out of the box.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-4 w-full">
          <a
            className="w-full md:w-auto px-12 py-5 rounded-xl font-bold text-white text-lg tracking-tight hover:brightness-110 active:scale-[0.98] transition-all"
            href="#"
            style={{
              background: 'linear-gradient(135deg, #00f2ff 0%, #2792ff 100%)',
              boxShadow: '0 12px 24px rgba(0,242,255,0.15)',
            }}
          >
            mah init --yes
          </a>

          {/* Secondary Link */}
          <a
            className="text-[#00f2ff] font-space-grotesk text-base font-medium tracking-wide hover:text-[#00dbe7] transition-colors py-2 flex items-center gap-2"
            href="#"
          >
            Explore the repository
            <svg className="text-[18px] w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Trust Signals Row */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#201f1f] rounded-full">
            <svg className="text-[#00f2ff] text-[14px] w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-space-grotesk text-xs uppercase tracking-widest text-[#e5e2e1]/80">MIT License</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#201f1f] rounded-full">
            <svg className="text-[#00f2ff] text-[14px] w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-space-grotesk text-xs uppercase tracking-widest text-[#e5e2e1]/80">Runtime-agnostic</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#201f1f] rounded-full">
            <svg className="text-[#00f2ff] text-[14px] w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-space-grotesk text-xs uppercase tracking-widest text-[#e5e2e1]/80">Plugin system</span>
          </div>
        </div>

        {/* Decorative Visual Token */}
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent"></div>
      </div>
    </section>
  );
}
