'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BubbleEffect from './BubbleEffect';
import GlowingText from './GlowingText';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLParagraphElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out' }
        });

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1
        })
            .from(roleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8
            }, '-=0.6')
            .from(descriptionRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8
            }, '-=0.6')
            .from(scrollIndicatorRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.8
            }, '-=0.4');

        gsap.to(scrollIndicatorRef.current, {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'power1.inOut'
        });
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        tl.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: 'none'
        });
    }, []);

    return (
        <div id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
            <div className="absolute inset-0 z-10">
                <BubbleEffect />
            </div>

            <div className="relative z-20 text-center space-y-8 px-4">
                <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                    <GlowingText text="Aurélien Derouet" className="block font-mono" />
                    <span ref={roleRef} className="block text-xl md:text-2xl lg:text-3xl mt-4 font-light tracking-widest">
                        Développeur Full Stack & 3D
                    </span>
                </h1>

                <p ref={descriptionRef} className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light">
                    Créateur d'expériences web immersives et innovantes
                </p>

                <div className="flex justify-center space-x-6">
                    <a href="#projects" className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors duration-300">
                        Voir mes projets
                    </a>
                    <a href="#contact" className="px-8 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors duration-300">
                        Me contacter
                    </a>
                </div>
            </div>

            <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="animate-bounce">
                    <svg className="w-6 h-6 text-white/50" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Hero; 