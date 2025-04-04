'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import { Project, getProjects } from '@/lib/projects';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            const projectsData = await getProjects();
            setProjects(projectsData);
            setLoading(false);
        };

        loadProjects();
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const titleElement = section.querySelector('.projects-title');
        const projectCards = section.querySelectorAll('.project-card');

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

        if (projectCards.length > 0) {
            gsap.from(projectCards, {
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
    }, [projects]);

    if (loading) {
        return (
            <section className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-custom-100"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_100%)]" />

            <div className="max-w-7xl mx-auto relative">
                <h2 className="projects-title text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-custom-100 to-gray-custom-300 mb-12 text-center">
                    Mes Projets
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects; 