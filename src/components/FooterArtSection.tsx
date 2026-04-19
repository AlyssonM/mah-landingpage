export default function FooterArtSection() {
  return (
    <section className="relative w-full bg-[#131313] overflow-hidden py-1">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-15"
          alt="abstract digital connection network with neon cyan data points and flowing geometric lines on a deep black background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQ8XNGYZeLp2usKm0d6VThpnXfuzcbqfCjLhI7L9HMeIQcPCZnU_q3MgIFf5XmjyTVpwFf8_FAuMoyPaqhPi5xHTmN2FwrVaFAZNBMsfGjgjOGP-ct8FtBHLxgp_zCYYUsBqHWPRwd5tNLJkyngiaMKruFlhRfx5tSOFPozg4rM7LfMxK_WMCL-lRCkkUmnL9ji4FhQuTbYqAeDz6fww6UPRz0LQD0DM0QJmVZbk7pdf0Om6MfCixeQivnSLShIbydh9YZq1tvQwV"
        />
      </div>

      {/* Centered glass-panel card */}
      <div className="relative z-10 flex items-center justify-center py-12">
        <div
          className="h-32 rounded-xl flex items-center justify-center border border-[#3a494b]/10 backdrop-blur-md"
          style={{ background: 'rgba(28, 27, 27, 0.2)' }}
        >
          <h1 className="font-inter font-black text-6xl text-[#e5e2e1] tracking-tighter px-4">
            THE HARNESS
          </h1>
        </div>
      </div>
    </section>
  );
}
