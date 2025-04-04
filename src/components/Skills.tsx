'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Three.js", level: 80 },
    { name: "GSAP", level: 85 },
    { name: "Next.js", level: 90 },
    { name: "Node.js", level: 75 }
];

const SkillSphere = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Sphere args={[1, 64, 64]}>
                <meshStandardMaterial
                    color="#4C1D95"
                    metalness={0.7}
                    roughness={0.2}
                    wireframe
                    transparent
                    opacity={0.8}
                />
            </Sphere>
            <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
    );
};

const Skills = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const titleElement = section.querySelector('.skills-title');
        const skillBars = section.querySelectorAll('.skill-bar');

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

        if (skillBars.length > 0) {
            gsap.from(skillBars, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                },
                width: 0,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,29,149,0.1)_0%,rgba(0,0,0,0)_100%)]" />

            <div className="max-w-7xl mx-auto relative">
                <h2 className="skills-title text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-custom-100 to-gray-custom-300 mb-12 text-center">
                    Mes Compétences
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        {skills.map((skill, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-custom-100 font-medium">{skill.name}</span>
                                    <span className="text-gray-custom-400">{skill.level}%</span>
                                </div>
                                <div className="h-2 bg-gray-custom-100/10 rounded-full overflow-hidden">
                                    <div
                                        className="skill-bar h-full bg-gradient-to-r from-gray-custom-100 to-gray-custom-300 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-[400px]">
                        <SkillSphere />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills; 