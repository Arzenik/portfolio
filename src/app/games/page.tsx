'use client';

import { useState } from 'react';
import CrossyShooter from '@/components/CrossyShooter';
import MazeGame from '@/components/MazeGame';

export default function GamesPage() {
    const [selectedGame, setSelectedGame] = useState<'crossy' | 'maze' | null>(null);
    const [score, setScore] = useState(0);

    const handleGameOver = (finalScore: number) => {
        setScore(finalScore);
        setSelectedGame(null);
    };

    return (
        <main className="min-h-screen bg-black text-white p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Mes Jeux</h1>

                {!selectedGame ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <button
                            onClick={() => setSelectedGame('crossy')}
                            className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <h2 className="text-2xl font-bold mb-4">Crossy Shooter</h2>
                            <p className="text-gray-300">Un jeu de tir où vous devez éviter les obstacles et tirer sur les cibles.</p>
                        </button>
                        <button
                            onClick={() => setSelectedGame('maze')}
                            className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <h2 className="text-2xl font-bold mb-4">Maze Game</h2>
                            <p className="text-gray-300">Trouvez la sortie dans ce labyrinthe généré aléatoirement.</p>
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setSelectedGame(null)}
                            className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Quitter
                        </button>
                        {selectedGame === 'crossy' && (
                            <CrossyShooter onGameOver={handleGameOver} />
                        )}
                        {selectedGame === 'maze' && (
                            <MazeGame onGameOver={handleGameOver} />
                        )}
                    </div>
                )}

                {score > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-xl">Score final : {score}</p>
                    </div>
                )}
            </div>
        </main>
    );
} 