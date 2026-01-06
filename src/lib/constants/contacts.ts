import { FaXTwitter, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { IconType } from 'react-icons';

export interface ContactItem {
    name: string;
    icon: IconType;
    url: string;
    available: boolean;
}

export const CONTACTS: ContactItem[] = [
    { 
        name: 'X (Twitter)', 
        icon: FaXTwitter, 
        url: 'https://x.com/izo614',
        available: true 
    },
    { 
        name: 'GitHub', 
        icon: FaGithub, 
        url: '#',
        available: false 
    },
    { 
        name: 'LinkedIn', 
        icon: FaLinkedin, 
        url: '#',
        available: false 
    },
    { 
        name: 'Email', 
        icon: MdEmail, 
        url: '#',
        available: false 
    },
];