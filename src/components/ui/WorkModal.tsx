'use client'

import { useState } from 'react';
import { WorkItem } from '@/lib/constants/works';

interface WorkModalProps {
    work: WorkItem;
    onClose: () => void;
}

export function WorkModal({ work, onClose }: WorkModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = work.images || [];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative bg-gray-900 rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 閉じるボタン */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
                >
                    ✕
                </button>

                {/* タイトル */}
                <h3 className="text-2xl font-bold text-white mb-4">{work.title}</h3>

                {/* スライドショー */}
                {images.length > 0 && (
                    <div className="relative mb-6">
                        <img
                            src={images[currentIndex]}
                            alt={`${work.title} - ${currentIndex + 1}`}
                            className="w-full h-96 object-contain rounded-lg bg-black/30"
                        />

                        {/* ナビゲーション */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full"
                                >
                                    〈
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full"
                                >
                                    〉
                                </button>
                                {/* インジケーター */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, idx: number) => (
                                        <span
                                            key={idx}
                                            className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* 説明 */}
                <p className="text-white/80 mb-6 whitespace-pre-line">{work.description}</p>

                {/* リンクボタン */}
                <a 
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                    GitHubで見る →
                </a>
            </div>
        </div>

    );
}