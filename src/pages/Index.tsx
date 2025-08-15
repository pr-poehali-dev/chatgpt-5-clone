import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Привет! Я ваш AI-ассистент нового поколения. Как дела? Чем могу помочь?',
      timestamp: '14:30'
    },
    {
      id: 2,
      type: 'user',
      content: 'Расскажи о последних достижениях в области ИИ',
      timestamp: '14:31'
    },
    {
      id: 3,
      type: 'ai',
      content: 'Отличный вопрос! В 2024-2025 году произошло множество прорывов: улучшение языковых моделей, развитие мультимодальных систем, прогресс в области автономного вождения и робототехники. Особенно впечатляют достижения в понимании контекста и способности к рассуждениям.',
      timestamp: '14:32'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const menuItems = [
    { id: 'chat', name: 'Чат', icon: 'MessageCircle' },
    { id: 'history', name: 'История', icon: 'History' },
    { id: 'settings', name: 'Настройки', icon: 'Settings' },
    { id: 'profile', name: 'Профиль', icon: 'User' },
    { id: 'help', name: 'Помощь', icon: 'HelpCircle' },
    { id: 'api', name: 'API', icon: 'Code' }
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          content: 'Спасибо за ваш вопрос! Я обрабатываю ваш запрос с помощью самых современных языковых моделей...',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const renderChatSection = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`flex items-start space-x-3 max-w-[70%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Avatar className="w-8 h-8">
                <AvatarFallback className={message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}>
                  {message.type === 'user' ? 'Вы' : 'AI'}
                </AvatarFallback>
              </Avatar>
              <Card className={`${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'} animate-scale-in`}>
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напишите ваш вопрос..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="p-6 space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="User" size={20} />
            <span>Профиль пользователя</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-lg">ПО</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Пользователь</h3>
              <p className="text-muted-foreground">user@example.com</p>
              <Badge className="bg-secondary">Pro план</Badge>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Запросов сегодня</p>
              <p className="text-2xl font-bold text-primary">47</p>
            </div>
            <div>
              <p className="text-sm font-medium">Всего диалогов</p>
              <p className="text-2xl font-bold text-secondary">124</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="p-6 space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Settings" size={20} />
            <span>Настройки AI</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Модель AI</label>
            <select className="w-full mt-1 p-2 border rounded-md">
              <option>GPT-5 Turbo</option>
              <option>Claude-4 Advanced</option>
              <option>Gemini Ultra</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Температура (креативность)</label>
            <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Максимальная длина ответа</label>
            <input type="number" defaultValue="2048" className="w-full mt-1 p-2 border rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return renderChatSection();
      case 'profile':
        return renderProfileSection();
      case 'settings':
        return renderSettingsSection();
      case 'history':
        return (
          <div className="p-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="History" size={20} />
                  <span>История диалогов</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div>
                        <p className="font-medium">Диалог #{i}</p>
                        <p className="text-sm text-muted-foreground">15 августа 2025</p>
                      </div>
                      <Icon name="ChevronRight" size={16} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'help':
        return (
          <div className="p-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="HelpCircle" size={20} />
                  <span>Помощь и поддержка</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Book" size={16} className="mr-2" />
                    Руководство пользователя
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Техподдержка
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Сообщество
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'api':
        return (
          <div className="p-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Code" size={20} />
                  <span>API документация</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <code className="text-sm">
                      curl -X POST https://api.ai-chat.com/v1/chat<br />
                      -H "Authorization: Bearer YOUR_TOKEN"<br />
                      -H "Content-Type: application/json"
                    </code>
                  </div>
                  <Button className="w-full">
                    <Icon name="Key" size={16} className="mr-2" />
                    Получить API ключ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderChatSection();
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col animate-slide-in-right">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI Chat 5
            </h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground">ПО</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Пользователь</p>
              <p className="text-xs text-sidebar-foreground/70">Pro план</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {menuItems.find(item => item.id === activeSection)?.name}
              </h2>
              <p className="text-muted-foreground">
                {activeSection === 'chat' ? 'Общайтесь с самым продвинутым AI' : 
                 activeSection === 'profile' ? 'Управление аккаунтом и подписками' :
                 activeSection === 'settings' ? 'Персонализация и параметры AI' :
                 activeSection === 'history' ? 'Сохраненные диалоги и чаты' :
                 activeSection === 'help' ? 'FAQ и инструкции по использованию' :
                 'Документация для разработчиков'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary">
                <Icon name="Zap" size={12} className="mr-1" />
                AI активен
              </Badge>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;