'use client'; // Wajib ditambahkan agar kita bisa pakai state & effect

import { useState, useEffect } from 'react';
import siteData from '../data/data.json';

export default function Home() {
  // State untuk mengontrol loading screen
  const [isLoading, setIsLoading] = useState(true);

  // Mengatur durasi loading screen (2.5 detik)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative font-sans">
      
      {/* --- LOADING ANIMATION OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-brand-bg transition-all duration-1000 ease-in-out ${
          isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Efek logo berdetak (Pulse) */}
        <img 
          src="/image/logos.png" 
          alt="Lomboklinen Loading" 
          className="h-20 md:h-28 lg:h-32 w-auto object-contain mix-blend-multiply animate-pulse"
        />
        {/* Teks minimalis di bawah logo */}
        <p className="mt-6 text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-muted animate-pulse">
          Curating Elegance...
        </p>
      </div>
      {/* ---------------------------------- */}


      {/* 1. FIXED SOLID NAVBAR (Menempel saat scroll & Font jelas) */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-bg border-b border-brand-dark/10 py-5 px-6 md:px-12 flex items-center justify-between transition-all duration-300 shadow-sm">
        
        {/* Kiri: Logo Asli Lomboklinen */}
        <div className="flex-1 flex justify-start">
          <a href="#" className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <img 
              src="/image/logos.png" 
              alt="Lomboklinen Logo" 
              className="h-10 md:h-12 lg:h-14 w-auto object-contain mix-blend-multiply" 
            />
          </a>
        </div>

        {/* Tengah: Menu Link */}
        <div className="hidden md:flex flex-1 justify-center gap-10 text-sm font-normal text-brand-dark/70">
          <a href="#" className="text-brand-dark border-b border-brand-dark pb-1">Home</a>
          <a href="#about" className="hover:text-brand-rattan transition-colors pb-1">About Us</a>
          <a href="#project" className="hover:text-brand-rattan transition-colors pb-1">Projects</a>
          <a href="#contact" className="hover:text-brand-rattan transition-colors pb-1">Contact</a>
        </div>

        {/* Kanan: Tombol Pill Gelap dengan Panah */}
        <div className="flex-1 flex justify-end">
          <a 
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-brand-dark text-brand-bg px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-rattan hover:text-white transition-colors duration-300"
          >
            Contact Us
            <svg 
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION - EDITORIAL SPLIT LAYOUT (Desain Baru) */}
      {/* pt-32 memastikan konten tidak tertutup oleh navbar solid di atasnya */}
      <section className="relative w-full pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-[90vh]">
        
        {/* Kiri: Tipografi & Call to Action */}
        <div className="w-full lg:w-1/2 lg:pr-16 flex flex-col justify-center mb-12 lg:mb-0 mt-8 lg:mt-0">
          <p className="text-brand-rattan font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
            Tropical Modernism
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-dark mb-8">
            Linen & Rattan <br/> Aesthetics.
          </h1>
          <p className="text-brand-muted font-light text-lg md:text-xl mb-10 leading-relaxed max-w-md">
            Elevating Lombok hospitality through bespoke natural linens and minimalist interior curation for luxury spaces.
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <a href="#project" className="bg-brand-dark text-brand-bg px-8 py-3.5 rounded-full text-sm font-medium hover:bg-brand-rattan transition-colors">
              Explore Projects
            </a>
            <a href="#about" className="text-brand-dark text-sm font-medium border-b border-brand-dark pb-1 hover:text-brand-rattan hover:border-brand-rattan transition-colors">
              Our Story
            </a>
          </div>
        </div>

        {/* Kanan: Gambar Estetik dengan Frame */}
        <div className="w-full lg:w-1/2 h-[50vh] md:h-[65vh] lg:h-[75vh] relative">
          <div className="absolute inset-0 bg-brand-dark/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=1000&auto=format&fit=crop" 
              alt="Tropical Resort Interior" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          {/* Aksen lingkaran rotan estetik di belakang gambar (Hanya muncul di layar besar) */}
          <div className="absolute -bottom-8 -left-8 w-40 h-40 border-[1px] border-brand-rattan/50 rounded-full -z-10 hidden lg:block"></div>
        </div>

      </section>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=2000&auto=format&fit=crop" 
          alt="Tropical Resort Interior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6 text-brand-rattan font-medium">
            Tropical Modernism
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 drop-shadow-md">
            Linen & Rattan <br/> Aesthetics.
          </h1>
          <a href="#project" className="scroll-mt-24 inline-block border-b border-brand-rattan pb-1 text-sm font-medium tracking-widest uppercase hover:text-brand-rattan transition duration-300">
            Discover Our Projects
          </a>
        </div>
      </section>

      {/* 3. ABOUT US SECTION */}
      <section id="about" className="scroll-mt py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative h-[500px] md:h-[700px] w-full">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop" 
              alt="Linen and Rattan Detail" 
              className="w-full h-full object-cover"
            />
            <div className="absolute -inset-4 border border-brand-rattan/40 -z-10 hidden md:block"></div>
          </div>
          
          <div className="md:pr-12">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-10 text-brand-dark">
              Harmonizing Nature <br/> with Luxury Living.
            </h2>
            <div className="text-brand-muted font-light leading-relaxed space-y-6 text-lg">
              <p>
                Rooted in the lush landscapes of Lombok, we specialize in supplying premium hospitality linens and curating interior designs that celebrate tropical modernism.
              </p>
              <p>
                Our signature aesthetic revolves around the warmth of natural rattan, the breathability of pure linen, and the simplicity of minimalist design—transforming ordinary spaces into serene tropical sanctuaries.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 pt-16 border-t border-brand-dark/10">
          {siteData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="font-serif text-4xl mb-3 text-brand-dark">{stat.value}</h3>
              <p className="text-xs text-brand-muted uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-24 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
             <h2 className="font-serif text-4xl md:text-5xl leading-tight text-brand-dark sticky top-32">
              Our Expertise.
             </h2>
          </div>
          <div className="md:col-span-7">
            <ul className="space-y-0">
              <li className="border-b border-brand-dark/10 py-10 group">
                <p className="text-brand-rattan font-serif text-xl mb-4 italic">01</p>
                <h4 className="text-3xl font-serif mb-4 text-brand-dark group-hover:text-brand-rattan transition">Hospitality Linens</h4>
                <p className="text-brand-muted font-light text-lg">Bespoke bedding and highly durable natural linens crafted specifically for luxury tropical resorts.</p>
              </li>
              <li className="border-b border-brand-dark/10 py-10 group">
                <p className="text-brand-rattan font-serif text-xl mb-4 italic">02</p>
                <h4 className="text-3xl font-serif mb-4 text-brand-dark group-hover:text-brand-rattan transition">Interior Curation</h4>
                <p className="text-brand-muted font-light text-lg">Sourcing and arranging minimalist furniture with a strong emphasis on rattan, teak wood, and organic textures.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. PROJECT / PORTFOLIO SECTION */}
      <section id="project" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-brand-dark/10 pb-8">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark">
            Selected Projects
          </h2>
          <a href="#" className="text-sm font-medium uppercase tracking-widest hover:text-brand-rattan transition hidden md:block">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {siteData.portfolio.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden mb-6 bg-brand-dark/5">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-1000 ease-in-out"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-2xl mb-2 text-brand-dark group-hover:text-brand-rattan transition">{item.title}</h3>
                  <p className="text-brand-muted text-sm font-light tracking-wide">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center border-t border-brand-dark/10 bg-white">
        <a href="#" className="flex justify-center mb-6 hover:opacity-80 transition duration-300">
           {/* Logo di Footer */}
           <img 
              src="/image/logos.png" 
              alt="Lomboklinen Logo" 
              className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" 
            />
        </a>
        <p className="text-brand-muted text-xs uppercase tracking-widest">
          © 2026 Lomboklinen. Island Inspired Elegance.
        </p>
      </footer>

    </div>
  )
}