import React, { useState, useEffect } from 'react';
import { Crown, Trophy, CheckCircle, XCircle, Clock, ArrowRight, Home, RotateCcw } from 'lucide-react';
import { GameState, Question } from '../types/game';
import PasapalabraWheel from './PasapalabraWheel';

interface GameRoomProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onEndGame: () => void;
  questions: Question[];
  totalGameTime: number;
}

const GameRoom: React.FC<GameRoomProps> = ({ 
  gameState, 
  setGameState, 
  onEndGame, 
  questions,
  totalGameTime 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState<'correct' | 'incorrect' | 'passed' | null>(null);

  // Timer effect
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameFinished && gameState.timeLeft > 0) {
      const timer = setInterval(() => {
        setGameState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            return { ...prev, timeLeft: 0, gameFinished: true };
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.gameStarted, gameState.gameFinished, gameState.timeLeft, setGameState]);

  // Get current question based on current letter
  useEffect(() => {
    const question = questions.find(q => q.letter === gameState.currentLetter);
    setCurrentQuestion(question || null);
    setShowResult(false);
    setResultType(null);
  }, [gameState.currentLetter, questions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;
    
    const result = answer === 'correct' ? 'correct' : 'incorrect';
    
    setResultType(result);
    setShowResult(true);
    
    setGameState(prev => ({
      ...prev,
      completedLetters: {
        ...prev.completedLetters,
        [gameState.currentLetter]: result
      },
      score: result === 'correct' ? prev.score + 1 : prev.score
    }));

    // Auto advance after 2 seconds
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const handlePass = () => {
    setResultType('passed');
    setShowResult(true);
    
    setGameState(prev => ({
      ...prev,
      completedLetters: {
        ...prev.completedLetters,
        [gameState.currentLetter]: 'passed'
      }
    }));

    // Auto advance after 1 second
    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  const nextQuestion = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const currentIndex = alphabet.indexOf(gameState.currentLetter);
    
    // Find next unanswered letter
    let nextIndex = (currentIndex + 1) % alphabet.length;
    let attempts = 0;
    
    while (attempts < 26) {
      const nextLetter = alphabet[nextIndex];
      if (!gameState.completedLetters[nextLetter] || gameState.completedLetters[nextLetter] === 'passed') {
        setGameState(prev => ({
          ...prev,
          currentLetter: nextLetter
        }));
        return;
      }
      nextIndex = (nextIndex + 1) % alphabet.length;
      attempts++;
    }
    
    // If all letters are completed, finish the game
    setGameState(prev => ({ ...prev, gameFinished: true }));
  };

  const restartGame = () => {
    setGameState({
      currentLetter: 'A',
      completedLetters: {},
      score: 0,
      timeLeft: totalGameTime,
      gameStarted: true,
      gameFinished: false,
      currentRound: gameState.currentRound + 1
    });
  };

  const getCompletedCount = () => {
    return Object.values(gameState.completedLetters).filter(status => status === 'correct').length;
  };

  const getTotalQuestions = () => {
    return questions.length;
  };

  if (gameState.gameFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">¡Juego Terminado!</h1>
          
          <div className="bg-white/10 rounded-2xl p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between text-white">
                <span>Puntuación:</span>
                <span className="font-bold">{gameState.score} / {getTotalQuestions()}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Porcentaje:</span>
                <span className="font-bold">{Math.round((gameState.score / getTotalQuestions()) * 100)}%</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Tiempo usado:</span>
                <span className="font-bold">{formatTime(totalGameTime - gameState.timeLeft)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={restartGame}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              Jugar de nuevo
            </button>
            <button
              onClick={onEndGame}
              className="w-full bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h1 className="text-2xl font-bold text-white">Pasapalabra</h1>
              </div>
              <div className="text-white/70">
                Ronda: <span className="font-bold">{gameState.currentRound}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-500/20 rounded-xl px-4 py-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-bold">{formatTime(gameState.timeLeft)}</span>
              </div>
              <button
                onClick={onEndGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">El Rosco</h2>
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <span className="text-white font-bold">Letra: {gameState.currentLetter}</span>
                </div>
              </div>

              <div className="mb-6">
                <PasapalabraWheel
                  currentLetter={gameState.currentLetter}
                  completedLetters={gameState.completedLetters}
                />
              </div>

              {currentQuestion && (
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {currentQuestion.category}
                    </span>
                    <span className="text-white/70">Letra: {currentQuestion.letter}</span>
                  </div>
                  <p className="text-white text-lg mb-4">{currentQuestion.clue}</p>
                  
                  {!showResult && (
                    <div className="space-y-4">
                      <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
                        <p className="text-blue-300 text-sm mb-2">💡 Respuesta correcta:</p>
                        <p className="text-white font-bold text-lg">{currentQuestion.answer}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleAnswer('correct')}
                          className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Correcto
                        </button>
                        <button
                          onClick={() => handleAnswer('incorrect')}
                          className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-5 h-5" />
                          Incorrecto
                        </button>
                      </div>
                      <button
                        onClick={handlePass}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Pasapalabra
                      </button>
                    </div>
                  )}

                  {showResult && (
                    <div className={`rounded-xl p-4 text-center ${
                      resultType === 'correct' ? 'bg-green-500/20 border border-green-500/30' :
                      resultType === 'incorrect' ? 'bg-red-500/20 border border-red-500/30' :
                      'bg-yellow-500/20 border border-yellow-500/30'
                    }`}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {resultType === 'correct' && <CheckCircle className="w-6 h-6 text-green-400" />}
                        {resultType === 'incorrect' && <XCircle className="w-6 h-6 text-red-400" />}
                        {resultType === 'passed' && <ArrowRight className="w-6 h-6 text-yellow-400" />}
                        <span className={`font-bold ${
                          resultType === 'correct' ? 'text-green-400' :
                          resultType === 'incorrect' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {resultType === 'correct' ? '¡Correcto!' :
                           resultType === 'incorrect' ? 'Incorrecto' :
                           'Pasapalabra'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Puntuación
              </h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{gameState.score}</div>
                  <div className="text-white/70">de {getTotalQuestions()}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>Progreso</span>
                    <span>{Math.round((getCompletedCount() / getTotalQuestions()) * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(getCompletedCount() / getTotalQuestions()) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Estadísticas</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Correctas:</span>
                  <span className="text-green-400 font-semibold">
                    {Object.values(gameState.completedLetters).filter(s => s === 'correct').length}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Incorrectas:</span>
                  <span className="text-red-400 font-semibold">
                    {Object.values(gameState.completedLetters).filter(s => s === 'incorrect').length}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Pasadas:</span>
                  <span className="text-yellow-400 font-semibold">
                    {Object.values(gameState.completedLetters).filter(s => s === 'passed').length}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Restantes:</span>
                  <span className="text-white font-semibold">
                    {getTotalQuestions() - Object.keys(gameState.completedLetters).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;