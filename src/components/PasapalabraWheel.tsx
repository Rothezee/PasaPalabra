import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface PasapalabraWheelProps {
  currentLetter: string;
  completedLetters: Record<string, 'correct' | 'incorrect' | 'passed'>;
}

const PasapalabraWheel: React.FC<PasapalabraWheelProps> = ({ currentLetter, completedLetters }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const radius = 140;
  const centerX = 160;
  const centerY = 160;

  const getLetterPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const getLetterStatus = (letter: string) => {
    if (letter === currentLetter) return 'current';
    if (completedLetters[letter] === 'correct') return 'correct';
    if (completedLetters[letter] === 'incorrect') return 'incorrect';
    if (completedLetters[letter] === 'passed') return 'passed';
    return 'pending';
  };

  const getLetterColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-yellow-400 text-black';
      case 'correct': return 'bg-green-500 text-white';
      case 'incorrect': return 'bg-red-500 text-white';
      case 'passed': return 'bg-gray-500 text-white';
      default: return 'bg-white/20 text-white';
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-80 h-80">
        <svg width="320" height="320" className="absolute inset-0">
          {/* Outer circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 25}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          {/* Inner circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius - 25}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
        </svg>
        
        {alphabet.map((letter, index) => {
          const position = getLetterPosition(index, alphabet.length);
          const status = getLetterStatus(letter);
          const colorClass = getLetterColor(status);
          
          return (
            <div
              key={letter}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${colorClass} ${
                status === 'current' ? 'scale-125 shadow-lg' : ''
              }`}
              style={{
                left: position.x,
                top: position.y,
              }}
            >
              {letter}
              {status === 'current' && (
                <div className="absolute -top-1 -right-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
              )}
              {status === 'correct' && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                </div>
              )}
              {status === 'incorrect' && (
                <div className="absolute -top-1 -right-1">
                  <XCircle className="w-4 h-4 text-red-300" />
                </div>
              )}
            </div>
          );
        })}
        
        {/* Center logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">P</span>
        </div>
      </div>
    </div>
  );
};

export default PasapalabraWheel;