'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Html } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
    { name: 'React', color: '#61DAFB', level: 90 },
    { name: 'TypeScript', color: '#3178C6', level: 85 },
    { name: 'Three.js', color: '#000000', level: 80 },
    { name: 'GSAP', color: '#88CE02', level: 85 },
    { name: 'Next.js', color: '#000000', level: 90 },
    { name: 'Tailwind', color: '#38B2AC', level: 95 },
    { name: 'Node.js', color: '#339933', level: 80 },
    { name: 'D3.js', color: '#F9A03C', level: 75 }
];

const TopographyScene = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(30, 30, 100, 100);
    }, []);

    const peaks = useMemo(() => {
        return technologies.map((tech, index) => {
            const angle = (index / technologies.length) * Math.PI * 2;
            const radius = 8;
            return {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                height: tech.level / 40,
                tech,
                subPeaks: Array(8).fill(0).map(() => ({
                    x: (Math.random() - 0.5) * 3,
                    y: (Math.random() - 0.5) * 3,
                    height: Math.random() * 0.3 + 0.2
                }))
            };
        });
    }, []);

    useFrame(() => {
        if (!meshRef.current) return;

        const position = meshRef.current.geometry.attributes.position;
        const vertex = new THREE.Vector3();

        for (let i = 0; i <= position.count; i++) {
            vertex.fromBufferAttribute(position, i);
            let z = 0;

            peaks.forEach(peak => {
                const distance = new THREE.Vector2(vertex.x - peak.x, vertex.y - peak.y).length();
                const influence = Math.exp(-distance * 0.5);

                z += peak.height * influence;

                peak.subPeaks.forEach(subPeak => {
                    const subDistance = new THREE.Vector2(
                        vertex.x - (peak.x + subPeak.x),
                        vertex.y - (peak.y + subPeak.y)
                    ).length();
                    const subInfluence = Math.exp(-subDistance * 0.8);
                    z += (peak.height * subPeak.height * 0.4) * subInfluence;
                });
            });

            position.setZ(i, z);
        }

        position.needsUpdate = true;
    });

    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <Grid
                position={[0, 0, -0.01]}
                args={[30, 30]}
                cellSize={1.5}
                cellThickness={0.1}
                cellColor="#333333"
                sectionSize={5}
                sectionThickness={0.2}
                sectionColor="#444444"
                fadeDistance={30}
                fadeStrength={1.5}
            />
            <mesh ref={meshRef} geometry={geometry}>
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </mesh>
            {peaks.map((peak, i) => (
                <Html
                    key={i}
                    position={[peak.x, peak.y, peak.height + 0.5]}
                    center
                    distanceFactor={12}
                    occlude={false}
                    style={{
                        pointerEvents: 'none',
                        transform: 'scale(0.8)',
                        transformOrigin: 'center',
                        width: 'auto',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <div className="flex flex-col items-start space-y-1">
                        <div className="flex items-center space-x-2">
                            <div className="w-[3px] h-[3px] bg-white opacity-80" />
                            <div className="text-white font-mono text-[11px] tracking-[0.2em] uppercase">
                                {peak.tech.name}
                            </div>
                        </div>
                        <div className="flex items-center space-x-1.5 ml-4">
                            <div className="h-[1px] w-4 bg-white opacity-30" />
                            <div className="text-white font-mono text-[10px] opacity-60">
                                {peak.tech.level}%
                            </div>
                        </div>
                    </div>
                </Html>
            ))}
        </group>
    );
};

const SkillsAndTech = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const titleElement = section.querySelector('.section-title');
        const techElements = section.querySelectorAll('.tech-item');

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

        if (techElements.length > 0) {
            gsap.from(techElements, {
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
            id="skills"
            className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="absolute top-16 left-8 z-10">
                <div className="relative">
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-[1px] bg-white opacity-20" />
                        <h2 className="section-title text-xl font-mono text-white tracking-[0.3em] uppercase">
                            Compétences
                        </h2>
                    </div>
                    <p className="text-white/30 font-mono text-[10px] tracking-[0.2em] mt-2 ml-9">
                        EXPERTISE TECHNIQUE / 2024
                    </p>
                </div>
            </div>

            <div className="absolute top-16 right-8 z-10 font-mono text-[8px] space-y-3">
                <div className="flex items-center justify-end space-x-2">
                    <span className="text-white/30 tracking-[0.2em] uppercase">Niveau</span>
                    <div className="w-3 h-[1px] bg-white/20" />
                </div>
                <div className="flex items-center justify-end space-x-2">
                    <span className="text-white/30 tracking-[0.2em] uppercase">Tech</span>
                    <div className="w-[2px] h-[2px] bg-white/40" />
                </div>
            </div>

            <div className="relative h-[800px] mt-24">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0"></div>
                <Canvas camera={{ position: [12, 12, 12], fov: 50 }}>
                    <color attach="background" args={['#000000']} />
                    <fog attach="fog" args={['#000000', 0, 50]} />
                    <TopographyScene />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.15}
                        maxPolarAngle={Math.PI / 2.2}
                        minPolarAngle={0.3}
                    />
                </Canvas>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </section>
    );
};

export default SkillsAndTech; 