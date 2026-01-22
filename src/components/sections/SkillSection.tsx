import { PiCertificate } from 'react-icons/pi';
import { SKILLS } from '@/lib/constants/skills';
import { CERTIFICATIONS } from '@/lib/constants/certifications';

export function SkillSection() {
    return (
        <section
            id="skills"
            className="h-screen snap-start snap-always flex flex-col items-center justify-center relative px-6 md:px-12"
        >
            {/* タイトル */}
            <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    Skills
                </h2>
                <p className="text-white/90 mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    Technologies I work with
                </p>
            </div>

            {/* スキルカード */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 w-full max-w-6xl">
                {SKILLS.map(({ category, items }) => (
                    <div
                        key={category}
                        className="group p-6 bg-black/30 border border-white/20 rounded-lg hover:border-white/50 hover:bg-black/40 transition-all duration-300"
                    >
                        <h3 className="text-xs font-bold text-white mb-5 uppercase tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                            {category}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {items.map(({ name, icon: Icon }) => (
                                <div key={name} className="flex items-center gap-4 group/item">
                                    <Icon className="w-5 h-5 text-white/90 group-hover/item:text-white transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" />
                                    <span className="text-sm text-white group-hover/item:text-white transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                                        {name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 資格 */}
            <div className="mt-12 w-full max-w-6xl">
                <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest text-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    Certifications
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                    {CERTIFICATIONS.map(({ name, year }) => (
                        <div
                            key={name}
                            className="group flex items-center gap-3 px-5 py-3 bg-black/30 border border-white/20 rounded-lg hover:border-white/50 hover:bg-black/40 transition-all duration-300"

                        >
                            <PiCertificate className="w-5 h-5 text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" />
                            <div className="text-left">
                                <span className="text-sm text-white block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{name}</span>
                                <span className="text-xs text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
