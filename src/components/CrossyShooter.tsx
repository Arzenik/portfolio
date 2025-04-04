'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

const ROAD_WIDTH = 20;
const LANE_COUNT = 5;
const OBSTACLE_COUNT = 3;

interface Obstacle {
    id: number;
    x: number;
    z: number;
    speed: number;
    isAlive: boolean;
}

interface Bullet {
    id: number;
    position: THREE.Vector3;
}

const Player = ({ position, onShoot }: { position: THREE.Vector3; onShoot: () => void }) => {
    return (
        <group position={position}>
            {/* Corps du joueur */}
            <Box args={[0.6, 1, 0.6]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#6D28D9" />
            </Box>
            {/* Fusil */}
            <Box args={[0.2, 0.2, 1]} position={[0, 0.6, -0.6]} rotation={[0, 0, 0]}>
                <meshStandardMaterial color="#4B5563" metalness={0.8} roughness={0.2} />
            </Box>
        </group>
    );
};

const Bullet = ({ position, onHit }: { position: THREE.Vector3; onHit: () => void }) => {
    const bulletRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (bulletRef.current) {
            bulletRef.current.position.z -= 0.5;
            if (bulletRef.current.position.z < -15) {
                onHit();
            }
        }
    });

    return (
        <Box
            ref={bulletRef}
            args={[0.1, 0.1, 0.3]}
            position={position}
        >
            <meshStandardMaterial color="#FFA500" emissive="#FFA500" emissiveIntensity={0.5} />
        </Box>
    );
};

const Game = ({ onScoreChange, onGameOver }: { onScoreChange: (score: number) => void; onGameOver: () => void }) => {
    const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 0, 8));
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const bulletIdRef = useRef(0);

    // Initialisation des obstacles
    useEffect(() => {
        const newObstacles: Obstacle[] = [];
        for (let lane = 0; lane < LANE_COUNT; lane++) {
            for (let i = 0; i < OBSTACLE_COUNT; i++) {
                newObstacles.push({
                    id: lane * OBSTACLE_COUNT + i,
                    x: Math.random() * ROAD_WIDTH - ROAD_WIDTH / 2,
                    z: -10 + lane * 3,
                    speed: 0.05 + Math.random() * 0.05,
                    isAlive: true
                });
            }
        }
        setObstacles(newObstacles);
    }, []);

    // Gestion des contrôles
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;

            const newPosition = playerPosition.clone();
            switch (e.key) {
                case 'ArrowLeft':
                    newPosition.x = Math.max(newPosition.x - 1, -ROAD_WIDTH / 2);
                    break;
                case 'ArrowRight':
                    newPosition.x = Math.min(newPosition.x + 1, ROAD_WIDTH / 2);
                    break;
                case ' ': // Espace pour tirer
                    e.preventDefault();
                    handleShoot();
                    break;
            }
            setPlayerPosition(newPosition);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playerPosition, gameOver]);

    const handleShoot = () => {
        const newBulletPosition = playerPosition.clone();
        newBulletPosition.y += 0.6;
        newBulletPosition.z -= 0.6;
        setBullets(prev => [...prev, { id: bulletIdRef.current++, position: newBulletPosition }]);
    };

    // Animation des obstacles et détection des collisions
    useFrame(() => {
        if (gameOver) return;

        // Mise à jour des positions des balles
        setBullets(prevBullets => {
            return prevBullets.map(bullet => {
                const newPosition = bullet.position.clone();
                newPosition.z -= 0.5;
                return { ...bullet, position: newPosition };
            }).filter(bullet => bullet.position.z > -15);
        });

        // Mise à jour des obstacles et détection des collisions
        setObstacles(prevObstacles => {
            let scoreToAdd = 0;
            const updatedObstacles = prevObstacles.map(obstacle => {
                if (!obstacle.isAlive) return obstacle;

                let newX = obstacle.x + obstacle.speed;
                if (newX > ROAD_WIDTH / 2) {
                    newX = -ROAD_WIDTH / 2;
                }

                // Vérification des collisions avec les balles
                bullets.forEach(bullet => {
                    const dx = Math.abs(bullet.position.x - obstacle.x);
                    const dz = Math.abs(bullet.position.z - obstacle.z);
                    if (dx < 1 && dz < 1 && obstacle.isAlive) {
                        obstacle.isAlive = false;
                        scoreToAdd += 100;
                    }
                });

                // Collision avec le joueur
                const dx = Math.abs(playerPosition.x - obstacle.x);
                const dz = Math.abs(playerPosition.z - obstacle.z);
                if (dx < 1 && dz < 1 && obstacle.isAlive) {
                    setGameOver(true);
                    onGameOver();
                }

                return { ...obstacle, x: newX };
            });

            if (scoreToAdd > 0) {
                onScoreChange(scoreToAdd);
            }

            return updatedObstacles;
        });
    });

    return (
        <>
            {/* Éclairage */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Sol */}
            <Plane
                args={[ROAD_WIDTH, 20]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
            >
                <meshStandardMaterial color="#1F2937" />
            </Plane>

            {/* Joueur */}
            <Player position={playerPosition} onShoot={handleShoot} />

            {/* Obstacles */}
            {obstacles.map(obstacle => (
                obstacle.isAlive && (
                    <Box
                        key={obstacle.id}
                        args={[1, 1, 1]}
                        position={[obstacle.x, 0.5, obstacle.z]}
                    >
                        <meshStandardMaterial color="#EF4444" />
                    </Box>
                )
            ))}

            {/* Balles */}
            {bullets.map(bullet => (
                <Bullet
                    key={bullet.id}
                    position={bullet.position}
                    onHit={() => {
                        setBullets(prev => prev.filter(b => b.id !== bullet.id));
                    }}
                />
            ))}
        </>
    );
};

const CrossyShooter = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleScoreChange = (points: number) => {
        setScore(prev => prev + points);
    };

    const handleGameOver = () => {
        setGameOver(true);
    };

    const handleRestart = () => {
        setScore(0);
        setGameOver(false);
    };

    return (
        <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden relative">
            <div className="absolute top-4 right-4 text-white/80 text-sm z-10">
                Score: {score}
            </div>
            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="text-red-500 text-4xl font-bold bg-black/80 px-8 py-4 rounded-lg mb-4">
                        Game Over!
                    </div>
                    <button
                        onClick={handleRestart}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Rejouer
                    </button>
                </div>
            )}
            <Canvas camera={{ position: [0, 10, 15], fov: 60 }}>
                <Game onScoreChange={handleScoreChange} onGameOver={handleGameOver} />
            </Canvas>
            <div className="absolute bottom-4 left-4 text-white/80 text-sm z-10">
                Flèches gauche/droite pour bouger, Espace pour tirer
            </div>
        </div>
    );
};

export default CrossyShooter; 