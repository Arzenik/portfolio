'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Text, Plane } from '@react-three/drei';
import * as THREE from 'three';

const Maze = ({ onWin, onRestart }: { onWin: () => void; onRestart: () => void }) => {
    const mazeRef = useRef<THREE.Group>(null);
    const [position, setPosition] = useState({ x: 1, z: 1 });
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver || win) return;

            const newPosition = { ...position };
            switch (e.key) {
                case 'ArrowUp':
                    newPosition.z -= 1;
                    break;
                case 'ArrowDown':
                    newPosition.z += 1;
                    break;
                case 'ArrowLeft':
                    newPosition.x -= 1;
                    break;
                case 'ArrowRight':
                    newPosition.x += 1;
                    break;
            }

            const newX = Math.round(newPosition.x);
            const newZ = Math.round(newPosition.z);

            if (newX >= 0 && newX < maze[0].length && newZ >= 0 && newZ < maze.length) {
                if (maze[newZ][newX] === 0) {
                    setPosition(newPosition);
                } else if (maze[newZ][newX] === 2) {
                    setWin(true);
                    onWin();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [position, gameOver, win, onWin]);

    useEffect(() => {
        if (win) {
            const timeout = setTimeout(() => {
                onRestart();
                setWin(false);
                setPosition({ x: 1, z: 1 });
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [win, onRestart]);

    return (
        <group ref={mazeRef}>
            <Plane
                args={[8, 8]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[3.5, 0, 3.5]}
                receiveShadow
            >
                <meshStandardMaterial color="#1a1a1a" />
            </Plane>

            {maze.map((row, z) =>
                row.map((cell, x) => (
                    <group key={`${x}-${z}`}>
                        {cell === 1 && (
                            <Box
                                args={[1, 1.5, 1]}
                                position={[x, 0.75, z]}
                                castShadow
                                receiveShadow
                            >
                                <meshStandardMaterial
                                    color="#4C1D95"
                                    metalness={0.2}
                                    roughness={0.8}
                                />
                            </Box>
                        )}
                        {cell === 2 && (
                            <Box
                                args={[0.5, 0.5, 0.5]}
                                position={[x, 0.25, z]}
                                castShadow
                            >
                                <meshStandardMaterial
                                    color="#FFD700"
                                    metalness={0.7}
                                    roughness={0.3}
                                    emissive="#FFD700"
                                    emissiveIntensity={0.2}
                                />
                            </Box>
                        )}
                    </group>
                ))
            )}

            <Box
                args={[0.5, 0.5, 0.5]}
                position={[position.x, 0.25, position.z]}
                castShadow
            >
                <meshStandardMaterial
                    color="#6D28D9"
                    metalness={0.5}
                    roughness={0.5}
                    emissive="#6D28D9"
                    emissiveIntensity={0.2}
                />
            </Box>

            {win && (
                <Text
                    position={[3.5, 2, 3.5]}
                    fontSize={0.5}
                    color="#00FF00"
                    anchorX="center"
                    anchorY="middle"
                >
                    Gagné !
                </Text>
            )}
        </group>
    );
};

const GameScene = ({ onWin, onRestart }: { onWin: () => void; onRestart: () => void }) => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(4, 6, 8);
        camera.lookAt(3.5, 0, 3.5);
    }, [camera]);

    return (
        <>
            <color attach="background" args={['#000000']} />
            <fog attach="fog" args={['#000000', 8, 20]} />

            <ambientLight intensity={0.4} />
            <pointLight
                position={[3.5, 6, 3.5]}
                intensity={50}
                distance={10}
                decay={2}
                castShadow
            />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.5}
                castShadow
            />

            <Maze onWin={onWin} onRestart={onRestart} />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2.5}
                rotateSpeed={0.5}
            />
        </>
    );
};

const MazeGame = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleWin = () => {
        setIsRunning(false);
    };

    const handleRestart = () => {
        setTime(0);
        setIsRunning(true);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden relative">
            <div className="absolute top-4 right-4 text-white/80 text-sm z-10">
                Temps: {formatTime(time)}
            </div>
            <Canvas shadows>
                <GameScene onWin={handleWin} onRestart={handleRestart} />
            </Canvas>
            <div className="absolute bottom-4 left-4 text-white/80 text-sm z-10">
                Utilisez les flèches du clavier pour vous déplacer
            </div>
        </div>
    );
};

export default MazeGame; 