'use client';

import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { SECTIONS } from "@/lib/constants/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

// Three.jsはサーバサイドで動かないのでクライアントのみで読み込む
const ThreeCanvas = dynamic(() => import("../components/three/Canvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  const activeSection = useActiveSection();
  const currentSection = SECTIONS.find(s => s.id === activeSection);
  const shapeIndex = currentSection?.shapeIndex ?? 0;

  // スクロール検知
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
        <nav className="flex justify-between items-center mx-auto">
          <span className="text-xl font-bold text-white">Portfolio</span>

          {/* デスクトップナビ */}
          <ul className="hidden md:flex gap-6">
            {SECTIONS.filter(s => s.id !== 'hero').map(({ id, title }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`text-sm transition-colors ${
                    activeSection === id 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white'
                  }`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        
          {/* ハンバーガーボタン */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/90 backdrop-blur-sm rounded-lg p-4">
            <ul className="flex flex-col gap-4">
              {SECTIONS.filter(s => s.id !== 'hero').map(({ id, title }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`text-sm transition-colors w-full text-left ${
                      activeSection === id 
                      ? 'text-white' 
                      : 'text-white/60'
                    }`}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* パーティクル背景 */}
      <div className="fixed inset-0 -z-10">
        <ThreeCanvas shapeIndex={shapeIndex} />
      </div>
      {/* スクロールコンテンツ */}
      <main>
        {SECTIONS.map(({ id, title }, index) => {
          const isWorks = id === 'works';
          return (
            <section 
              key={id} 
              id={id}
              className={`flex items-center justify-center relative ${
                isWorks
                  ? 'min-h-screen snap-start'
                  : 'h-screen snap-start snap-always'
              }`}
            >
              <h1 className="text-4xl font-bold text-white">{title}</h1>

              {/* 最初のセクションのみスクロースインジケーター表示 */}
              {index === 0 && (
                <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-5 h-8 border-2 border-white/70 rounded-full flex justify-center pt-1.5">
                    <div className="w-0.5 h-1.5 bg-white/70 rounded-full animate-pulse" />
                  </div>
                  <span className="text-sm text-white/70">Scroll</span>
                </div>
              )}
            </section>
          );
        })} 
      </main>
    </>
  );
}
