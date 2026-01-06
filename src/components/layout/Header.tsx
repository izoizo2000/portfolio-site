'use client'

import { useState } from 'react';
import { SECTIONS } from '@/lib/constants/sections';

interface HeaderProps {
    activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false); // メニューを閉じる
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
            <nav className="flex justify-between items-center mx-auto">
                <span className="text-xl font-bold text-white">Daichi Izutani</span>

                {/* デスクトップナビ */}
                <ul className="hidden md:flex gap-6">
                    {SECTIONS.filter(s => s.id !== 'hero').map(({ id, title}) => (
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
                    aria-label="メニューを開く"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* モバイルメニュー */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 bg-black/90 backdrop-blur-sm p-4">
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
    );
}