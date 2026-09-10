'use client'; 

import { useState, useEffect, useRef } from 'react';
import siteData from '../data/data.json'; 

export default function Home() {
  // State untuk Loading Screen
  const [isLoading, setIsLoading] = useState(true);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State untuk Spotlight/Mask Effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // State untuk Animasi Scroll About Us
  const aboutRef = useRef<HTMLElement>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  // State untuk Portfolio Carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const totalProjects = siteData.portfolio.length;

  const goToPrev = () => {  
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goToNext();
      else goToPrev();
    }
    setTouchStartX(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer untuk memicu animasi About Us saat di-scroll
  // Intersection Observer untuk memicu animasi About Us saat di-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        } else {
          // --- TAMBAHKAN BARIS INI ---
          setIsAboutVisible(false); // Reset animasi saat keluar dari layar
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }); 
  };

  return (
    <div className="min-h-screen relative font-sans bg-brand-bg overflow-x-hidden">
      
      {/* --- LOADING ANIMATION - CREATIVE EDITORIAL REVEAL (RAPAT & PADAT) --- */}
      <div 
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-brand-bg transition-all duration-[1.2s] ease-[cubic-bezier(0.74,0,0.24,1)] ${
          isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <style>{`
          @keyframes reveal-up {
            0% { transform: translateY(120%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes progress-draw {
            0% { width: 0%; }
            70% { width: 100%; }
            100% { width: 100%; opacity: 0; }
          }
          .animate-reveal {
            animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            transform: translateY(120%); 
            opacity: 0;
          }
          .animate-progress {
            animation: progress-draw 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          }
        `}</style>

        <div className={`flex flex-col items-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.74,0,0.24,1)] ${
          isLoading ? 'translate-y-0 scale-100' : '-translate-y-24 scale-105'
        }`}>
          
          {/* Logo - Jarak bawah dipangkas menjadi pb-1 */}
          <div className="overflow-hidden pb-1">
            <img 
              src="/image/logox.png" 
              alt="Lomboklinen Loading" 
              className={`h-24 md:h-32 lg:h-40 w-auto object-contain drop-shadow-sm transition-transform duration-[3s] ease-out ${
                isLoading ? 'scale-100' : 'scale-110 opacity-0'
              }`}
            />
          </div>
          
          {/* Teks Loading - Margin atas dipangkas dari mt-8 menjadi mt-3, dan gap-6 menjadi gap-4 */}
          <div className="mt-3 flex flex-col items-center gap-4">
            
            <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-brand-dark font-semibold">
              <div className="overflow-hidden pt-1">
                <div className="animate-reveal inline-block" style={{ animationDelay: '0.2s' }}>
                  Hotel Supplier
                </div>
              </div>
              
              <div className="overflow-hidden flex items-center justify-center pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-reveal inline-block" style={{ animationDelay: '0.4s' }}></span>
              </div>
              
              <div className="overflow-hidden pt-1">
                <div className="animate-reveal inline-block" style={{ animationDelay: '0.6s' }}>
                  Interior Design
                </div>
              </div>
            </div>
            
            <div className="relative w-48 md:w-64 h-[1px] bg-brand-dark/10 overflow-hidden mt-1">
              <div className="absolute top-0 left-0 h-full bg-brand-dark animate-progress"></div>
            </div>

          </div>
        </div>
      </div>

     {/* --- NAVBAR (RESPONSIVE & COMPACT DROPDOWN READY) --- */}
      <nav className={`fixed top-0 left-0 w-full z-50 bg-[#12100f]/40 backdrop-blur-md border-b-[0.5px] border-white/20 py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-1000 ease-out ${!isLoading ? 'opacity-100 translate-y-0 delay-[300ms]' : 'opacity-0 -translate-y-10'}`}>
        
        {/* Kolom 1 KIRI: Logo */}
        <div className="flex-1 flex justify-start relative z-50">
          <a href="#" className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <img 
              src="/image/logos.png" 
              alt="Lomboklinen Logo" 
              className="h-6 md:h-8 lg:h-10 w-auto object-contain invert brightness-0" 
            />
          </a>
        </div>

        {/* Kolom 2 TENGAH: Menu Utama (Hanya muncul di Laptop/Desktop = lg) */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 lg:gap-12 text-[10px] lg:text-xs font-normal tracking-[0.2em] uppercase text-white">
          <a href="#about" className="hover:opacity-60 transition-opacity">About Us</a>
          <a href="#project" className="hover:opacity-60 transition-opacity">Project</a>
          <a href="#services" className="hover:opacity-60 transition-opacity">Services</a>
        </div>

        {/* Kolom 3 KANAN: Contact & Hamburger */}
        <div className="flex-1 flex justify-end items-center relative z-50">
          
          {/* Tombol Contact (Desktop Only) */}
          <div className="hidden lg:flex text-[10px] lg:text-xs font-normal tracking-[0.2em] uppercase text-white">
            <a 
              href="#contact" 
              className="group flex items-center gap-3 border border-white/30 px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Tombol Hamburger (Mobile & Tablet) */}
          {/* Akan tersembunyi di Desktop (lg:hidden) */}
          <button 
            className="lg:hidden flex flex-col justify-center items-end w-10 h-10 space-y-1.5 focus:outline-none group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {/* Animasi Garis Hamburger berubah menjadi (X) */}
            <span className={`block h-[1px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-8'}`}></span>
            <span className={`block h-[1px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-6'}`}></span>
            <span className={`block h-[1px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-4'}`}></span>
          </button>

          {/* --- COMPACT FLOATING DROPDOWN MENU --- */}
          {/* Ini posisinya disisipkan di dalam Kolom Kanan agar menggantung di bawah hamburger */}
          <div 
            className={`absolute top-full right-0 mt-5 w-48 sm:w-56 bg-[#12100f]/95 backdrop-blur-md border border-white/15 p-5 shadow-2xl transition-all duration-300 origin-top-right lg:hidden rounded-sm ${
              isMobileMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
            }`}
          >
            <div className="flex flex-col gap-4">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors">
                About Us
              </a>
              <div className="w-full h-[1px] bg-white/10"></div>
              
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors">
                Services
              </a>
              <div className="w-full h-[1px] bg-white/10"></div>
              
              <a href="#project" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors">
                portfolio
              </a>
              <div className="w-full h-[1px] bg-white/10"></div>
              
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors">
                Inquiry
              </a>
            </div>
          </div>
          {/* --- END OF DROPDOWN --- */}

        </div>
      </nav>
     
{/* --- 1. HERO SECTION - CLEAN LEFT-ALIGNED (FULLY RESPONSIVE) --- */}
      <section 
        className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-24 pb-12 group"
        onMouseMove={handleMouseMove}
      >
        {/* Layer Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
            alt="Moody Tropical Interior" 
            className="w-full h-full object-cover"
          />
          {/* Menambahkan gradasi gelap di sisi kiri agar teks putih selalu kontras terbaca */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
        </div>

        {/* Layer Soft Glow (Tetap Sama) */}
        <div 
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100 hidden md:block"
          style={{
            WebkitMaskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`,
            maskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
            alt="Clear Tropical Interior" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Kontainer Utama - Dibuat justify-center agar tepat di tengah layar secara vertikal */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-8 md:pt-16">
          
          {/* Wrapper Konten (Konsisten Rata Kiri) */}
          <div className="flex flex-col justify-center items-start w-full">
            
            {/* Eyebrow */}
            <p className={`text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 md:mb-6 text-white/70 transition-all duration-1000 ease-out ${!isLoading ? 'opacity-100 translate-y-0 delay-[500ms]' : 'opacity-0 translate-y-8'}`}>
              Lombok-Based Hotel Supplier
            </p>
            
            {/* Heading - Skala membesar halus: 5xl (HP) -> 6xl (Tablet Kecil) -> 7xl (Tablet Besar) -> 6.5rem (Desktop) */}
            <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight text-white transition-all duration-1000 ease-out ${!isLoading ? 'opacity-100 translate-y-0 delay-[700ms]' : 'opacity-0 translate-y-12'}`}>
              Fine <span className="italic font-light text-brand-bg/90">Linens.</span><br />
              Custom Interiors.
            </h1>
            
            {/* Wrapper Paragraf & Tombol - Konsisten di bawah judul */}
            <div className={`flex flex-col gap-8 md:gap-10 mt-8 md:mt-12 transition-all duration-1000 ease-out ${!isLoading ? 'opacity-100 translate-y-0 delay-[1000ms]' : 'opacity-0 translate-y-8'}`}>
              
              {/* Paragraf - text-base di HP, text-lg di Desktop. Max width dibatasi agar tidak memanjang jelek */}
              <p className="text-white/80 font-light text-base md:text-lg max-w-[340px] md:max-w-[500px] leading-relaxed pointer-events-none">
                Elevating the guest experience. We supply premium hotel textiles, from plush towels to tailored interior goods, perfectly aligned with your property's unique concept.
              </p>
              
              {/* Tombol CTA */}
              <a href="#contact" className="group flex items-center gap-4 text-white text-[10px] md:text-sm tracking-[0.2em] uppercase font-medium border-b border-white/40 pb-2 hover:border-white transition-colors pointer-events-auto w-max">
                Get In Touch
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              
            </div>
            
          </div>
        </div>
      </section>

     {/* --- 2. ABOUT US SECTION (FULL-SCREEN FIT & EDITORIAL LAYOUT) --- */}
      <section 
        id="about" 
        ref={aboutRef}  
        // PERBAIKAN: w-full & min-h-[100dvh] agar fit 1 layar penuh. justify-center agar konten selalu di tengah.
        className="w-full min-h-[100dvh] flex flex-col justify-center bg-brand-bg overflow-hidden py-16 md:py-20 lg:py-24"
      >
        {/* Pembungkus lebar maksimal (Max-width container) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
            
            {/* 1. KONTEN TEKS */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pr-16 mb-8 md:mb-10 lg:mb-0">
              <div>
                <p className={`text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-brand-dark/50 mb-6 md:mb-8 lg:mb-16 transition-all duration-1000 ease-out ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  About Us
                </p>
            
                <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark leading-[1.1] tracking-tight mb-6 md:mb-8 transition-all duration-1000 delay-[200ms] ease-out ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <span className="italic font-light pr-2">Design</span> WITH<br/>
                  INTENTION
                </h2>
                
                <p className={`text-brand-dark/70 font-light text-sm md:text-base leading-relaxed md:leading-loose max-w-lg mb-10 transition-all duration-1000 delay-[400ms] ease-out ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  At Lomboklinen, we believe that interior curation is not just about how a space looks &ndash; it&rsquo;s about how it makes you feel. We approach each project as a layered composition of natural textures, form, and purpose, where clarity meets quiet beauty.
                </p>
              </div>

              <a href="#project" className={`group flex items-center gap-4 w-max transition-all duration-1000 delay-[600ms] ease-out ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark group-hover:text-brand-rattan transition-colors">
                  Learn More
                </span>
                <div className="flex items-center w-24 md:w-32 group-hover:w-48 transition-all duration-700 ease-out">
                  <div className="h-[1px] w-full bg-brand-dark group-hover:bg-brand-rattan transition-colors"></div>
                  <svg className="w-4 h-4 text-brand-dark group-hover:text-brand-rattan transition-colors -ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            {/* 2. GAMBAR KIRI UTAMA */}
            <div className={`col-span-7 lg:col-span-4 h-[280px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[600px] w-full group overflow-hidden transition-all duration-[1.5s] delay-[300ms] ease-in-out ${isAboutVisible ? 'opacity-100 [clip-path:inset(0_0_0_0)]' : 'opacity-0 [clip-path:inset(0_0_100%_0)]'}`}>
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop" 
                alt="Lomboklinen Primary Interior" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* 3. GAMBAR KANAN AKSEN */}
            <div className={`col-span-5 lg:col-span-3 h-[150px] sm:h-[220px] md:h-[280px] lg:h-[350px] w-full mt-0 lg:mt-16 group overflow-hidden transition-all duration-[1.5s] delay-[600ms] ease-in-out ${isAboutVisible ? 'opacity-100 [clip-path:inset(0_0_0_0)]' : 'opacity-0 [clip-path:inset(0_0_100%_0)]'}`}>
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop" 
                alt="Lomboklinen Interior Details" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

          </div>
        </div>
      </section>
      
   {/* --- PEMISAH SECTION (GARIS EDITORIAL) --- */}
      <div className="w-full bg-brand-bg px-6 md:px-12 py-12 md:py-20">
        <div className="w-full max-w-[1400px] mx-auto border-t-[0.5px] border-brand-dark/15"></div>
      </div>


       {/* --- 5. PORTFOLIO / PROJECTS SECTION --- */}
      <section id="project" className="py-20 lg:py-24 px-6 md:px-12 max-w-[1400px] mx-auto bg-brand-bg overflow-hidden">
        
        {/* Header + Carousel Controls */}
        <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-brand-dark/10 pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-dark/50 mb-4">
              Selected Works
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-brand-dark leading-[1.1] tracking-tight">
              Our <span className="italic font-light">Project</span>
            </h2>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous project"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-brand-bg hover:border-brand-dark transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next project"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-brand-bg hover:border-brand-dark transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <p className="text-[11px] tracking-[0.3em] uppercase text-brand-muted">
              <span className="text-brand-dark font-medium">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              {String(totalProjects).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* Carousel Content */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {siteData.portfolio.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 translate-x-0 block'
                  : 'opacity-0 translate-x-8 hidden'
              }`}
            >
              {index === currentIndex && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* Foto Pasangan */}
                  <div className="lg:col-span-7 w-full">
                    <div className="grid grid-cols-2 gap-3 md:gap-6 w-full">
                      <div className="relative w-full aspect-[4/5] max-h-[62vh] overflow-hidden bg-brand-dark/5">
                        <img
                          src={project.images[0]}
                          alt={`${project.hotel} main`}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                      <div className="relative w-full aspect-[4/5] max-h-[62vh] overflow-hidden bg-brand-dark/5">
                        <img
                          src={project.images[1]}
                          alt={`${project.hotel} detail`}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deskripsi Proyek */}
                  <div className="lg:col-span-5 lg:pl-4">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-serif italic text-brand-rattan text-lg">{String(index + 1).padStart(2, '0')}</span>
                      <span className="h-px w-12 bg-brand-rattan"></span>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-brand-dark/50">{project.type}</p>
                    </div>
                    <h3 className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-tight text-brand-dark mb-4">
                      {project.hotel}
                    </h3>
                    <p className="text-brand-muted text-sm tracking-wide font-light mb-6">
                      {project.location}
                    </p>
                    <p className="text-brand-dark/70 font-light text-base leading-loose mb-8 max-w-md">
                      {project.description}
                    </p>

                    <a
                      href={`https://wa.me/${siteData.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark hover:text-brand-rattan transition-colors"
                    >
                      Enquire About This Project
                      <svg className="w-4 h-4 text-brand-dark group-hover:text-brand-rattan group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>
      </section>


    {/* --- 3. SERVICES SECTION - MINIMALIST INTERACTIVE LIST --- */}
      <section id="services" className="relative w-full min-h-[100dvh] flex items-center justify-center bg-[#181615] py-24 overflow-hidden">
        
        {/* Background Ambient */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2522]/30 via-[#181615]/0 to-[#181615]/0"></div>
        </div>

        {/* Kontainer Utama */}
        <div className="relative z-10 max-w-[1300px] mx-auto w-full px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* KOLOM KIRI: Judul (Terkunci di sisi kiri) */}
          <div className="w-full lg:w-[35%] flex flex-col pt-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 font-light">
              Our Expertise
            </p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[1] tracking-tight mb-8">
              <span className="text-white block mb-2">DESIGN</span>
              <span className="italic font-light text-white/70 block">RESONATES</span>
            </h2>
            <p className="text-white/50 font-light text-xs md:text-sm leading-relaxed max-w-[280px] mb-12">
              We offer more than design &ndash; we craft experiences through clarity, texture, intention, and thoughtful presence.
            </p>
            <a href="#contact" className="group flex items-center justify-between w-max gap-8 border-b border-white/20 pb-2 hover:border-white transition-colors">
              <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-white">Start a Project</span>
              <svg className="w-3.5 h-3.5 text-white group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* KOLOM KANAN: Interactive Accordion List */}
          <div className="w-full lg:w-[65%] flex flex-col border-t border-white/10">
            
            {/* SERVICE 01 */}
            <div className="group border-b border-white/10 py-6 lg:py-8 cursor-pointer hover:border-white/40 transition-colors duration-500">
              {/* Baris Judul */}
              <div className="flex justify-between items-center w-full px-2 md:px-6">
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-white/30 font-mono text-xs md:text-sm group-hover:text-white/60 transition-colors">01</span>
                  {/* Efek translate-x saat di-hover */}
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-[2.7rem] text-white/80 group-hover:text-white group-hover:translate-x-4 md:group-hover:translate-x-8 transition-all duration-500 ease-out">
                    Design Project
                  </h3>
                </div>
                {/* Panah kanan muncul saat hover */}
                <div className="hidden md:block overflow-hidden">
                  <svg className="w-6 h-6 text-white opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
              
              {/* Konten Tersembunyi (Membuka ke bawah saat di-hover) */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out px-2 md:px-6">
                <div className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 pt-8 pb-4 items-start md:items-end">
                    <div className="w-32 md:w-40 aspect-[4/5] overflow-hidden bg-[#2a2a2a] shrink-0">
                      <img src="/image/sofa.jpg" alt="Design Project" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                    </div>
                    <div className="flex flex-col gap-4 md:pb-2">
                      <p className="text-white/60 text-xs md:text-sm max-w-sm font-light leading-relaxed">
                        Full design package with plans, moodboards, and drawings &ndash; crafted for your lifestyle and spatial identity.
                      </p>
                      <span className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium border-t border-white/10 pt-3 w-max">
                        from 120 $/m²
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICE 02 */}
            <div className="group border-b border-white/10 py-6 lg:py-8 cursor-pointer hover:border-white/40 transition-colors duration-500">
              <div className="flex justify-between items-center w-full px-2 md:px-6">
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-white/30 font-mono text-xs md:text-sm group-hover:text-white/60 transition-colors">02</span>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-[2.7rem] text-white/80 group-hover:text-white group-hover:translate-x-4 md:group-hover:translate-x-8 transition-all duration-500 ease-out">
                    Sourcing
                  </h3>
                </div>
                <div className="hidden md:block overflow-hidden">
                  <svg className="w-6 h-6 text-white opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out px-2 md:px-6">
                <div className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 pt-8 pb-4 items-start md:items-end">
                    <div className="w-32 md:w-40 aspect-[4/5] overflow-hidden bg-[#2a2a2a] shrink-0">
                      <img src="/image/sofa.jpg" alt="Sourcing" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                    </div>
                    <div className="flex flex-col gap-4 md:pb-2">
                      <p className="text-white/60 text-xs md:text-sm max-w-sm font-light leading-relaxed">
                        Curating premium natural linens, exclusive rattan furniture, and bespoke artifacts tailored to your space.
                      </p>
                      <span className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium border-t border-white/10 pt-3 w-max">
                        Custom Quote
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICE 03 */}
            <div className="group border-b border-white/10 py-6 lg:py-8 cursor-pointer hover:border-white/40 transition-colors duration-500">
              <div className="flex justify-between items-center w-full px-2 md:px-6">
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-white/30 font-mono text-xs md:text-sm group-hover:text-white/60 transition-colors">03</span>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-[2.7rem] text-white/80 group-hover:text-white group-hover:translate-x-4 md:group-hover:translate-x-8 transition-all duration-500 ease-out">
                    Styling
                  </h3>
                </div>
                <div className="hidden md:block overflow-hidden">
                  <svg className="w-6 h-6 text-white opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out px-2 md:px-6">
                <div className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 pt-8 pb-4 items-start md:items-end">
                    <div className="w-32 md:w-40 aspect-[4/5] overflow-hidden bg-[#2a2a2a] shrink-0">
                      <img src="/image/sofa.jpg" alt="Styling" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                    </div>
                    <div className="flex flex-col gap-4 md:pb-2">
                      <p className="text-white/60 text-xs md:text-sm max-w-sm font-light leading-relaxed">
                        Final layer curation. Arranging objects, textiles, and lighting to bring soul and warmth into the environment.
                      </p>
                      <span className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium border-t border-white/10 pt-3 w-max">
                        from 80 $/m²
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICE 04 */}
            <div className="group border-b border-white/10 py-6 lg:py-8 cursor-pointer hover:border-white/40 transition-colors duration-500">
              <div className="flex justify-between items-center w-full px-2 md:px-6">
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-white/30 font-mono text-xs md:text-sm group-hover:text-white/60 transition-colors">04</span>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-[2.7rem] text-white/80 group-hover:text-white group-hover:translate-x-4 md:group-hover:translate-x-8 transition-all duration-500 ease-out">
                    Supervision
                  </h3>
                </div>
                <div className="hidden md:block overflow-hidden">
                  <svg className="w-6 h-6 text-white opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out px-2 md:px-6">
                <div className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 pt-8 pb-4 items-start md:items-end">
                    <div className="w-32 md:w-40 aspect-[4/5] overflow-hidden bg-[#2a2a2a] shrink-0">
                      <img src="/image/sofa.jpg" alt="Supervision" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                    </div>
                    <div className="flex flex-col gap-4 md:pb-2">
                      <p className="text-white/60 text-xs md:text-sm max-w-sm font-light leading-relaxed">
                        On-site quality control and project management ensuring every detail aligns with the original vision.
                      </p>
                      <span className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium border-t border-white/10 pt-3 w-max">
                        Hourly Rate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
     
     {/* --- 7. CONTACT / INQUIRY SECTION --- */} 
      {/* PERBAIKAN: min-h dan justify-center sekarang hanya aktif di layar besar (lg:). Di HP/Tablet mengalir natural */}
     <section id="contact" className="relative w-full lg:min-h-[100dvh] lg:flex lg:flex-col lg:justify-center bg-brand-bg py-20 md:py-28 lg:py-0">
        
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="w-full border-t-[0.5px] border-brand-dark/20 mb-16 md:mb-20"></div>
   
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Panduan Kiri */}  
            <div className="lg:col-span-4 flex flex-col gap-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-dark/50 mb-6">
                  Project Inquiry
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-brand-dark leading-[1.1] tracking-tight">
                  Let's curate your<br />
                  <span className="italic font-light">space.</span>
                </h2>
              </div>

              <div className="flex flex-col">
                <div className="border-t-[0.5px] border-brand-dark/20 py-6 flex gap-6">
                  <span className="font-serif italic text-brand-dark/40 text-lg">01</span>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-dark mb-2">The Context</h4>
                    <p className="text-xs text-brand-dark/60 leading-relaxed font-light">
                      What space are we designing? Tell us about the current state and why this curation is important now.
                    </p>
                  </div>
                </div>

                <div className="border-t-[0.5px] border-brand-dark/20 py-6 flex gap-6">
                  <span className="font-serif italic text-brand-dark/40 text-lg">02</span>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-dark mb-2">The Vision</h4>
                    <p className="text-xs text-brand-dark/60 leading-relaxed font-light">
                      What feeling are you trying to evoke? Mention any specific linen textures or rattan forms you love.
                    </p>
                  </div>
                </div>

                <div className="border-y-[0.5px] border-brand-dark/20 py-6 flex gap-6">
                  <span className="font-serif italic text-brand-dark/40 text-lg">03</span>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-dark mb-2">The Scope</h4>
                    <p className="text-xs text-brand-dark/60 leading-relaxed font-light">
                      Rough timeline, budget considerations, and specific services required.
                    </p>
                  </div>
                </div>
              </div>

              <a href="mailto:hello@lomboklinen.com" className="group flex items-center justify-between border-[0.5px] border-brand-dark/30 p-4 hover:bg-brand-dark hover:text-brand-bg transition-all duration-300">
                <span className="text-[11px] uppercase tracking-[0.1em] font-medium">
                  Prefer direct email?
                </span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>

            {/* Form Kanan */}
            <div className="lg:col-span-8">
              <h3 className="text-2xl md:text-3xl font-serif text-brand-dark mb-2">
                Share the details below.
              </h3>
              <p className="text-sm text-brand-dark/60 font-light mb-12">
                A rough brief is perfect. We'll help clarify the rest during our consultation.
              </p>

              <form className="flex flex-col gap-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.1em] text-brand-dark/70">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full bg-transparent border-[0.5px] border-brand-dark/30 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-dark transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.1em] text-brand-dark/70">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+62 812 3456 7890" 
                      className="w-full bg-transparent border-[0.5px] border-brand-dark/30 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-dark transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.1em] text-brand-dark/70">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com" 
                    className="w-full bg-transparent border-[0.5px] border-brand-dark/30 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-dark transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.1em] text-brand-dark/70">Project Details</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us about the space, what needs to change, and your ideal aesthetic..." 
                    className="w-full bg-transparent border-[0.5px] border-brand-dark/30 px-4 py-4 text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-dark transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  className="w-max bg-brand-dark text-brand-bg px-8 py-4 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity mt-4"
                >
                  Submit Inquiry
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

    {/* --- 8. FOOTER - PROFESSIONAL AGENCY GRADE --- */}
     {/* --- 8. FOOTER - DARK ELEGANT EDITION --- */}
    <footer className="relative w-full bg-[#12100f] pt-20 md:pt-24 pb-8 border-t border-white/10 flex flex-col overflow-hidden">
        
        {/* Inner Container */}
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col z-10">
          
          {/* Main Footer Content */}
          {/* PERBAIKAN: Grid berubah dari 1 kolom (HP) -> 2 kolom (Tablet) -> 12 kolom (Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 lg:mb-24 items-start">

            {/* Kolom 1: Brand & Deskripsi */}
            {/* Mengambil 2 kolom penuh di Tablet, 5 kolom di Desktop */}
            <div className="sm:col-span-2 lg:col-span-5 flex flex-col">
              <img 
                src="/image/logox.png" 
                alt="Lomboklinen Logo" 
                className="h-16 md:h-20 lg:h-28 w-auto object-contain object-left invert brightness-0 mb-6 md:mb-8" 
              />
              <p className="text-xs text-white/60 font-light max-w-sm leading-relaxed">
                A boutique supplier creating light-filled, emotionally resonant spaces with natural linens and rattan.
              </p>
            </div>

            {/* Kolom 2: Navigation Menu */}
            {/* Mengambil 1 kolom di Tablet, 2 kolom di Desktop */}
            <div className="sm:col-span-1 lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-medium">Menu</h4>
              <div className="flex flex-col gap-3">
                <a href="#about" className="text-xs text-white/70 font-light hover:text-white hover:translate-x-1 transition-all w-max">About Us</a>
                <a href="#services" className="text-xs text-white/70 font-light hover:text-white hover:translate-x-1 transition-all w-max">Services</a>
                <a href="#project" className="text-xs text-white/70 font-light hover:text-white hover:translate-x-1 transition-all w-max">Selected Works</a>
                <a href="#contact" className="text-xs text-white/70 font-light hover:text-white hover:translate-x-1 transition-all w-max">Inquiry</a>
              </div>
            </div>

            {/* Kolom 3: Social Media */}
            {/* Mengambil 1 kolom di Tablet, 2 kolom di Desktop */}
            <div className="sm:col-span-1 lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-medium">Social</h4>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-xs text-white/70 font-light hover:text-white hover:translate-x-1 transition-all w-max">Instagram</a>
                <a href="#" className="text-xs text-white/70 font-light hover:text-white hover:translate-x-1 transition-all w-max">Pinterest</a>
                <a href="#" className="text-xs text-white/70 font-light hover:text-white hover:translate-x-1 transition-all w-max">LinkedIn</a>
              </div>
            </div>

            {/* Kolom 4: Studio & Kontak */}
            {/* Mengambil 2 kolom penuh di Tablet (turun ke bawah), 3 kolom di Desktop */}
            <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-4 mt-2 sm:mt-6 lg:mt-0">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-medium">Gallery Studio</h4>
              <p className="text-xs text-white/70 font-light leading-relaxed mb-1">
                Griya Udayana 2, No.1<br />
                Jln. Gili Asahan Udayana, Selaparang<br />
                Mataram, Nusa Tenggara Barat
              </p>
              <a 
                href="mailto:moelyalomboklinen84@gmail.com" 
                className="text-[11px] text-white/90 font-medium tracking-wide border-b border-white/20 pb-1 mt-2 hover:border-white transition-colors w-max"
              >
                moelyalomboklinen84@gmail.com
              </a>
            </div>

          </div>

          {/* Sub Footer: Copyright & Back to Top */}
          {/* PERBAIKAN: Diatur agar di HP rata kiri (items-start), tapi tombol tetap aman di kanan */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0 pt-8 border-t-[0.5px] border-white/10">
            
            <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.1em] text-left">
              © {new Date().getFullYear()} Lomboklinen. All rights reserved.
            </p>
            
            {/* Wrapper khusus agar di HP tombol dan link policy tidak saling bertabrakan */}
            <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-8">
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="text-[9px] md:text-[10px] text-white/40 hover:text-white uppercase tracking-[0.1em] transition-colors">Privacy Policy</a>
                <a href="#" className="text-[9px] md:text-[10px] text-white/40 hover:text-white uppercase tracking-[0.1em] transition-colors">Terms of Service</a>
              </div>
              
              {/* Back to Top Button */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:border-white transition-colors text-white/50 hover:text-white group"
                aria-label="Back to top"
              >
                <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </footer>

      
    </div>
  );
}