import React from 'react';
import { Crown, Play, Settings, Clock, BookOpen } from 'lucide-react';
import { GameSettings } from '../types/game';

interface HomePageProps {
  onStartGame: () => void;
  onGoToSettings: () => void;
  gameSettings: GameSettings;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame, onGoToSettings, gameSettings }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Pasapalabra</h1>
          <p className="text-white/70">El famoso juego del rosco</p>
        </div>

        {/* Configuración actual */}
        <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/20">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configuración actual
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between text-white/70">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Tiempo total:
              </span>
              <span className="text-white font-medium">{gameSettings.totalTime} min</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Palabras personalizadas:
              </span>
              <span className="text-white font-medium">{gameSettings.customQuestions.length}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-5 h-5" />
            Jugar
          </button>
          
          <button
            onClick={onGoToSettings}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
          >
            <Settings className="w-5 h-5" />
            Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;