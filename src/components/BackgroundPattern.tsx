'use client';

import { Canvas } from '@react-three/fiber';
import { useTheme } from '@/context/ThemeContext';
import ParticleField from './ParticleField';

const BackgroundPattern = () => {
    const { theme } = useTheme();

    return (
        <div className={`fixed inset-0 -z-50 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField />
            </Canvas>
        </div>
    );
};

export default BackgroundPattern; 