'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = {
    frontend: {
        title: "Frontend",
        skills: [
            { name: "HTML/CSS", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "React", level: 80 },
            { name: "Vue.js", level: 75 },
            { name: "Bootstrap", level: 85 },
            { name: "Bulma", level: 80 }
        ]
    },
    backend: {
        title: "Backend",
        skills: [
            { name: "PHP", level: 80 },
            { name: "Symfony", level: 75 },
            { name: "Python", level: 70 },
            { name: "PostgreSQL", level: 70 }
        ]
    },
    design: {
        title: "Design",
        skills: [
            { name: "Figma", level: 75 },
            { name: "Photoshop", level: 70 },
            { name: "Illustrator", level: 65 },
            { name: "Canva", level: 80 }
        ]
    },
    tools: {
        title: "Outils & Méthodes",
        skills: [
            { name: "Git", level: 80 },
            { name: "Docker", level: 70 },
            { name: "WordPress", level: 75 },
            { name: "Notion", level: 90 },
            { name: "UML", level: 85 }
        ]
    }
};

const SkillsAndTech = () => {
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            Object.values(skillCategories).forEach((category, categoryIndex) => {
                category.skills.forEach((_, skillIndex) => {
                    const selector = `.category-${categoryIndex} .skill-bar:nth-child(${skillIndex + 1})`;

                    gsap.fromTo(
                        `${selector} .skill-progress`,
                        {
                            width: "0%",
                            opacity: 0
                        },
                        {
                            width: `${category.skills[skillIndex].level}%`,
                            opacity: 1,
                            duration: 1.5,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: selector,
                                start: "top 80%",
                            }
                        }
                    );

                    gsap.fromTo(
                        `${selector} .skill-name`,
                        {
                            x: -50,
                            opacity: 0
                        },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 1,
                            delay: 0.2,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: selector,
                                start: "top 80%",
                            }
                        }
                    );
                });
            });
        }, skillsRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full min-h-screen py-20">
            <div className="w-full max-w-7xl mx-auto px-4" ref={skillsRef}>
                <h2 className="text-4xl font-bold mb-16">
                    Compétences & Technologies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {Object.values(skillCategories).map((category, categoryIndex) => (
                        <div key={categoryIndex} className={`category-${categoryIndex}`}>
                            <h3 className="text-2xl font-bold mb-8">
                                {category.title}
                            </h3>
                            <div className="space-y-6">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="skill-bar">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="skill-name font-medium">
                                                {skill.name}
                                            </span>
                                            <span className="font-medium text-blue-600">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="skill-progress h-full bg-blue-600 rounded-full"
                                                style={{ width: "0%" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsAndTech; 