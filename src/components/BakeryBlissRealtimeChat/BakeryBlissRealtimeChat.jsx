import { useState, useEffect, useRef } from 'react';
import { Send, Smile, Search, Paperclip } from 'lucide-react';

export default function BakeryBlissRealtimeChat() {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  
  const emojis = ["😊", "👍", "🎂", "🧁", "🍰", "🥐", "🥖", "🍞", "🥨", "🍩", "❤️", "😄", "🙏", "🤔"];
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Customer Support',
      role: 'Support Team',
      avatar: '🥐',
      online: true,
      lastMessage: 'How can I help with your cake order?',
      time: '10:30 AM',
      unread: 2,
      messages: [
        { id: 1, sender: 'Customer Support', text: 'Hello! How can I help you with your order today?', time: '10:25 AM' },
        { id: 2, sender: 'Customer Support', text: 'We received your request for the custom cake.', time: '10:30 AM' },
      ]
    },
    {
      id: 2,
      name: 'Ingredient Supplier',
      role: 'Flour & Sugar Co.',
      avatar: '🧁',
      online: false,
      lastMessage: 'Your flour order has been shipped',
      time: '9:15 AM',
      unread: 0,
      messages: [
        { id: 1, sender: 'Ingredient Supplier', text: 'Good morning! Just confirming your order #45781.', time: '9:10 AM' },
        { id: 2, sender: 'Ingredient Supplier', text: 'Your flour order has been shipped and will arrive tomorrow.', time: '9:15 AM' },
        { id: 3, sender: 'You', text: 'Great, thank you for the update!', time: '9:20 AM' },
      ]
    },
    {
      id: 3,
      name: 'Bakery Manager',
      role: 'Main Bakery',
      avatar: '🍰',
      online: true,
      lastMessage: 'Please check the updated schedule',
      time: '4:45 PM',
      unread: 1,
      messages: [
        { id: 1, sender: 'Bakery Manager', text: 'Hi there! I\'ve updated the baking schedule for next week.', time: '4:40 PM' },
        { id: 2, sender: 'Bakery Manager', text: 'Please check the updated schedule when you have a moment.', time: '4:45 PM' },
      ]
    },
    {
      id: 4,
      name: 'Marketing Team',
      role: 'Brand Department',
      avatar: '🥨',
      online: false,
      lastMessage: 'New promotional materials ready',
      time: '2:30 PM',
      unread: 0,
      messages: [
        { id: 1, sender: 'Marketing Team', text: 'The summer promotion graphics are ready for your review.', time: '2:25 PM' },
        { id: 2, sender: 'Marketing Team', text: 'New promotional materials ready for the seasonal menu.', time: '2:30 PM' },
        { id: 3, sender: 'You', text: 'I\'ll take a look at them this afternoon.', time: '2:45 PM' },
      ]
    },
    {
      id: 5,
      name: 'Delivery Service',
      role: 'Logistics',
      avatar: '🍞',
      online: true,
      lastMessage: 'Your delivery is scheduled for tomorrow',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, sender: 'Delivery Service', text: 'Hello, we\'re confirming your delivery schedule.', time: 'Yesterday' },
        { id: 2, sender: 'Delivery Service', text: 'Your delivery is scheduled for tomorrow between 9-11 AM.', time: 'Yesterday' },
        { id: 3, sender: 'You', text: 'Perfect! I\'ll make sure someone is available to receive it.', time: 'Yesterday' },
      ]
    },
  ]);

  // Scroll to bottom of messages when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, contacts]);

  // Simulate receiving a new message every few seconds for active chat
  useEffect(() => {
    if (!activeChat) return;
    
    const intervalId = setInterval(() => {
      // 20% chance of receiving a new message
      if (Math.random() < 0.2) {
        const responses = [
          "Just checking if you need anything else? 😊",
          "Let me know if you have any questions! 👍",
          "I've updated the information in our system. ✅",
          "Thanks for your patience. 🙏",
          "The team is working on your request right now. 🧁"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const updatedContacts = contacts.map(contact => {
          if (contact.id === activeChat) {
            const newMessage = {
              id: contact.messages.length + 1,
              sender: contact.name,
              text: randomResponse,
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            return {
              ...contact,
              messages: [...contact.messages, newMessage],
              lastMessage: randomResponse,
              time: newMessage.time
            };
          }
          return contact;
        });
        
        setContacts(updatedContacts);
      }
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, [activeChat, contacts]);

  const sendMessage = () => {
    if (messageInput.trim() === '' || !activeChat) return;
    
    // Add a random emoji to outgoing messages about 40% of the time
    let messageText = messageInput;
    if (Math.random() < 0.4) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      messageText = `${messageText} ${randomEmoji}`;
    }
    
    const updatedContacts = contacts.map(contact => {
      if (contact.id === activeChat) {
        const newMessage = {
          id: contact.messages.length + 1,
          sender: 'You',
          text: messageText,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        return {
          ...contact,
          messages: [...contact.messages, newMessage],
          lastMessage: messageText,
          time: newMessage.time
        };
      }
      return contact;
    });
    
    setContacts(updatedContacts);
    setMessageInput('');
    setShowEmojiPicker(false);
  };

  const addEmoji = (emoji) => {
    setMessageInput(messageInput + emoji);
    setShowEmojiPicker(false);
  };

  const readMessages = (contactId) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId ? {...contact, unread: 0} : contact
    ));
  };

  const selectChat = (contactId) => {
    setActiveChat(contactId);
    readMessages(contactId);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentChat = contacts.find(contact => contact.id === activeChat);

  return (
    <div className="h-screen bg-amber-50 flex overflow-hidden">
      {/* Message List */}
      <div className="w-72 border-r border-amber-100 bg-white overflow-hidden flex flex-col">
        <div className="p-4 border-b border-amber-100">
          <div className="font-bold text-lg text-amber-800 mb-4">Messages</div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-amber-50 border border-amber-100 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-amber-400" />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id}
              className={`border-b border-amber-50 cursor-pointer transition-all hover:bg-amber-50 ${
                contact.id === activeChat ? 'bg-amber-100' : ''
              }`}
              onClick={() => selectChat(contact.id)}
            >
              <div className="flex items-center gap-3 p-3">
                <div className="relative">
                  <div className="w-10 h-10 flex items-center justify-center bg-amber-200 rounded-full text-lg shadow-sm">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-900 font-medium text-sm truncate">{contact.name}</span>
                    <span className="text-amber-700 text-xs whitespace-nowrap">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-xs truncate">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <div className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {!activeChat ? (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-amber-50 to-amber-100/50">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-amber-800 mb-2">Welcome to Bakery Chat</h3>
            <p className="text-amber-700 max-w-xs text-center">
              Select a conversation from the list to start chatting
            </p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-amber-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 flex items-center justify-center bg-amber-200 rounded-full text-lg shadow-sm">
                    {currentChat?.avatar}
                  </div>
                  {currentChat?.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-amber-900">{currentChat?.name}</div>
                  <div className="text-xs text-amber-700">
                    {currentChat?.online ? 'Online' : 'Offline'} • {currentChat?.role}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-amber-50/30">
              <div className="space-y-4">
                {/* Date Separator */}
                <div className="flex items-center justify-center">
                  <div className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">
                    Today
                  </div>
                </div>
                
                {currentChat?.messages.map((message, index) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender !== 'You' && index > 0 && currentChat.messages[index-1].sender === 'You' && (
                      <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center bg-amber-200 rounded-full text-sm shadow-sm self-end">
                        {currentChat.avatar}
                      </div>
                    )}
                    
                    {message.sender !== 'You' && (index === 0 || currentChat.messages[index-1].sender === 'You') && (
                      <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center bg-amber-200 rounded-full text-sm shadow-sm self-end">
                        {currentChat.avatar}
                      </div>
                    )}
                    
                    <div 
                      className={`max-w-[75%] ${
                        message.sender === 'You' 
                          ? 'bg-amber-500 text-white rounded-t-lg rounded-l-lg' 
                          : 'bg-white text-amber-900 border border-amber-100 rounded-t-lg rounded-r-lg'
                      } px-4 py-2 shadow-sm`}
                    >
                      <div className="text-sm">{message.text}</div>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'You' ? 'text-amber-100' : 'text-amber-500'
                      }`}>
                        {message.time}
                      </div>
                    </div>
                    
                    {message.sender === 'You' && (
                      <div className="w-8 h-8 ml-2 flex-shrink-0 flex items-center justify-center bg-amber-500 text-white rounded-full text-sm shadow-sm self-end">
                        You
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
                
                {/* Typing indicator when applicable */}
                {Math.random() < 0.3 && currentChat?.online && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center bg-amber-200 rounded-full text-sm shadow-sm self-end">
                      {currentChat.avatar}
                    </div>
                    <div className="bg-white text-amber-900 border border-amber-100 rounded-lg px-4 py-2 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-4 bg-white border-t border-amber-100">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button 
                    className="text-amber-400 hover:text-amber-500 p-2 hover:bg-amber-50 rounded-full"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile size={20} />
                  </button>
                  
                  {showEmojiPicker && (
                    <div className="absolute bottom-12 left-0 bg-white p-2 rounded-lg shadow-lg border border-amber-100 grid grid-cols-7 gap-1 z-10">
                      {emojis.map((emoji, index) => (
                        <button 
                          key={index} 
                          className="w-8 h-8 hover:bg-amber-50 rounded flex items-center justify-center text-lg"
                          onClick={() => addEmoji(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button className="text-amber-400 hover:text-amber-500 p-2 hover:bg-amber-50 rounded-full">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button 
                  onClick={sendMessage}
                  className={`p-3 rounded-lg transition-all ${
                    messageInput.trim() === '' 
                      ? 'bg-amber-200 text-amber-400 cursor-not-allowed'
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  }`}
                  disabled={messageInput.trim() === ''}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}