import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your campus assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Listen for navigation events from the campus map
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      const { location, type } = event.detail;
      let message = "";

      if (type === 'directions') {
        message = `I can help you get directions to ${location}. Could you tell me your current location on campus? For example, "I'm at the main gate" or "I'm near the library".`;
      } else if (type === 'info') {
        message = `I'd be happy to provide more information about ${location}. What would you like to know? For example, "What facilities are there?" or "What is this building used for?"`;
      }

      if (message) {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: message,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsOpen(true); // Open the chat when triggered from map
      }
    };

    window.addEventListener('chatbot-navigate', handleNavigation as EventListener);

    return () => {
      window.removeEventListener('chatbot-navigate', handleNavigation as EventListener);
    };
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    try {
      // Call the AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I'm sorry, I'm having trouble processing your request right now.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat API error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your campus assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  if (!isOpen) {
    return (
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-edu-accent to-edu-primary hover:shadow-xl"
        onClick={() => setIsOpen(true)}
        data-testid="button-open-chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 max-h-[70vh] flex flex-col shadow-xl z-50">
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-edu-accent to-edu-primary text-white rounded-t-lg">
        <span className="font-semibold">Campus Bot</span>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-white hover:bg-white/20"
            onClick={handleReset}
            data-testid="button-reset-chat"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
            data-testid="button-close-chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            data-testid={`message-${message.sender}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t flex gap-2">
        <Input
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          data-testid="input-chat"
        />
        <Button size="icon" onClick={handleSend} data-testid="button-send-chat">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
