import { AlarmClock, ClipboardList, FileText, Gift, ListTodo, MessageCircleMore, ShoppingCart } from "lucide-react";
import type { AIConversation, Conversation } from "./types";

const getAvatarLink = (name: string): string => {
  const seed = encodeURIComponent(name.trim());
  const backgroundColors = ['5e60ce', 'b5179e', '7209b7', '3f37c9', '4895ef', '4361ee'];
  const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=${randomColor}&fontColor=ffffff`;
};

export const myAvatar = "https://api.dicebear.com/7.x/initials/svg?seed=Nose&backgroundColor=000000&fontColor=ffffff"

export const mockConversations:Conversation[] = [
  {
    id: '1',
    name: 'Luis Easton',
    avatar: getAvatarLink('Luis Easton'),
    status: 'online',
    messages: [{
    from: 'Luis',
    text: 'I placed the order over 60 days ago 😢. Could you make an exception, please?',
    time: '1 min ago',
    seen:true
  },
  {
    from: 'You',
    text: 'Just a heads-up: We can only refund orders from the last 60 days...',
    time: 'Just now',
    seen:true
  }],
    timestamp: '2025-05-23T12:00:00Z',
    seen: true,
    selected:false,
  },
  {
    id: '2',
    name: 'Hira Khan',
    avatar: getAvatarLink('Hira Khan'),
    status: 'busy',
    messages: [{
    from: 'Hira',
    text: 'I need help with my order. It was supposed to arrive yesterday.',
    time: '04:00 pm',
    seen:true
  },
  {
    from: 'You',
    text: 'I’m sorry to hear that! Let me check the status for you.',
    time: '05:55 pm',
    seen:true
  },
  {
    from: 'Hira',
    text: 'Thank you! I appreciate your help.',
    time: '06:04 pm',
    seen:false
  },
  {
    from: 'Hira',
    text: 'I need help with my order. It was supposed to arrive yesterday.',
    time: '06:34 pm',
    seen:false
  }],
    timestamp: '2025-10-01T12:30:00Z',
    seen: false,
    selected:false
  },
  {
    id: '3',
    name: 'Eric Nelson',
    avatar: getAvatarLink('Eric Nelson'),
    status: 'away',
    messages: [{
    from: 'Eric',
    text: 'Can you help me with a refund for my last order?',
    time: '10:20 am',
    seen:false
  },
  {
    from: 'You',
    text: 'Sure! I can assist you with that. Please provide your order number.',
    time: '10:22 am',
    seen:true
  },
  {
    from: 'Eric',
    text: 'My order number is 123456.',
    time: '10:38 am',
    seen:true
  }],
    timestamp: '2025-10-01T12:00:01Z',
    seen: false,
    selected:false
  },
  {
    id: '4',
    name: 'Sofia Reyes',
    avatar: getAvatarLink('Sofia Reyes'),
    status: 'online',
    messages: [{
    from: 'Sofia',
    text: 'I have a question about my recent order.',
    time: '06:20 am',
    seen:true
  },
  {
    from: 'You',
    text: 'Of course! What would you like to know?',
    time: '07:02 am',
    seen:true
  }],
    timestamp: '2025-10-01T12:10:00Z',
    seen: true,
    selected:false
  }
];

export const mockAIConversation = [
    {
      type: 'user',
      text: 'How do I get a refund?'
    },
    {
      type: 'ai',
      text: 'We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. To process your refund request, could you please provide us with your order ID and proof of purchase.\n\nFor orders placed within the last 60 days, our system must meet our requirements for items to be returned. Please check when you made your purchase before proceeding.\n\nOnce we have verified these details, if everything looks correct, we will process your returns QR code which you can use to send the item back to us. Your refund will be automatically issued once you put it in the post.',
          references: [
      {
        id: 1,
        title: 'Getting a refund',
        content: 'This article outlines the general refund process, eligibility criteria, and refund timelines for purchases made from our store.',
        source: 'https://support.example.com/articles/getting-a-refund',
        icon: FileText,
        type: 'article'
      },
      {
        id: 2,
        title: 'Refund for an order placed by mistake',
        content: 'Learn how to cancel and request a refund for accidental purchases before the item ships.',
        source: 'https://support.example.com/guides/accidental-order-refund',
        icon: ShoppingCart,
        type: 'guide'
      },
      {
        id: 3,
        title: 'Refund for an unwanted gift',
        content: 'If you received a gift that you’d like to return, this policy guide explains how to start the refund process without the original receipt.',
        source: 'https://support.example.com/policies/gift-return-policy',
        icon: Gift,
        type: 'policy'
      }
    ]
  }
];
    

export const mockSuggestions = [
  "Summarize this conversation",
  "What are the key points discussed?",
  "Draft a follow-up message",
  "Set a reminder about this task",
  "Generate a to-do list from this chat"
];

export const aiResponses: AIConversation[] = [
  {
    type: 'ai',
    text: 'Here’s a quick summary of the conversation: The customer is requesting a refund for a recent purchase. They mentioned that the item did not meet expectations and are seeking assistance with the return process.',
    references: [
      {
        id: 4,
        title: 'Refund Policy Summary',
        content: 'This document summarizes key points of our refund policy, including eligibility and processing steps.',
        source: 'https://support.example.com/articles/refund-policy-summary',
        icon: FileText,
        type: 'article'
      }
    ]
  },
  {
    type: 'ai',
    text: 'The key points discussed include: 1) The user’s dissatisfaction with the product, 2) A request for refund details, 3) Our standard policy regarding returns within 60 days.',
    references: [
      {
        id: 4,
        title: 'Conversation Highlights',
        content: 'An AI-generated summary of main conversation points for quick review.',
        source: 'https://support.example.com/articles/conversation-highlights',
        icon: ClipboardList,
        type: 'summary'
      }
    ]
  },
  {
    type: 'ai',
    text: 'Sure! Here’s a suggested follow-up message: “Hi Luis, I’ve initiated the refund process. You’ll receive a QR code shortly for your return. Let me know if you need further assistance.”',
    references: [
      {
        id: 5,
        title: 'Follow-Up Templates',
        content: 'Standard messages you can use for post-support customer interaction.',
        source: 'https://support.example.com/templates/follow-up-messages',
        icon: MessageCircleMore,
        type: 'template'
      }
    ]
  },
  {
    type: 'ai',
    text: 'A reminder has been created to follow up with the customer in 3 days. You’ll be notified automatically in your dashboard.',
    references: [
      {
        id: 6,
        title: 'Setting Reminders',
        content: 'This guide shows you how to create and manage reminders for ongoing conversations.',
        source: 'https://support.example.com/guides/set-reminders',
        icon: AlarmClock,
        type: 'guide'
      }
    ]
  },
  {
    type: 'ai',
    text: 'Here’s a to-do list based on this chat:\n1. Verify the customer’s order ID\n2. Check refund eligibility (within 60 days)\n3. Issue return QR code\n4. Confirm return shipment\n5. Process the refund',
    references: [
      {
        id: 7,
        title: 'Chat-Based Task Management',
        content: 'Learn how to create actionable to-do lists from conversations using AI.',
        source: 'https://support.example.com/features/chat-tasks',
        icon: ListTodo,
        type: 'feature'
      }
    ]
  }
];
