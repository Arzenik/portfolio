'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechIcon from './TechIcon';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    { name: 'Three.js', icon: '🎮', color: '#000000' },
    { name: 'GSAP', icon: '✨', color: '#88CE02' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'Tailwind', icon: '🎨', color: '#38B2AC' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'D3.js', icon: '📊', color: '#F9A03C' }
];

const TechStack = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const titleElement = section.querySelector('.tech-title');
        const icons = section.querySelectorAll('.tech-icon');

        if (titleElement) {
            gsap.from(titleElement, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }

        if (icons.length > 0) {
            gsap.from(icons, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="tech-title text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-12 text-center">
                    Technologies
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {technologies.map((tech, index) => (
                        <div key={index} className="tech-icon">
                            <TechIcon {...tech} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack; 