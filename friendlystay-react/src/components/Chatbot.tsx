import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface ChatMessage {
    text: string;
    isUser: boolean;
    quickActions?: string[];
}

const chatbotResponses: Record<string, { keywords: string[], response: string }> = {
    greetings: {
        keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'hii', 'helo'],
        response: "Hello! 😊 Welcome to Friendlystay Homestay. I'm here to help you with bookings, pricing, amenities, and more.\n\nWhat would you like to know?"
    },
    availability: {
        keywords: ['room availability', 'available', 'vacancy', 'rooms available', 'free rooms', 'availability', 'any rooms', 'do you have rooms'],
        response: "🏠 We have rooms available across our 3 properties in Chennai:\n\n📍 Friendlystay – Kolapakkam\n📍 Friendlystay Elite – Mugalivakkam\n📍 Friendlystay Prime – Valasaravakkam\n\nFor real-time availability, please contact us:\n📞 +91 9840920824\n💬 WhatsApp us for instant reply!"
    },
    pricing: {
        keywords: ['pricing', 'price', 'cost', 'rate', 'how much', 'tariff', 'charges', 'rent', 'per night', 'fee'],
        response: "💰 Our room rates vary by property and room type.\n\n• Friendlystay Kolapakkam: ₹1,200 – ₹2,000 / night\n• Friendlystay Elite: ₹1,800 – ₹3,500 / night\n• Friendlystay Prime: ₹1,800 – ₹2,500 / night\n\n📅 Special rates available for weekly & monthly stays!\n📞 Call +91 9840920824 for best price."
    },
    booking: {
        keywords: ['book', 'booking', 'reserve', 'reservation', 'how to book', 'how do i book', 'want to book', 'want to stay'],
        response: "📋 Booking Process:\n\n1️⃣ Contact us via WhatsApp or call\n2️⃣ Share your preferred dates & property\n3️⃣ We confirm availability\n4️⃣ Pay advance to confirm booking\n\n📞 Call / WhatsApp: +91 9840920824\n\nWe'll get back to you within 30 minutes!"
    },
    checkin: {
        keywords: ['check in', 'checkin', 'check-in', 'check out', 'checkout', 'check-out', 'timing', 'time', 'arrival', 'departure'],
        response: "🕐 Check-in & Check-out Timings:\n\n✅ Check-in: 12:00 PM (Noon)\n✅ Check-out: 10:00 AM\n\n⚠️ Early check-in or late check-out is available at additional charges. Please contact us in advance to arrange this.\n\n📞 +91 9840920824"
    },
    cancellation: {
        keywords: ['cancel', 'cancellation', 'refund', 'cancel booking', 'money back', 'cancellation policy'],
        response: "❌ Cancellation Policy:\n\n✅ Full refund if cancelled 24 hours before check-in\n⚠️ ₹1,500 will be charged for cancellations within 24 hours of check-in\n\nFor cancellations, please contact us as early as possible:\n📞 +91 9840920824"
    },
    amenities: {
        keywords: ['amenities', 'amenity', 'facilities', 'facility', 'what do you offer', 'features', 'wifi', 'ac', 'kitchen', 'parking', 'cctv', 'furnished', 'hot water'],
        response: "✨ All our properties are fully furnished with:\n\n✅ Fully Furnished Kitchen\n✅ Air Conditioning (AC)\n✅ High-Speed WiFi\n✅ Hot Water (Geyser)\n✅ Parking\n✅ CCTV Security Cameras\n✅ Pet Friendly\n✅ Couple Friendly\n\nEnjoy a home away from home! 🏡"
    },
    location: {
        keywords: ['location', 'locations', 'where', 'address', 'branch', 'branches', 'area', 'kolapakkam', 'mugalivakkam', 'valasaravakkam', 'directions', 'how to reach'],
        response: "📍 We have 3 properties in Chennai:\n\n🏠 Friendlystay – Kolapakkam (600128)\n🏠 Friendlystay Elite – Mugalivakkam (600125)\n🏠 Friendlystay Prime – Valasaravakkam (600087)\n\nAll properties are in West Chennai, well connected by road.\n\nVisit our Properties page for exact maps & directions!"
    },
    pets: {
        keywords: ['pet', 'pets', 'dog', 'cat', 'animal', 'pet friendly', 'bring pet', 'pet policy', 'pet charge', 'pet fee'],
        response: "🐾 Yes, we are Pet Friendly!\n\n✅ Pets are allowed at all our properties\n💰 Pet charge: ₹500 per pet per stay\n\nPlease inform us about your pet at the time of booking so we can make necessary arrangements.\n\n📞 +91 9840920824"
    },
    extra: {
        keywords: ['extra person', 'extra guest', 'additional person', 'more people', 'extra people', 'additional guest', 'extra charge person'],
        response: "👥 Extra Person Policy:\n\n💰 Charges for extra person: ₹600 per night\n\nPlease inform us about extra guests at the time of booking.\n\n📞 +91 9840920824"
    },
    couples: {
        keywords: ['couple', 'couples', 'couple friendly', 'unmarried', 'boyfriend', 'girlfriend', 'couple allowed'],
        response: "💑 Yes! We are Couple Friendly!\n\nUnmarried couples are welcome at all our Friendlystay properties. We respect your privacy and ensure a comfortable, judgement-free stay.\n\n📞 Book now: +91 9840920824"
    },
    contact: {
        keywords: ['contact', 'phone', 'number', 'call', 'whatsapp', 'reach', 'talk', 'speak', 'email', 'support'],
        response: "📞 Contact Us:\n\n📱 Phone / WhatsApp: +91 9840920824\n📧 Email: info@friendlystay.com\n\n🕐 We're available 24/7 to assist you!\n\nYou can also fill the Contact form on our website and we'll get back to you within 30 minutes."
    },
    default: {
        keywords: [],
        response: "I'm not sure about that, but I'd love to help! 😊\n\nPlease contact us directly for detailed assistance:\n📞 +91 9840920824\n💬 WhatsApp us anytime!\n\nOr visit our Contact page and we'll get back to you within 30 minutes."
    }
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            text: "👋 Hello! Welcome to Friendlystay Homestay.\n\nI can help you with bookings, pricing, amenities, and more. What would you like to know?",
            isUser: false,
            quickActions: ['Room Availability', 'Pricing', 'Locations', 'Amenities', 'Book Now', 'Contact Us']
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const getBotResponse = (msg: string): string => {
        const input = msg.toLowerCase().trim();
        for (const key in chatbotResponses) {
            if (key === 'default') continue;
            const { keywords, response } = chatbotResponses[key];
            if (keywords.some(kw => input.includes(kw))) {
                return response;
            }
        }
        return chatbotResponses.default.response;
    };

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        setMessages(prev => [...prev, { text, isUser: true }]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const response = getBotResponse(text);
            setMessages(prev => [...prev, { text: response, isUser: false }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open Chatbot"
            >
                <MessageSquare />
            </button>

            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <div className="chatbot-header-info">
                        <div className="chatbot-avatar">🏠</div>
                        <div>
                            <h4>Friendlystay Bot</h4>
                            <p>Always online • Quick replies</p>
                        </div>
                    </div>
                    <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className="chatbot-messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-message ${msg.isUser ? 'user' : 'bot'}`}>
                            <div className="chat-bubble" style={{ whiteSpace: 'pre-line' }}>
                                {msg.text}
                                {msg.quickActions && (
                                    <div className="chat-quick-actions">
                                        {msg.quickActions.map(action => (
                                            <button
                                                key={action}
                                                className="chat-quick-btn"
                                                onClick={() => handleSend(action)}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-message bot">
                            <div className="chat-bubble">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chatbot-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                    />
                    <button onClick={() => handleSend(inputValue)}>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;