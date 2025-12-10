"use client"
import React, {useState, useRef, useEffect} from 'react';
import {Send, Bot, User, X} from 'lucide-react';
import {calculateRealPathways} from '../../travelguide/utils/calculateRealPathways';
import {useRouter} from "next/navigation";

export function MigrationChatBot() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({});
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const router = useRouter();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth', inline:"end"});
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            addBotMessage(
                'سلام! من مهاجریار هستم، دستیار هوشمند مهاجرت شما 👋\n\nمن اینجام که بهترین مسیر مهاجرت رو بر اساس شرایط شما پیدا کنم. چند تا سوال ازتون می‌پرسم تا بتونم کمکتون کنم.\n\nاول از همه، اسم شما چیه؟',
                ['علی', 'سارا', 'محمد', 'ترجیح میدم نگم']
            );
        }, 500);
    }, []);

    const addBotMessage = (content, suggestions, pathways) => {
        const newMessage = {
            id: Date.now().toString(),
            type: 'bot',
            content,
            timestamp: new Date(),
            suggestions,
            pathways
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const addUserMessage = content => {
        const newMessage = {
            id: Date.now().toString(),
            type: 'user',
            content,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const simulateTyping = (duration = 1500) => {
        setIsTyping(true);
        return new Promise(resolve =>
            setTimeout(() => {
                setIsTyping(false);
                resolve(true);
            }, duration)
        );
    };

    const getNextQuestion = async (step, answer) => {
        await simulateTyping();

        switch (step) {
            case 0:
                setUserData(prev => ({...prev, name: answer}));
                addBotMessage(
                    `خوشحالم که با شما آشنا شدم ${answer}! 😊\n\nحالا بگید ببینم، چند سالتونه؟`,
                    ['18-25 سال', '26-30 سال', '31-35 سال', '36-40 سال', '41-45 سال', 'بالای 45 سال']
                );
                break;

            case 1:
                setUserData(prev => ({...prev, age: answer}));
                const ageGroup = answer.includes('18-25') ? '18' :
                    answer.includes('26-30') ? '26' :
                        answer.includes('31-35') ? '31' :
                            answer.includes('36-40') ? '36' :
                                answer.includes('41-45') ? '41' : '46';
                setUserData(prev => ({...prev, age: ageGroup}));

                addBotMessage(
                    `عالیه! ${answer === '18-25 سال' ? 'شما تو سن طلایی مهاجرت هستید! 🌟' : 'خوبه!'}\n\nآخرین مدرک تحصیلی‌تون چیه؟`,
                    ['دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی‌ارشد', 'دکتری']
                );
                break;

            case 2:
                setUserData(prev => ({...prev, education: answer}));
                const eduComment = answer === 'دکتری' ? 'واو! دکتری دارید؟ عالیه! 🎓' :
                    answer === 'کارشناسی‌ارشد' ? 'کارشناسی‌ارشد خیلی کمک می‌کنه! 👍' :
                        'خوبه!';
                addBotMessage(
                    `${eduComment}\n\nچند سال سابقه کار دارید؟`,
                    ['بدون سابقه', '1-2 سال', '3-5 سال', '5-10 سال', 'بیش از 10 سال']
                );
                break;

            case 3:
                const workExp = answer.includes('بدون') ? '0' :
                    answer.includes('1-2') ? '1' :
                        answer.includes('3-5') ? '3' :
                            answer.includes('5-10') ? '6' : '11';
                setUserData(prev => ({...prev, workExperience: workExp}));
                addBotMessage(
                    `متوجه شدم. حوزه کاری‌تون چیه؟`,
                    [
                        'فناوری اطلاعات (IT)',
                        'مهندسی',
                        'پزشکی و درمان',
                        'آموزش',
                        'مالی و حسابداری',
                        'مدیریت و بازاریابی',
                        'هنر و طراحی',
                        'سایر'
                    ]
                );
                break;

            case 4:
                setUserData(prev => ({...prev, workField: answer}));
                const fieldComment = answer.includes('IT') ? 'عالی! IT خیلی خواهان داره تو دنیا! 💻' :
                    answer.includes('مهندسی') ? 'مهندسی همیشه مورد نیازه! 🔧' :
                        answer.includes('پزشکی') ? 'پزشکی یکی از بهترین حوزه‌هاست! 🏥' :
                            'خوبه!';
                addBotMessage(
                    `${fieldComment}\n\nمدرک زبان دارید؟ چه آزمونی؟`,
                    ['IELTS', 'TOEFL', 'Duolingo', 'TestDaF (آلمانی)', 'DELF/DALF (فرانسه)', 'هنوز نداده‌ام']
                );
                break;

            case 5:
                setUserData(prev => ({...prev, languageType: answer}));
                if (answer === 'هنوز نداده‌ام') {
                    addBotMessage(
                        `اشکالی نداره! می‌تونید همین الان شروع کنید.\n\nفکر می‌کنید سطح زبان انگلیسی یا آلمانی‌تون چطوره؟`,
                        ['مبتدی', 'متوسط', 'پیشرفته']
                    );
                } else {
                    const langComment = answer.includes('IELTS') ? 'آیلتس خیلی کارآمده! 🎯' :
                        answer.includes('TestDaF') ? 'واو! آلمانی بلدید؟ عالیه! 🇩🇪' :
                            'خوبه!';
                    addBotMessage(
                        `${langComment}\n\nنمره‌تون چقدره؟ یا سطح زبانتون رو چطور ارزیابی می‌کنید؟`,
                        ['مبتدی (A1-A2)', 'متوسط (B1-B2)', 'پیشرفته (C1-C2)']
                    );
                }
                break;

            case 6:
                const level = answer.includes('مبتدی') ? 'مبتدی' :
                    answer.includes('متوسط') ? 'متوسط' : 'پیشرفته';
                setUserData(prev => ({...prev, languageLevel: level}));
                const levelComment = level === 'پیشرفته' ? 'عالی! این خیلی به شما کمک می‌کنه! 🌟' :
                    level === 'متوسط' ? 'خوبه! با تمرین بیشتر می‌تونید بهترش کنید.' :
                        'نگران نباشید، می‌تونید بهبودش بدید.';
                addBotMessage(
                    `${levelComment}\n\nوضعیت تأهل شما چطوره؟`,
                    ['مجرد', 'متأهل', 'متأهل با فرزند']
                );
                break;

            case 7:
                setUserData(prev => ({...prev, maritalStatus: answer}));
                if (answer === 'مجرد') {
                    setUserData(prev => ({...prev, familyMembers: '1'}));
                    addBotMessage(
                        `باشه. در کل بودجه تقریبی‌تون چقدره؟ (به دلار یا یورو)`,
                        ['کمتر از 10,000', '10,000 - 30,000', '30,000 - 100,000', 'بیش از 100,000']
                    );
                    setCurrentStep(prev => prev + 2);
                    return;
                } else {
                    addBotMessage(
                        `متوجه شدم. در کل چند نفرید؟ (شامل خودتون)`,
                        ['2 نفر', '3 نفر', '4 نفر', '5 نفر یا بیشتر']
                    );
                }
                break;

            case 8:
                const members = answer.includes('2') ? '2' :
                    answer.includes('3') ? '3' :
                        answer.includes('4') ? '4' : '5';
                setUserData(prev => ({...prev, familyMembers: members}));
                addBotMessage(
                    `باشه، ${members} نفر. بودجه تقریبی‌تون چقدره؟ (به دلار یا یورو)`,
                    ['کمتر از 10,000', '10,000 - 30,000', '30,000 - 100,000', 'بیش از 100,000']
                );
                break;

            case 9:
                const budget = answer.includes('کمتر') ? 'کم' :
                    answer.includes('10,000 - 30,000') ? 'متوسط' :
                        answer.includes('30,000 - 100,000') ? 'بالا' : 'خیلی‌بالا';
                setUserData(prev => ({...prev, budget}));
                addBotMessage(
                    `متوجه شدم. کشور خاصی مد نظرتونه یا باز هستید؟`,
                    ['کانادا', 'استرالیا', 'آلمان', 'انگلستان', 'اتریش', 'هلند', 'نمی‌دانم / باز هستم']
                );
                break;

            case 10:
                setUserData(prev => ({...prev, targetCountry: answer}));
                addBotMessage(
                    `آخرین سوال: هدف اصلی شما از مهاجرت چیه؟`,
                    ['تحصیل 🎓', 'کار 💼', 'سرمایه‌گذاری 💰', 'زندگی بهتر 🌟', 'ازدواج 💑']
                );
                break;

            case 11:
                setUserData(prev => ({...prev, immigrationGoal: answer}));
                await simulateTyping(2000);
                const profile = {...userData, immigrationGoal: answer};
                const pathways = calculateRealPathways(profile);
                if (!pathways.length) {
                    addBotMessage(
                        `متأسفانه با شرایط فعلی، مسیر مناسبی پیدا نکردم 😔\n\nولی نگران نباشید! می‌تونید:\n\n✅ زبان رو تقویت کنید\n✅ تجربه کاری بیشتری کسب کنید\n✅ بودجه بیشتری جمع کنید\n\nبعد دوباره امتحان کنید!`
                    );
                } else {
                    const topPathway = pathways[0];
                    let summary = `عالی! 🎉 خلاصه‌ای از وضعیت شما:\n`;
                    summary += `🌍 زبان: ${profile.languageLevel}\n💰 بودجه: ${profile.budget}\n🎯 هدف: ${profile.immigrationGoal}\n`;
                    addBotMessage(summary, ['بیشتر بگو', 'مسیرهای دیگه رو ببینم', 'چطور شروع کنم؟', 'لینک‌های رسمی'], pathways);
                }
                break;

            default:
                addBotMessage('متوجه نشدم. می‌تونید دوباره توضیح بدید؟ 🤔', ['قدم‌های بعدی', 'لینک‌های رسمی', 'مسیرهای دیگه', 'دوباره شروع کنم']);
                return;
        }

        setCurrentStep(prev => prev + 1);
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        const userMessage = inputValue.trim();
        addUserMessage(userMessage);
        setInputValue('');
        await getNextQuestion(currentStep, userMessage);
    };

    const handleSuggestionClick = async suggestion => {
        addUserMessage(suggestion);
        await getNextQuestion(currentStep, suggestion);
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-Surface-2 text-white overflow-hidden ">
            {/* Header */}
            <div className="bg-gradient-to-b from-Primary-600 to-Primary-300 text-white px-4 py-4 shadow-lg">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-7 h-7"/>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-medium">مهاجریار هوشمند</h1>
                        <p className="text-sm text-blue-100">دستیار مهاجرت شما</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm hidden lg:inline">آنلاین</span>
                        </div>
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer flex items-center justify-center transition-all"
                            title="بستن"
                        >
                            <X className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.map(message => (
                        <div key={message.id}>
                            <div
                                className={`flex gap-3 ${message.type === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    message.type === 'bot' ? 'bg-Primary-100' : 'bg-Gray-200'
                                }`}>
                                    {message.type === 'bot' ? <Bot className="w-5 h-5 text-Primary-600"/> :
                                        <User className="w-5 h-5 text-Gray-600"/>}
                                </div>
                                <div className="flex flex-col gap-2 max-w-[80%] lg:max-w-[70%]">
                                    <div className={`rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                                        message.type === 'bot' ? 'bg-surface shadow-md border border-Gray-100' : 'bg-blue-600 text-white'
                                    }`}>
                                        <p className={`${message.type === 'bot' ? 'text-Primary-950' : 'text-white'} leading-relaxed`}>
                                            {message.content}
                                        </p>
                                    </div>
                                    {message.suggestions && message.suggestions.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {message.suggestions.map((suggestion, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                    className="px-4 py-2 bg-surface cursor-pointer border-2 border-Primary-200 text-Primary-600 rounded-xl hover:bg-Primary-50 hover:border-Primary-400 transition-all text-sm font-medium"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-3 justify-start">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-Prymary-100">
                                <Bot className="w-5 h-5 text-blue-600"/>
                            </div>
                            <div className="bg-surface shadow-md border border-Gray-100 rounded-2xl px-4 py-3">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-Gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-Gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-Gray-400 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef}/>
                </div>
            </div>

            {/* Input */}
            <div className="border-t border-Gray-200 bg-surface px-4 py-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1 relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="پیام خود را بنویسید..."
                                className="w-full px-4 py-3 text-Gray-950 border-2 border-Gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className={`p-3 rounded-xl transition-all ${
                                inputValue.trim() ? 'bg-blue-600 text-Gray-950 hover:bg-Primary-700' : 'bg-Gray-200 text-Gray-400 cursor-not-allowed'
                            }`}
                        >
                            <Send className="w-5 h-5 cursor-pointer text-white"/>
                        </button>
                    </div>
                    <p className="text-xs text-Gray-500 text-center mt-2">
                        مهاجریار می‌تواند اشتباه کند. اطلاعات مهم را بررسی کنید.
                    </p>
                </div>
            </div>
        </div>
    );
}
