interface HeroSectionProps {
    isScrolled: boolean;
}

export function HeroSection({ isScrolled }: HeroSectionProps) {
    return (
        <section
            id="hero"
            className="min-h-screen md:snap-start md:snap-always flex flex-col items-center justify-center relative"
        >
            <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Daichi Izutani
                </h1>
                <p className="text-lg md:text-2xl text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Full Stack Developer
                </p>
            </div>

            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-5 h-8 border-2 border-white/70 rounded-full flex justify-center pt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <div className="w-0.5 h-1.5 bg-white/70 rounded-full animate-pulse" />
                </div>
                <span className="text-sm text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Scroll</span>
            </div>
        </section>
    );
}
