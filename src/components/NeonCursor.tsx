'use client';

import { useEffect, useRef } from 'react';

const LightCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const handleMouseMove = (e: MouseEvent) => {
            const heroSection = document.querySelector('#hero');
            if (!heroSection) return;

            const heroRect = heroSection.getBoundingClientRect();
            const isInHero = e.clientY >= heroRect.top && e.clientY <= heroRect.bottom;

            if (isInHero) {
                cursor.style.opacity = '1';
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                document.body.style.cursor = 'none';
            } else {
                cursor.style.opacity = '0';
                document.body.style.cursor = 'auto';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            style={{
                position: 'fixed',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(60, 20, 120, 0.5) 0%, rgba(30, 10, 60, 0.3) 50%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 2147483647,
                transform: 'translate(-50%, -50%)',
                mixBlendMode: 'screen',
                transition: 'transform 0.1s ease-out, opacity 0.3s ease-out',
                opacity: 0,
                animation: 'pulse 4s ease-in-out infinite',
            }}
        />
    );
};

export default LightCursor; 