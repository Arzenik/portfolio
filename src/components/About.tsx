'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dotsRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number }[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialiser les points
        const numberOfDots = 50;
        dotsRef.current = Array.from({ length: numberOfDots }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 2 + 1
        }));

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dessiner et animer les points
            dotsRef.current.forEach(dot => {
                // Mettre à jour la position
                dot.x += dot.vx;
                dot.y += dot.vy;

                // Rebondir sur les bords
                if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
                if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

                // Effet d'attraction vers la souris
                const dx = mouseRef.current.x - dot.x;
                const dy = mouseRef.current.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 500;
                    dot.vx += Math.cos(angle) * force;
                    dot.vy += Math.sin(angle) * force;
                }

                // Limiter la vitesse
                const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
                if (speed > 3) {
                    dot.vx = (dot.vx / speed) * 3;
                    dot.vy = (dot.vy / speed) * 3;
                }

                // Dessiner le point
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#4fc3dc';
                ctx.fill();

                // Dessiner les connexions
                dotsRef.current.forEach(otherDot => {
                    const dx = dot.x - otherDot.x;
                    const dy = dot.y - otherDot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(otherDot.x, otherDot.y);
                        ctx.strokeStyle = `rgba(79, 195, 220, ${1 - distance / 100})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
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
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About; 