import { CONTACTS } from '@/lib/constants/contacts';

export function ContactSection() {
    return (
        <section
            id="contact"
            className="min-h-screen pt-20 pb-16 md:py-0 md:h-screen md:snap-start md:snap-always flex flex-col items-center justify-center relative px-6 md:px-12"
        >
            {/* タイトル */}
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Contact
            </h2>
            <p className="text-white/70 mb-8 md:mb-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Get in touch with me
            </p>

            {/* カード */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
                {CONTACTS.map(({ name, icon: Icon, url, available }) => (
                    available ? (
                        <a
                            key={name}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-4 md:p-6 bg-black/40 border border-white/20 rounded-lg hover:border-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            <Icon className="w-8 h-8 text-white mb-3 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300" />
                            <span className="text-sm text-white/90 group-hover:text-white">{name}</span>
                        </a>
                    ) : (
                        <div
                            key={name}
                            className="flex flex-col items-center justify-center p-4 md:p-6 bg-black/20 border border-white/10 rounded-lg cursor-not-allowed"
                        >
                            <Icon className="w-8 h-8 text-white/30 mb-3" />
                            <span className="text-sm text-white/30">{name}</span>
                            <span className="text-xs text-white/20 mt-1">Coming Soon</span>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
}
