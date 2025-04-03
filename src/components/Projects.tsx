'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Popcorn ESD",
        description: "Site de mini-jeux culturels développé en collaboration avec Mohamadou SY. Une collection de jeux interactifs autour de la culture pop, du rap, des jeux vidéo et du cinéma.",
        image: "https://placehold.co/600x400/4C1D95/ffffff?text=Popcorn+ESD",
        technologies: ["React", "TypeScript", "Tailwind", "Framer Motion"],
        liveUrl: "https://popcorn-esd.com"
    },
    {
        title: "React Marble",
        description: "Application web interactive de visualisation de marbre avec animations et interface moderne, développée en TypeScript et utilisant MaterialUI.",
        image: "https://placehold.co/600x400/4C1D95/ffffff?text=React+Marble",
        technologies: ["React", "TypeScript", "Material UI"],
        githubUrl: "https://github.com/Arzenik/project_react_marble",
        liveUrl: "https://project-react-marble.vercel.app"
    },
    {
        title: "API Symfony",
        description: "API RESTful développée avec Symfony pour la gestion de données. Architecture MVC, authentification JWT, validation des données et documentation complète avec Swagger/OpenAPI.",
        image: "https://placehold.co/600x400/4C1D95/ffffff?text=API+Symfony",
        technologies: ["Symfony", "PHP", "MySQL", "API Platform", "Doctrine ORM"],
        githubUrl: "https://github.com/Arzenik/symphony"
    }
];

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const titleElement = section.querySelector('.projects-title');
        const cards = section.querySelectorAll('.project-card');

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

        if (cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,29,149,0.1)_0%,rgba(0,0,0,0)_100%)]" />

            <div className="max-w-7xl mx-auto relative">
                <h2 className="projects-title text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-12 text-center">
                    Mes Projets
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects; 