export interface WorkItem {
    id: string;
    title: string;
    category: 'website' | 'webapp' | 'desktop';
    description: string;
    banner?: string;
    images?: string[];
    url: string;
    isComingSoon: boolean;
}

export const WORKS: WorkItem[] = [
    {
        id: 'desktop-1',
        title: 'Shelfie',
        category: 'desktop',
        description: 'Shelfieは、本やゲームを美しく管理するためのWindowsデスクトップアプリケーションです。\n物理的な棚を整理するように、デジタル上であなたのコレクションを一元管理します。',
        banner: '/images/works/shelfie/shelfie_banner.png',
        images: [
            '/images/works/shelfie/shelfie_banner.png',
            '/images/works/shelfie/shelfie.png',
            '/images/works/shelfie/screenshot-list.png',
            '/images/works/shelfie/screenshot-detail-book.png',
            '/images/works/shelfie/screenshot-detail-game.png',
            '/images/works/shelfie/screenshot-edit.png',
            '/images/works/shelfie/screenshot-add-dialog.png'
        ],
        url: 'https://github.com/izoizo2000/Shelfie',
        isComingSoon: false,
    },
    {
        id: 'website-1',
        title: 'Coming Soon...',
        category: 'website',
        description: 'Webサイト作品を準備中です',
        url: '#',
        isComingSoon: true,
    },
    {
        id: 'webapp-1',
        title: 'Coming Soon...',
        category: 'webapp',
        description: 'Webアプリケーションを準備中です',
        url: '#',
        isComingSoon: true,
    }
];
