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

        // Animation du scroll indicator
        gsap.to(scrollIndicatorRef.current, {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'power1.inOut'
        });
    }, []);

    return (
        <div id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
            {/* Effet de distorsion */}
            <div className="absolute inset-0 z-0">
                <BubbleEffect />
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col items-center justify-center min-h-screen relative z-20">
                <div className="text-center">
                    <GlowingText text="DEVELOPER" className="mb-4" />
                </div>
            </div>

            {/* Indicateur de scroll */}
            <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-white/30 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default Hero; 