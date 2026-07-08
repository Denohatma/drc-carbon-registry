'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAction {
  label: string;
  description: string;
  href: string;
}

const quickActions: QuickAction[] = [
  { label: 'Browse Projects', description: 'View all registered carbon projects', href: '/registry/projects' },
  { label: 'Prospective Pipeline', description: 'Explore new investment opportunities', href: '/pipeline' },
  { label: 'Matchmaking', description: 'AI-powered project-to-funder matching', href: '/matchmaking' },
  { label: 'Satellite Monitor', description: 'Real-time deforestation monitoring', href: '/mrv/monitor' },
  { label: 'Carbon Credits', description: 'View credit issuance and transfers', href: '/registry/credits' },
  { label: 'NDC Progress', description: 'Track national climate targets', href: '/ndc/progress' },
  { label: 'Risk Assessment', description: 'Carbon asset risk analysis', href: '/finance/risk' },
  { label: 'Admin Queries', description: 'Manage project inquiries', href: '/admin' },
];

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  actions?: QuickAction[];
}

const greetingMessage: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: 'Welcome to the DRC Carbon Registry! I can help you navigate the platform. What would you like to do?',
  actions: quickActions.slice(0, 4),
};

function getResponse(input: string): ChatMessage {
  const lower = input.toLowerCase();

  if (lower.includes('project') && (lower.includes('pipeline') || lower.includes('new') || lower.includes('invest'))) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Here are your options for exploring projects:',
      actions: [
        quickActions[0],
        quickActions[1],
        quickActions[2],
      ],
    };
  }

  if (lower.includes('credit') || lower.includes('transfer') || lower.includes('retire')) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'For carbon credit operations:',
      actions: [
        { label: 'Credits Ledger', description: 'View all issued credits', href: '/registry/credits' },
        { label: 'Transfers', description: 'Track credit transfers', href: '/registry/transfers' },
        { label: 'Retirements', description: 'View retired credits', href: '/registry/retirements' },
      ],
    };
  }

  if (lower.includes('monitor') || lower.includes('satellite') || lower.includes('deforestation') || lower.includes('alert')) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'For MRV and monitoring:',
      actions: [
        { label: 'Satellite Monitor', description: 'Real-time satellite imagery', href: '/mrv/monitor' },
        { label: 'Deforestation Alerts', description: 'Active deforestation alerts', href: '/mrv/alerts' },
        { label: 'Carbon Stocks', description: 'Forest carbon stock estimates', href: '/mrv/carbon-stocks' },
      ],
    };
  }

  if (lower.includes('ndc') || lower.includes('emission') || lower.includes('target') || lower.includes('climate')) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'For NDC and climate tracking:',
      actions: [
        { label: 'NDC Targets', description: 'National climate commitments', href: '/ndc/targets' },
        { label: 'Emissions Data', description: 'GHG emissions by sector', href: '/ndc/emissions' },
        { label: 'Climate Risk', description: 'Climate risk assessment', href: '/finance/climate-risk' },
      ],
    };
  }

  if (lower.includes('fund') || lower.includes('match') || lower.includes('investor') || lower.includes('epc') || lower.includes('finance')) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'For finance and matchmaking:',
      actions: [
        quickActions[2],
        { label: 'Carbon Assets', description: 'Portfolio valuation', href: '/finance/assets' },
        { label: 'Valuations', description: 'Market pricing data', href: '/finance/valuations' },
      ],
    };
  }

  if (lower.includes('payment') || lower.includes('escrow') || lower.includes('kyc') || lower.includes('benefit')) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'For payments and compliance:',
      actions: [
        { label: 'Escrow', description: 'Escrow account management', href: '/payments/escrow' },
        { label: 'Benefit Sharing', description: 'Community benefit distribution', href: '/payments/benefit-sharing' },
        { label: 'KYC/AML', description: 'Compliance verification', href: '/payments/kyc' },
      ],
    };
  }

  if (lower.includes('admin') || lower.includes('query') || lower.includes('question')) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'For admin and query management:',
      actions: [
        quickActions[7],
        quickActions[1],
      ],
    };
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: 'Here are some areas I can help you with:',
    actions: quickActions.slice(0, 4),
  };
}

export default function DashboardChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greetingMessage]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: input.trim() };
    const botReply = getResponse(input);
    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accent/90 transition-all duration-200 hover:scale-105"
          aria-label="Open assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex w-[calc(100vw-1.5rem)] sm:w-96 max-h-[80vh] sm:max-h-[520px] flex-col rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-accent px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">AfCEN Assistant</div>
                <div className="text-xs opacity-80">DRC Carbon Registry</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 hover:bg-white/20 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '360px' }}>
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === 'assistant' ? (
                  <div className="space-y-2">
                    <div className="inline-block max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-secondary px-3.5 py-2.5 text-sm text-foreground">
                      {msg.content}
                    </div>
                    {msg.actions && (
                      <div className="space-y-1.5 pl-1">
                        {msg.actions.map((action) => (
                          <a
                            key={action.href}
                            href={action.href}
                            className="flex items-center gap-2 rounded-xl border border-border-light px-3 py-2.5 text-left transition-all hover:bg-surface-secondary hover:border-accent/30 group"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{action.label}</div>
                              <div className="text-xs text-foreground-muted">{action.description}</div>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-foreground-subtle group-hover:text-accent transition-colors" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="inline-block max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm text-white">
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 rounded-xl border border-border-light bg-surface-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl transition-all',
                  input.trim()
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-surface-secondary text-foreground-subtle cursor-not-allowed'
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
