'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

interface GameProps {
    onGameOver: (score: number) => void;
}

const MazeGame = ({ onGameOver }: GameProps) => {
    const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
    const [maze, setMaze] = useState<number[][]>([]);
    const [gameOver, setGameOver] = useState(false);
    const gameLoopRef = useRef<number>(0);

    useEffect(() => {
        const generateMaze = () => {
            const size = 10;
            const newMaze = Array(size).fill(0).map(() => Array(size).fill(1));

            // Créer un chemin aléatoire
            let currentX = 1;
            let currentY = 1;

            while (currentX < size - 1 || currentY < size - 1) {
                newMaze[currentY][currentX] = 0;

                if (Math.random() < 0.5 && currentX < size - 1) {
                    currentX++;
                } else if (currentY < size - 1) {
                    currentY++;
                }
            }

            // Ajouter des murs aléatoires
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (newMaze[i][j] === 1 && Math.random() < 0.3) {
                        newMaze[i][j] = 0;
                    }
                }
            }

            setMaze(newMaze);
        };

        generateMaze();
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
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
            }

            // Vérifier si la nouvelle position est valide
            const gridX = Math.floor(newX);
            const gridY = Math.floor(newY);
            if (gridX >= 0 && gridX < maze.length && gridY >= 0 && gridY < maze.length && maze[gridY][gridX] === 0) {
                setPlayerPosition({ x: newX, y: newY });
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [playerPosition, maze, gameOver]);

    useEffect(() => {
        const gameLoop = () => {
            if (gameOver) return;

            // Vérifier si le joueur a atteint la sortie
            if (playerPosition.x >= maze.length - 1 && playerPosition.y >= maze.length - 1) {
                setGameOver(true);
                onGameOver(100);
            }

            gameLoopRef.current = requestAnimationFrame(gameLoop);
        };

        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [playerPosition, maze, gameOver, onGameOver]);

    return (
        <div className="w-full h-[600px]">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* Joueur */}
                <Box position={[playerPosition.x, playerPosition.y, 0]} args={[0.2, 0.2, 0.2]}>
                    <meshStandardMaterial color="blue" />
                </Box>

                {/* Murs du labyrinthe */}
                {maze.map((row, y) =>
                    row.map((cell, x) =>
                        cell === 1 && (
                            <Box key={`${x}-${y}`} position={[x, y, 0]} args={[0.8, 0.8, 0.8]}>
                                <meshStandardMaterial color="gray" />
                            </Box>
                        )
                    )
                )}
            </Canvas>
        </div>
    );
};

export default MazeGame; 