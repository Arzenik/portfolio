'use client';

import { useState } from 'react';
import Link from 'next/link';
import MazeGame from '@/components/MazeGame';
import CrossyShooter from '@/components/CrossyShooter';

export default function GamesPage() {
    const [selectedGame, setSelectedGame] = useState<'maze' | 'shooter' | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-12 text-center">
                    Mes Jeux
                </h1>

                {!selectedGame ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Carte Labyrinthe 3D */}
                        <div className="bg-gray-800/50 p-6 rounded-xl shadow-xl backdrop-blur-sm border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">Labyrinthe 3D</h2>
                            <p className="text-gray-300 mb-6">
                                Explorez un labyrinthe en 3D et trouvez la sortie. Utilisez les flèches du clavier pour vous déplacer.
                            </p>
                            <button
                                onClick={() => setSelectedGame('maze')}
                                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Jouer
                            </button>
                        </div>

                        {/* Carte Crossy Shooter */}
                        <div className="bg-gray-800/50 p-6 rounded-xl shadow-xl backdrop-blur-sm border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">Crossy Shooter</h2>
                            <p className="text-gray-300 mb-6">
                                Évitez les obstacles et tirez pour marquer des points. Utilisez les flèches pour vous déplacer et la barre d'espace pour tirer.
                            </p>
                            <button
                                onClick={() => setSelectedGame('shooter')}
                                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Jouer
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={() => setSelectedGame(null)}
                            className="mb-8 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            ← Retour aux jeux
                        </button>

                        <div className="bg-gray-800/50 p-6 rounded-xl shadow-xl">
                            {selectedGame === 'maze' && <MazeGame />}
                            {selectedGame === 'shooter' && <CrossyShooter />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 