import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Heart } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Oi! Eu sou a Lu, a IA que conhece todos os segredos sobre Ludmylla! 💕 Pergunte-me qualquer coisa sobre ela!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ludmyllaSecrets = {
    'cor favorita': 'A cor favorita da Ludmylla é rosa! 💗 Ela ama tudo que é romântico e delicado.',
    'comida favorita': 'Ela é apaixonada por chocolate! 🍫 E também adora pizza nos finais de semana.',
    'filme favorito': 'Ludmylla ama filmes românticos! 🎬 Especialmente aqueles que fazem chorar de emoção.',
    'música favorita': 'Ela adora música MPB! 🎵 Sempre cantando.',
    'hobby': 'Ludmylla adora ler livros românticos e assistir séries! 📚✨',
    'sonho': 'O maior sonho dela é viajar pelo mundo com quem ama! ✈️💕',
    'medo': 'Ela tem um medinho bobo de baratas! 🪳 Mas é corajosa em tudo mais.',
    'qualidade': 'Ludmylla tem o coração mais generoso do mundo! ❤️ Sempre ajudando todos.',
    'defeito': 'Ela é perfeccionista demais às vezes! 😅 Mas isso a torna ainda mais especial.',
    'segredo': 'Ela guarda todas as mensagens carinhosas que recebe! 💌 É muito sentimental.',
    'personalidade': 'Ludmylla é doce, carinhosa, inteligente e tem um sorriso que ilumina qualquer dia! ☀️',
    'fria': 'Ludmylla é Fria, mais por dentro é carinhosa, e meiga com aquele sorriso maravilhoso! ☀️',
    'chata': 'Ludmylla não é chata ela tem seu jeitnho unico de ser ela mesma. 😉',
    'feia': 'Na verdade ela é maravilhosa causa inveja por ser perfeita como a estrela com cores unicas e cheio de luz como o espaço, bem ela é uma rainha no seu habitat natural 👑',
    'tristeza': 'ela diz que a vida adulta é complicada, as vezes ela se senti para baixo mais deve lembra que tem o kayky sempre do seu lado cuidando e apoiando ela em todos os momentos! 😉',
    'triste': 'ela diz que a vida adulta é complicada, as vezes ela se senti para baixo mais deve lembra que tem o kayky sempre do seu lado cuidando e apoiando ela em todos os momentos! 😉',
    'estilo': 'Ela tem um estilo único e sempre está linda! 👗✨ Ama se arrumar para ocasiões especiais.'
  };

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Respostas específicas sobre Ludmylla
    for (const [key, value] of Object.entries(ludmyllaSecrets)) {
      if (lowerInput.includes(key)) {
        return value;
      }
    }
    
    // Respostas gerais
    if (lowerInput.includes('oi') || lowerInput.includes('olá') || lowerInput.includes('hello')) {
      return 'Oi! 😊 Que bom te ver aqui! Quer saber algum segredinho sobre a Ludmylla?';
    }
    
    if (lowerInput.includes('obrigad')) {
      return 'De nada! 💕 Fico feliz em compartilhar sobre a Ludmylla! Ela é realmente especial!';
    }
    
    if (lowerInput.includes('linda') || lowerInput.includes('bonita')) {
      return 'Sim! Ludmylla é a pessoa mais linda do mundo! 😍 Por dentro e por fora!';
    }
    
    if (lowerInput.includes('amor') || lowerInput.includes('namorad')) {
      return 'Ludmylla merece todo o amor do mundo! 💖 Ela tem um coração gigante e ama de verdade!';
    }
    
    // Resposta padrão
    const responses = [
      'Hmm, interessante! 🤔 Quer saber mais sobre as qualidades da Ludmylla?',
      'Que pergunta legal! 😊 A Ludmylla é realmente incrível em tudo!',
      'Posso te contar que Ludmylla é uma pessoa única! ✨ Pergunte sobre hobbies, sonhos ou personalidade!',
      'Ludmylla é especial demais! 💕 Quer saber sobre os gostos dela?'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        text: getResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-romantic-pink to-romantic-purple rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-bounce-slow ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-romantic-pink to-romantic-purple p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Lu - IA da Ludmylla</h3>
                <p className="text-sm opacity-90">Online agora 💕</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white hover:bg-opacity-20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-pink-50 to-purple-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white shadow-md text-gray-800'
                      : 'bg-gradient-to-r from-romantic-pink to-romantic-purple text-white'
                  } animate-fade-in`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-white text-opacity-70'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte sobre a Ludmylla..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-romantic-pink text-gray-800"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 bg-gradient-to-r from-romantic-pink to-romantic-purple rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;