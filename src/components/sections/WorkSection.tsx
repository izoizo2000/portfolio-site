import { WORKS } from "@/lib/constants/works";

export function WorkSection() {
    return (
        <section
            id="works"
            className="min-h-screen pt-20 pb-16 md:py-0 md:h-screen md:snap-start md:snap-always flex flex-col items-center justify-center relative" 
        >
            {/* コンテンツコンテナ */}
            <div className="bg-black/20 rounded-2xl p-4 md:p-8 mx-4 md:mx-0">
                {/* タイトル */}
                <div className="mb-6 md:mb-12 text-center">
                    <h2 className="text-3xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                        Works
                    </h2>
                    <p className="text-white/90 mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        My Project
                    </p>
                </div>

                {/* 作品カード */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {WORKS.map(({ id, title, category, description, isComingSoon }) => (
                    <div
                        key={id}
                        className="group p-4 md:p-8 bg-black/30 border border-white/20 rounded-lg hover:border-white/50 hover:bg-black/40 transition-all duration-300"
                    >
                        {/* カテゴリラベル */}
                        <span className="text-xs font-bold text-white/70 uppercase tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                            {category === 'website' ? 'Web Site' : "Web App"}
                        </span>

                        {/* タイトル */}
                        <h3 className="text-xl md:text-2xl font-bold text-white mt-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                            {title}
                        </h3>

                        {/* 説明 */}
                        <p className="text-white/80 mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                            {description}
                        </p>

                        {/* Comming Soon バッジ */}
                        {isComingSoon && (
                            <div className="mt-6 inline-block px-4 py-2 border border-white/30 rounded-full">
                                <span className="text-xs text-white/70 uppercase tracking-wider">
                                    Coming Soon
                                </span>
                            </div>
                        )}
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
}