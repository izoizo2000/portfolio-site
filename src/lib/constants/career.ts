export interface CareerItem {
    period: string;
    company: string;
    role: string;
    isCurrent?: boolean;
}

export const CAREER: CareerItem[] = [
    {
        period: '2015.4 - 2019.3',
        company: '関西大学',
        role: '法学部 法学政治学科',
        isCurrent: false,
    },
    {
        period: '2019.4 - 2022.7',
        company: 'スズキ株式会社',
        role: '営業',
        isCurrent: false,
    },
    {
        period: '2022.11 - 2023.5',
        company: '職業訓練校',
        role: 'Web/ゲーム開発コース',
        isCurrent: false,
    },
    {
        period: '2023.7 - Present',
        company: '株式会社ダンクハーツ',
        role: 'フルスタックエンジニア',
        isCurrent: true,
    },
];