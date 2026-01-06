export interface CareerItem {
    period: string;
    company: string;
    role: string;
    isCurrent?: boolean;
}

export const CAREER: CareerItem[] = [
    {
        period: '2020 - 2022',
        company: '株式会社○○',
        role: 'ゲームエンジニア',
        isCurrent: false,
    },
    {
        period: '2022 - Present',
        company: '株式会社△△',
        role: 'フルスタックエンジニア',
        isCurrent: true,
    },
];