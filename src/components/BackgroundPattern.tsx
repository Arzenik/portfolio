'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

const ParticleField = () => {
    const ref = useRef<THREE.Points>(null);
    const positions = new Float32Array(5000 * 3);
    random.inSphere(positions, { radius: 1.5 });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#4C1D95"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const BackgroundPattern = () => {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField />
            </Canvas>
        </div>
    );
};

export default BackgroundPattern; 