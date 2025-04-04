'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/project';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                const formattedProjects = data.map(project => ({
                    title: project.title,
                    description: project.description,
                    image: project.image,
                    technologies: project.technologies || [],
                    githubLink: project.github_url,
                    demoLink: project.live_url
                }));

                setProjects(formattedProjects);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (!titleRef.current || !projectsRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top center',
                end: 'bottom bottom',
            }
        });

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }).from(projectsRef.current.children, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5');

    }, []);

    if (loading) {
        return (
            <section id="projects" ref={sectionRef} className="relative py-20 min-h-screen">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="container mx-auto px-4 relative z-10">
                    <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
                        Mes Projets
                    </h2>
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" ref={sectionRef} className="relative py-20 min-h-screen">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="container mx-auto px-4 relative z-10">
                <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
                    Mes Projets
                </h2>
                <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects; 