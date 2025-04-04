'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const titleElement = section.querySelector('.about-title');
        const contentElement = section.querySelector('.about-content');

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

        if (contentElement) {
            gsap.from(contentElement, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: 'power3.out'
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="about-title text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-custom-100 to-gray-custom-300 mb-12 text-center">
                    À Propos de Moi
                </h2>

                <div className="about-content grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-gray-custom-100 text-lg leading-relaxed">
                            Passionné par le développement web et les nouvelles technologies, je crée des expériences numériques uniques et immersives.
                        </p>
                        <p className="text-gray-custom-100 text-lg leading-relaxed">
                            Mon approche combine créativité et expertise technique pour donner vie à des projets innovants.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-gray-custom-100 to-gray-custom-300 rounded-full text-gray-custom-900 font-medium hover:opacity-90 transition-opacity">
                                Voir mes projets
                            </button>
                            <button className="px-6 py-3 border border-gray-custom-100/20 rounded-full text-gray-custom-100 font-medium hover:bg-gray-custom-100/10 transition-colors">
                                Me contacter
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-custom-100/20 to-gray-custom-300/20" />
                        {/* Ici, vous pourrez ajouter une image ou un élément 3D */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About; 