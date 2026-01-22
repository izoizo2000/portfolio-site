import { useState, useEffect } from "react";
import { SectionId, SECTIONS } from "@/lib/constants/sections";

export function useActiveSection(): SectionId {
    const [activeSection, setActiveSection] = useState<SectionId>('hero');

    useEffect(() => {       
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id as SectionId);
                    }
                });
            },
            { threshold: 0, rootMargin: '-50% 0px -50% 0px' }
        );

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return activeSection;
}