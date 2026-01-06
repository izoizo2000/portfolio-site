import { CAREER } from '@/lib/constants/career';

export function AboutSection() {
    return (
        <section
            id="about"
            className="h-screen snap-start snap-always flex items-center relative px-8 md:px-16"
        >
            <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
                {/* 左: タイトル＆説明 */}
                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            About Me
                        </h2>
                        <p className="text-white/90 mt-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            Background & Experience
                        </p>
                    </div>
                    <p className="text-lg text-white leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        ゲーム開発からキャリアをスタートし、現在はフルスタックエンジニアとして
                        Web開発・クラウドインフラに従事しています。
                    </p>
                </div>

                {/* 右: 経歴 */}
                <div className="p-8">
                    <div className="relative pl-8 border-l border-white/50">
                        <div className="space-y-10">
                            {CAREER.map(({ period, company, role, isCurrent }) => (
                                <div key={company} className="relative">
                                    <div className={`absolute -left-[41px] top-1 w-3 h-3 rounded-full ${isCurrent ? 'bg-white' : 'bg-white/70'}`} />
                                    <p className="text-sm text-white/80 mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{period}</p>
                                    <p className="text-xl text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{company}</p>
                                    <p className="text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
