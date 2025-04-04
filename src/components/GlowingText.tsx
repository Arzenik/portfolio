'use client';

interface GlowingTextProps {
    text: string;
    className?: string;
}

const GlowingText = ({ text, className = '' }: GlowingTextProps) => {
    return (
        <div className={`glowing-text-container ${className}`}>
            <div className="glowing-text">{text}</div>
            <style jsx>{`
                .glowing-text-container {
                    position: relative;
                    width: 100%;
                    height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .glowing-text {
                    font-size: 180px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.95);
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                    letter-spacing: 15px;
                    animation: glow 4s ease-in-out infinite;
                }

                @keyframes glow {
                    0%, 100% {
                        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                    }
                    50% {
                        text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
                    }
                }
            `}</style>
        </div>
    );
};

export default GlowingText; 