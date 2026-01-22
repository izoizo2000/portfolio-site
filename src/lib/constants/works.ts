export interface WorkItem {
    id: string;
    title: string;
    category: 'website' | 'webapp';
    description: string;
    image?: string;
    url: string;
    isComingSoon: boolean;
}

export const WORKS: WorkItem[] = [
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
