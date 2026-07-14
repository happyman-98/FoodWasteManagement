// src/Pages/Inbox.jsx
import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function Inbox() {
  const [chats, setChats] = useState([
    {
      id: 1,
      user: "Rahul Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      lastMessage: "Is the Drill Kit still available for pickup?",
      unread: true,
      messages: [
        { sender: 'them', text: "Hi! I saw your listing for the Drill Kit." },
        { sender: 'them', text: "Is the Drill Kit still available for pickup?" }
      ]
    },
    {
      id: 2,
      user: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      lastMessage: "Thanks so much for the textbook!",
      unread: false,
      messages: [
        { sender: 'me', text: "Hi Priya, the chemistry book is yours!" },
        { sender: 'them', text: "Thanks so much for the textbook!" }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState(1);
  const [typeMessage, setTypeMessage] = useState('');

  const activeChat = chats.find(c => c.id === activeChatId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typeMessage.trim()) return;

    setChats(chats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessage: typeMessage,
          messages: [...chat.messages, { sender: 'me', text: typeMessage }]
        };
      }
      return chat;
    }));
    setTypeMessage('');
  };

  return (
    <div className="h-[calc(100vh-120px)] flex bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Messages Left Sidebar */}
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Messages</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => {
                setActiveChatId(chat.id);
                chat.unread = false;
              }}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 border-b border-gray-50 transition-colors ${
                activeChatId === chat.id ? 'bg-green-50/50' : ''
              }`}
            >
              <img src={chat.avatar} alt={chat.user} className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-sm text-gray-900">{chat.user}</h4>
                  {chat.unread && <span className="w-2 h-2 bg-green-600 rounded-full"></span>}
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Conversation Canvas */}
      <div className="flex-1 flex flex-col bg-gray-50/30">
        {activeChat ? (
          <>
            {/* Active Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
              <img src={activeChat.avatar} alt={activeChat.user} className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100" />
              <h4 className="font-bold text-gray-900">{activeChat.user}</h4>
            </div>

            {/* Conversation Window */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {activeChat.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.sender === 'me' 
                      ? 'bg-[#174624] text-white rounded-tr-none' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Form Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={typeMessage}
                onChange={(e) => setTypeMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900"
              />
              <button type="submit" className="p-2.5 bg-[#174624] hover:bg-green-800 text-white rounded-xl transition-colors">
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">Select a conversation to start messaging.</div>
        )}
      </div>
    </div>
  );
}