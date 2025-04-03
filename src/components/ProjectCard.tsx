'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const ProjectCard = ({ title, description, image, technologies, githubUrl, liveUrl }: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(card, {
                '--x': `${x}px`,
                '--y': `${y}px`,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 overflow-hidden">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-300 mb-4">{description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-3">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Voir le site
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard; 