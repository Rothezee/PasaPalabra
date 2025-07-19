import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import HomePage from './components/HomePage';
import GameRoom from './components/GameRoom';
import SettingsPage from './components/SettingsPage';
import { GameState, GameSettings } from './types/game';
import { getQuestions } from './data/questions';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'settings' | 'game'>('home');
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    totalTime: 5, // 5 minutos por defecto
    customQuestions: []
  });
  const [gameState, setGameState] = useState<GameState>({
    currentLetter: 'A',
    completedLetters: {},
    score: 0,
    timeLeft: 0,
    gameStarted: false,
    gameFinished: false,
    currentRound: 1
  });
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const startGame = () => {
    const totalTimeInSeconds = gameSettings.totalTime * 60;
    const gameQuestions = getAllQuestions();
    setSelectedQuestions(gameQuestions);
    setGameState({
      currentLetter: 'A',
      completedLetters: {},
      score: 0,
      timeLeft: totalTimeInSeconds,
      gameStarted: true,
      gameFinished: false,
      currentRound: 1
    });
    setCurrentScreen('game');
  };

  const goToSettings = () => {
    setCurrentScreen('settings');
  };

  const goHome = () => {
    setCurrentScreen('home');
    setSelectedQuestions([]);
    setGameState({
      currentLetter: 'A',
      completedLetters: {},
      score: 0,
      timeLeft: 0,
      gameStarted: false,
      gameFinished: false,
      currentRound: 1
    });
  };

  const saveSettings = (settings: GameSettings) => {
    setGameSettings(settings);
    setCurrentScreen('home');
  };

  // Combinar preguntas por defecto con preguntas personalizadas
  const getAllQuestions = () => {
    const defaultQuestions = getQuestions();
    const customQuestions = gameSettings.customQuestions;
    
    // Crear un mapa de arrays de preguntas por letra
    const questionMap = new Map<string, Question[]>();
    
    // Inicializar arrays para cada letra
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
      questionMap.set(letter, []);
    });
    
    // Agregar todas las preguntas por defecto
    defaultQuestions.forEach(q => {
      const existing = questionMap.get(q.letter) || [];
      questionMap.set(q.letter, [...existing, q]);
    });
    
    // Agregar preguntas personalizadas
    customQuestions.forEach(q => {
      const existing = questionMap.get(q.letter) || [];
      questionMap.set(q.letter, [...existing, q]);
    });
    
    // Seleccionar una pregunta aleatoria por letra
    const selectedQuestions: Question[] = [];
    questionMap.forEach((questions, letter) => {
      if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        selectedQuestions.push(questions[randomIndex]);
      }
    });
    
    return selectedQuestions.sort((a, b) => a.letter.localeCompare(b.letter));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {currentScreen === 'home' && (
        <HomePage 
          onStartGame={startGame}
          onGoToSettings={goToSettings}
          gameSettings={gameSettings}
        />
      )}
      
      {currentScreen === 'settings' && (
        <SettingsPage 
          settings={gameSettings}
          onSave={saveSettings}
          onCancel={goHome}
        />
      )}
      
      {currentScreen === 'game' && (
        <GameRoom 
          gameState={gameState}
          setGameState={setGameState}
          onEndGame={goHome}
          questions={selectedQuestions}
          totalGameTime={gameSettings.totalTime * 60}
        />
      )}
    </div>
  );
}

export default App;