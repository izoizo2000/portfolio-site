import { 
    SiGo, SiTypescript,
    SiReact, SiNextdotjs,
    SiGit, SiDocker, SiAmazonwebservices,
    SiUnity,
    SiMysql
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { DiDatabase } from 'react-icons/di';
import { SiCocos } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { PiCertificate } from 'react-icons/pi';

// スキル情報
const SKILLS = [
    {
        category: 'Languages',
        items: [
            { name: 'C#', icon: TbBrandCSharp },
            { name: 'Go', icon: SiGo },
            { name: 'TypeScript', icon: SiTypescript },
        ]
    },
    {
        category: 'Frameworks',
        items: [
            { name: 'React', icon: SiReact },
            { name: 'Next.js', icon: SiNextdotjs },
        ]
    },
    {
        category: 'Tools',
        items: [
            { name: 'Git', icon: SiGit },
            { name: 'Docker', icon: SiDocker },
            { name: 'AWS', icon: SiAmazonwebservices },
            { name: 'Azure', icon: VscAzure },
        ]
    },
    {
        category: 'Engines',
        items: [
            { name: 'Unity', icon: SiUnity },
            { name: 'Cocos Creator', icon: SiCocos },
        ]
    },
    {
        category: 'Databases',
        items: [
            { name: 'MySQL', icon: SiMysql },
            { name: 'SQL Server', icon: DiDatabase },
        ]
    }
];

// 資格情報
const CERTIFICATIONS = [
    { name: '基本情報技術者', year: '2024' },
    { name: '情報セキュリティマネジメント', year: '2024' },
];

export function SkillSection() {
    return (
        <section
            id="skills"
            className="h-screen snap-start snap-always flex flex-col items-center justify-center relative px-6 md:px-12"
        >
           {/* タイトル - グリッチ風 */}
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 relative">
                <span className="relative z-10">Skills</span>
                <span className="absolute top-0 left-1 text-cyan-500/50 -z-10">Skills</span>
                <span className="absolute top-0 -left-1 text-pink-500/50 -z-10">Skills</span>
                <span className="block text-sm md:text-base font-mono text-cyan-400/70 mt-2">
                    {'<'} Technologies I work with {'/>'} 
                </span>
            </h2>

            {/* スキルカード - 角ばったデザイン */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 w-full max-w-6xl">
                {SKILLS.map(({ category, items }) => (
                    <div 
                        key={category}
                        className="group relative bg-black/80 p-6 clip-path-cyber border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
                    >
                        {/* 角の装飾 */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-pink-500" />
                        
                        <h3 className="text-xs font-mono font-bold text-cyan-400 mb-5 uppercase tracking-widest">
                            [{category}]
                        </h3>
                        <div className="flex flex-col gap-4">
                            {items.map(({ name, icon: Icon }) => (
                                <div key={name} className="flex items-center gap-4 group/item">
                                    <Icon className="w-5 h-5 text-cyan-400/60 group-hover/item:text-cyan-300 transition-colors" />
                                    <span className="text-sm font-mono text-white/70 group-hover/item:text-white transition-colors">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 資格 - ターミナル風 */}
            <div className="mt-12 w-full max-w-6xl">
                <h3 className="text-xs font-mono font-bold text-pink-500 mb-4 uppercase tracking-widest text-center">
                    $ certifications --list
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                    {CERTIFICATIONS.map(({ name, year }) => (
                        <div 
                            key={name}
                            className="group flex items-center gap-3 px-5 py-3 bg-black/80 border border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300"
                        >
                            <span className="text-pink-500 font-mono">{'>'}</span>
                            <PiCertificate className="w-5 h-5 text-pink-400/80" />
                            <div className="text-left">
                                <span className="text-sm font-mono text-white/90 block">{name}</span>
                                <span className="text-xs font-mono text-pink-400/60">{year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
            
        </section>
    );
}