'use client';

import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

interface GameProps {
    onGameOver: (score: number) => void;
}

const CrossyShooter = ({ onGameOver }: GameProps) => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [bullets, setBullets] = useState<Array<{ x: number; y: number; direction: string }>>([]);
    const [obstacles, setObstacles] = useState<Array<{ x: number; y: number }>>([]);
    const gameLoopRef = useRef<number>(0);

    const handleShoot = () => {
        if (gameOver) return;
        setBullets(prev => [...prev, { x: playerPosition.x, y: playerPosition.y, direction: 'up' }]);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;

            const speed = 0.1;
            let newX = playerPosition.x;
            let newY = playerPosition.y;

            switch (e.key) {
                case 'ArrowUp':
                    newY += speed;
                    break;
                case 'ArrowDown':
                    newY -= speed;
                    break;
                case 'ArrowLeft':
                    newX -= speed;
                    break;
                case 'ArrowRight':
                    newX += speed;
                    break;
                case ' ':
                    handleShoot();
                    break;
            }

            setPlayerPosition({ x: newX, y: newY });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playerPosition, gameOver, handleShoot]);

    useEffect(() => {
        const spawnObstacle = () => {
            if (gameOver) return;
            const x = Math.random() * 2 - 1;
            const y = 1.5;
            setObstacles(prev => [...prev, { x, y }]);
        };

        const gameLoop = () => {
            if (gameOver) return;

            // Mettre à jour les positions des obstacles
            setObstacles(prev =>
                prev.map(obs => ({ ...obs, y: obs.y - 0.01 }))
                    .filter(obs => obs.y > -1.5)
            );

            // Mettre à jour les positions des balles
            setBullets(prev =>
                prev.map(bullet => ({ ...bullet, y: bullet.y + 0.05 }))
                    .filter(bullet => bullet.y < 1.5)
            );

            // Vérifier les collisions
            bullets.forEach(bullet => {
                obstacles.forEach(obstacle => {
                    if (Math.abs(bullet.x - obstacle.x) < 0.1 && Math.abs(bullet.y - obstacle.y) < 0.1) {
                        setScore(prev => prev + 1);
                        setObstacles(prev => prev.filter(obs => obs !== obstacle));
                        setBullets(prev => prev.filter(b => b !== bullet));
                    }
                });
            });

            // Vérifier les collisions avec le joueur
            obstacles.forEach(obstacle => {
                if (Math.abs(playerPosition.x - obstacle.x) < 0.1 && Math.abs(playerPosition.y - obstacle.y) < 0.1) {
                    setGameOver(true);
                    onGameOver(score);
                }
            });

            // Spawner des obstacles aléatoirement
            if (Math.random() < 0.02) {
                spawnObstacle();
            }

            gameLoopRef.current = requestAnimationFrame(gameLoop);
        };

        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [bullets, obstacles, playerPosition, gameOver, score, onGameOver]);

    return (
        <div className="w-full h-[600px]">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* Joueur */}
                <Box position={[playerPosition.x, playerPosition.y, 0]} args={[0.2, 0.2, 0.2]}>
                    <meshStandardMaterial color="blue" />
                </Box>

                {/* Balles */}
                {bullets.map((bullet, index) => (
                    <Box key={index} position={[bullet.x, bullet.y, 0]} args={[0.1, 0.1, 0.1]}>
                        <meshStandardMaterial color="yellow" />
                    </Box>
                ))}

                {/* Obstacles */}
                {obstacles.map((obstacle, index) => (
                    <Box key={index} position={[obstacle.x, obstacle.y, 0]} args={[0.2, 0.2, 0.2]}>
                        <meshStandardMaterial color="red" />
                    </Box>
                ))}
            </Canvas>
        </div>
    );
};

export default CrossyShooter; 