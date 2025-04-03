'use client';

import { useRef, useEffect } from 'react';

const BubbleEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<{ x: number; y: number; }>({ x: 0, y: 0 });
    const targetRef = useRef<{ x: number; y: number; }>({ x: 0, y: 0 });
    const ctx = useRef<CanvasRenderingContext2D | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // Trouver l'élément hero (le premier div avec min-h-screen dans le document)
        heroRef.current = document.querySelector('div[class*="min-h-screen"]');
        if (!heroRef.current) return;

        // Cacher le curseur uniquement dans le hero
        heroRef.current.style.cursor = 'none';

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Optimisation du contexte
        ctx.current = canvas.getContext('2d', {
            alpha: true,
            willReadFrequently: false,
            desynchronized: true
        });
        if (!ctx.current) return;

        const updateCanvasSize = () => {
            if (!canvas || !heroRef.current) return;
            const heroRect = heroRef.current.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            // Mise à l'échelle du canvas pour les écrans haute résolution
            canvas.width = heroRect.width * dpr;
            canvas.height = heroRect.height * dpr;
            canvas.style.width = `${heroRect.width}px`;
            canvas.style.height = `${heroRect.height}px`;

            if (ctx.current) {
                ctx.current.scale(dpr, dpr);
            }
        };

        updateCanvasSize();
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateCanvasSize, 100);
        };
        window.addEventListener('resize', handleResize);

        const draw = () => {
            if (!ctx.current || !canvas || !heroRef.current) return;

            const heroRect = heroRef.current.getBoundingClientRect();
            ctx.current.clearRect(0, 0, heroRect.width, heroRect.height);

            // Vérifier si le curseur est dans le hero
            if (
                targetRef.current.x >= heroRect.left &&
                targetRef.current.x <= heroRect.right &&
                targetRef.current.y >= heroRect.top &&
                targetRef.current.y <= heroRect.bottom
            ) {
                // Mise à jour de la position avec lissage optimisé
                cursorRef.current.x += (targetRef.current.x - heroRect.left - cursorRef.current.x) * 0.3;
                cursorRef.current.y += (targetRef.current.y - heroRect.top - cursorRef.current.y) * 0.3;

                // Dessin du halo diffus externe
                ctx.current.filter = 'blur(50px)';
                const outerGradient = ctx.current.createRadialGradient(
                    cursorRef.current.x,
                    cursorRef.current.y,
                    0,
                    cursorRef.current.x,
                    cursorRef.current.y,
                    680
                );
                outerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
                outerGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.15)');
                outerGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
                outerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.current.beginPath();
                ctx.current.arc(cursorRef.current.x, cursorRef.current.y, 680, 0, Math.PI * 2);
                ctx.current.fillStyle = outerGradient;
                ctx.current.fill();

                // Dessin du halo central avec bords nets
                ctx.current.filter = 'blur(2px)';

                // Ajout d'un effet de surbrillance
                const glowGradient = ctx.current.createRadialGradient(
                    cursorRef.current.x,
                    cursorRef.current.y,
                    0,
                    cursorRef.current.x,
                    cursorRef.current.y,
                    15
                );
                glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.current.beginPath();
                ctx.current.arc(cursorRef.current.x, cursorRef.current.y, 15, 0, Math.PI * 2);
                ctx.current.fillStyle = glowGradient;
                ctx.current.fill();

                // Dessin du point central très brillant
                const innerGradient = ctx.current.createRadialGradient(
                    cursorRef.current.x,
                    cursorRef.current.y,
                    0,
                    cursorRef.current.x,
                    cursorRef.current.y,
                    8
                );
                innerGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                innerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
                innerGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.95)');
                innerGradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.3)');
                innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.current.beginPath();
                ctx.current.arc(cursorRef.current.x, cursorRef.current.y, 8, 0, Math.PI * 2);
                ctx.current.fillStyle = innerGradient;
                ctx.current.fill();

                ctx.current.filter = 'none';
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            targetRef.current.x = e.clientX;
            targetRef.current.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        draw();

        return () => {
            if (heroRef.current) {
                heroRef.current.style.cursor = '';
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
                mixBlendMode: 'screen',
                cursor: 'none'
            }}
        />
    );
};

export default BubbleEffect; 