'use client';

import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { SECTIONS } from "@/lib/constants/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { AboutSection, ContactSection, HeroSection, SkillSection, WorkSection } from '@/components/sections';
import { Header } from '@/components/layout';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ヘッダー */}
      <Header activeSection={activeSection} />

      {/* パーティクル背景 */}
      <div className="fixed inset-0 -z-10">
        <ThreeCanvas shapeIndex={shapeIndex} />
      </div>

      {/* スクロールコンテンツ */}
      <main>
        <HeroSection isScrolled={isScrolled} />
        <AboutSection />
        <SkillSection />
        <WorkSection />
        <ContactSection />
      </main>
    </>
  );
}
