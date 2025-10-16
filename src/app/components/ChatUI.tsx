'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // 데모: 2초 후 랜덤 응답
    setTimeout(() => {
      const botResponses = [
        "흥미로운 질문이네요! 더 자세히 말씀해 주세요.",
        "그 부분에 대해 생각해 보니, 이렇게 할 수 있을 것 같아요.",
        "좋은 아이디어입니다. 추가로 고려할 점은...",
        "죄송하지만, 그 주제에 대한 정보가 부족해요."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
      };

      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="glass-card text-center py-8">
            <p className="text-gray-300">AI 에이전트와 대화해 보세요!</p>
          </div>
        )}
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-bubble ${message.isUser ? 'user-message ml-auto' : 'mr-auto'}`}
          >
            <p>{message.content}</p>
          </div>
        ))}
        {loading && (
          <div className="message-bubble mr-auto flex items-center">
            <div className="loading-indicator mr-2"></div>
            <p>응답 중...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="메시지를 입력하세요..."
          className="input-field flex-1 mr-2"
          disabled={loading}
        />
        <button onClick={handleSend} disabled={!input.trim() || loading} className="glass-button">
          전송
        </button>
      </div>
    </div>
  );
}

// TODO: 실제 AI 백엔드 (예: OpenAI API 또는 n8n 워크플로우)와 통합하여 로컬 데모 대신 실제 응답 구현

