'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const Navbar = () => {
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-white text-xl font-bold">
                        Portfolio
                    </Link>

                    {/* Navigation desktop */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                                À propos
                            </Link>
                            <Link href="#projects" className="text-gray-300 hover:text-white transition-colors">
                                Projets
                            </Link>
                            <Link href="#skills" className="text-gray-300 hover:text-white transition-colors">
                                Compétences
                            </Link>
                            <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Bouton menu mobile */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Menu</span>
                        <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                            <span className={`block w-full h-0.5 bg-white transform transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-full h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-full h-0.5 bg-white transform transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Menu mobile */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-2`}>
                    <div className="flex flex-col space-y-2">
                        <Link href="#about" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                            À propos
                        </Link>
                        <Link href="#projects" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                            Projets
                        </Link>
                        <Link href="#skills" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                            Compétences
                        </Link>
                        <Link href="#contact" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 