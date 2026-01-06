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
import { IconType } from 'react-icons';

export interface SkillItem {
    name: string;
    icon: IconType;
}

export interface SkillCategory {
    category: string;
    items: SkillItem[];
}

// スキル情報
export const SKILLS: SkillCategory[] = [
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