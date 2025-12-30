export type SectionId = 'hero' | 'about' | 'skills' | 'works' | 'contact';

export interface SectionDefinition {
    id: SectionId;
    shapeIndex: number; // 各セクションに対応する形状のインデックス
    title: string;
}

export const SECTIONS: SectionDefinition[] = [
    { id: 'hero', shapeIndex: 0, title: 'Home' }, // 球体
    { id: 'about', shapeIndex: 1, title: 'About Me' }, // トーラス
    { id: 'skills', shapeIndex: 2, title: 'Skills' }, // 三角錐
    { id: 'works', shapeIndex: 3, title: 'Works' }, // 立方体
    { id: 'contact', shapeIndex: 0, title: 'Contact' }, // 球体
];
