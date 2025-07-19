import React, { useState } from 'react';
import { Save, X, Plus, Trash2, Clock, BookOpen } from 'lucide-react';
import { GameSettings, Question } from '../types/game';

interface SettingsPageProps {
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
  onCancel: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSave, onCancel }) => {
  const [totalTime, setTotalTime] = useState(settings.totalTime);
  const [customQuestions, setCustomQuestions] = useState<Question[]>(settings.customQuestions);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    letter: '',
    clue: '',
    answer: '',
    category: 'Personalizada'
  });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleAddQuestion = () => {
    if (newQuestion.letter && newQuestion.clue && newQuestion.answer) {
      const question: Question = {
        letter: newQuestion.letter.toUpperCase(),
        clue: newQuestion.clue,
        answer: newQuestion.answer.toUpperCase(),
        category: newQuestion.category || 'Personalizada'
      };

      // Reemplazar si ya existe una pregunta para esa letra
      const updatedQuestions = customQuestions.filter(q => q.letter !== question.letter);
      setCustomQuestions([...updatedQuestions, question]);
      
      setNewQuestion({
        letter: '',
        clue: '',
        answer: '',
        category: 'Personalizada'
      });
    }
  };

  const handleRemoveQuestion = (letter: string) => {
    setCustomQuestions(customQuestions.filter(q => q.letter !== letter));
  };

  const handleSave = () => {
    onSave({
      totalTime,
      customQuestions
    });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Configuración</h1>
            <button
              onClick={onCancel}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuración de tiempo */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Tiempo de juego
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Tiempo total (minutos)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={totalTime}
                    onChange={(e) => setTotalTime(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="text-white/70 text-sm">
                  <p>• Tiempo recomendado: 5-10 minutos</p>
                  <p>• Mínimo: 1 minuto</p>
                  <p>• Máximo: 60 minutos</p>
                </div>
              </div>
            </div>

            {/* Agregar nueva pregunta */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Agregar pregunta
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Letra
                  </label>
                  <select
                    value={newQuestion.letter}
                    onChange={(e) => setNewQuestion({...newQuestion, letter: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar letra</option>
                    {alphabet.map(letter => (
                      <option key={letter} value={letter} className="bg-gray-800">
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Pista/Definición
                  </label>
                  <textarea
                    value={newQuestion.clue}
                    onChange={(e) => setNewQuestion({...newQuestion, clue: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Fruto del manzano"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Respuesta
                  </label>
                  <input
                    type="text"
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({...newQuestion, answer: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: MANZANA"
                  />
                </div>
                <button
                  onClick={handleAddQuestion}
                  disabled={!newQuestion.letter || !newQuestion.clue || !newQuestion.answer}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Agregar pregunta
                </button>
              </div>
            </div>
          </div>

          {/* Lista de preguntas personalizadas */}
          {customQuestions.length > 0 && (
            <div className="mt-8 bg-white/10 rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Preguntas personalizadas ({customQuestions.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customQuestions.sort((a, b) => a.letter.localeCompare(b.letter)).map((question) => (
                  <div key={question.letter} className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="flex items-start justify-between mb-2">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                        {question.letter}
                      </span>
                      <button
                        onClick={() => handleRemoveQuestion(question.letter)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-white/70 text-sm mb-2">{question.clue}</p>
                    <p className="text-white font-semibold">{question.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onCancel}
              className="flex-1 bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;