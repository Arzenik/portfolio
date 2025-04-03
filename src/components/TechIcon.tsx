'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface TechIconProps {
    name: string;
    icon: string;
    color: string;
}

const TechIcon = ({ name, icon, color }: TechIconProps) => {
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const icon = iconRef.current;
        if (!icon) return;

        const handleMouseEnter = () => {
            gsap.to(icon, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        icon.addEventListener('mouseenter', handleMouseEnter);
        icon.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            icon.removeEventListener('mouseenter', handleMouseEnter);
            icon.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <motion.div
            ref={iconRef}
            className="flex flex-col items-center p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div
                className="w-16 h-16 mb-2"
                style={{ color }}
            >
                {icon}
            </div>
            <span className="text-white text-sm">{name}</span>
        </motion.div>
    );
};

export default TechIcon; 