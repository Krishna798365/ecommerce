import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! 🌸 How can I help you today with our clothing collection?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMessage = { role: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Something went wrong. Please try again.' }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 bg-pink-200 text-pink-700 p-3 rounded-full shadow-lg hover:bg-pink-300 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Popup Chatbox */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 sm:w-96 bg-white border border-pink-100 shadow-lg rounded-xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-pink-100 text-pink-700 rounded-t-xl">
            <span className="font-semibold">StyleBot 🌷</span>
            <button onClick={toggleChat}><X size={20} /></button>
          </div>

          {/* Messages */}
          <div className="p-3 h-64 overflow-y-auto space-y-3 text-sm bg-pink-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Bot Avatar */}
                {msg.role === 'bot' && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-200 text-pink-700">
                    <Bot size={18} />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`px-3 py-2 rounded-2xl max-w-[70%] break-words shadow-sm prose prose-sm ${
                    msg.role === 'bot'
                      ? 'bg-pink-100 text-pink-700 rounded-bl-none'
                      : 'bg-rose-100 text-gray-700 rounded-br-none'
                  }`}
                >
                  {msg.role === 'bot' ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>

                {/* User Avatar */}
                {msg.role === 'user' && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-200 text-gray-700">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-200 text-pink-700">
                  <Bot size={18} />
                </div>
                <div className="px-3 py-2 rounded-2xl bg-pink-100 text-pink-600 italic text-sm">
                  StyleBot is typing...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex p-2 border-t border-pink-100 bg-white">
            <input
              className="border border-pink-200 p-2 w-full text-sm rounded-l focus:outline-none focus:ring-1 focus:ring-pink-200 bg-pink-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me about outfits..."
            />
            <button
              onClick={sendMessage}
              className="bg-pink-200 text-pink-700 px-4 rounded-r hover:bg-pink-300 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
