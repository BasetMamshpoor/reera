import React, {useState} from 'react';
import {
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    FileText,
    Download,
    Upload,
    Calendar,
    Bell,
    Target,
    ChevronRight,
    ChevronDown,
    Check,
    X,
    Star,
    TrendingUp
} from 'lucide-react';

export function DocumentTimeline({country, pathway}) {
    const [milestones, setMilestones] = useState(getMilestonesForPathway(country, pathway));
    const [expandedMilestone, setExpandedMilestone] = useState(milestones[0]?.id || null);
    const [showCompleted, setShowCompleted] = useState(true);

    const toggleDocument = (milestoneId, documentId) => {
        setMilestones(prev => prev.map(milestone => {
            if (milestone.id === milestoneId) {
                return {
                    ...milestone,
                    documents: milestone.documents.map(doc =>
                        doc.id === documentId ? {...doc, completed: !doc.completed} : doc
                    )
                };
            }
            return milestone;
        }));
    };

    const updateDocumentNotes = (milestoneId, documentId, notes) => {
        setMilestones(prev => prev.map(milestone => {
            if (milestone.id === milestoneId) {
                return {
                    ...milestone,
                    documents: milestone.documents.map(doc =>
                        doc.id === documentId ? {...doc, notes} : doc
                    )
                };
            }
            return milestone;
        }));
    };

    const totalDocuments = milestones.reduce((sum, m) => sum + m.documents.length, 0);
    const completedDocuments = milestones.reduce((sum, m) =>
        sum + m.documents.filter(d => d.completed).length, 0
    );
    const progressPercentage = totalDocuments > 0 ? (completedDocuments / totalDocuments) * 100 : 0;

    const getCategoryIcon = (category) => {
        const icons = {
            personal: '👤',
            financial: '💰',
            education: '🎓',
            work: '💼',
            legal: '⚖️',
            medical: '🏥'
        };
        return icons[category] || '📄';
    };

    const getCategoryColor = (category) => {
        const colors = {
            personal: 'bg-Primary-100 text-Primary-700 border-Primary-300',
            financial: 'bg-green-100 text-green-700 border-green-300',
            education: 'bg-purple-100 text-purple-700 border-purple-300',
            work: 'bg-orange-100 text-orange-700 border-orange-300',
            legal: 'bg-red-100 text-red-700 border-red-300',
            medical: 'bg-pink-100 text-pink-700 border-pink-300'
        };
        return colors[category] || 'bg-Gray-100 text-Gray-700 border-Gray-300';
    };

    const getPriorityBadge = (priority) => {
        const badges = {
            high: {label: 'فوری', className: 'bg-red-100 text-red-700'},
            medium: {label: 'متوسط', className: 'bg-yellow-100 text-yellow-700'},
            low: {label: 'کم', className: 'bg-Gray-100 text-Gray-700'}
        };
        return badges[priority] || badges.low;
    };

    return (
        <div className="bg-surface rounded-2xl mt-6 lg:mt-10 py-6 lg:py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-surface px-4 py-2 rounded-full mb-4">
                        <Target className="w-5 h-5 text-green-600"/>
                        <span className="text-green-600 font-medium">مسیریاب مدارک</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl text-Primary-950 mb-4">
                        چک‌لیست زنده مهاجرت
                    </h2>
                    <p className="text-lg text-Gray-800 max-w-2xl mx-auto">
                        مسیر کامل از امروز تا روز گرفتن ویزا - گام‌به‌گام با یادآوری هوشمند
                    </p>
                </div>

                {/* Progress Overview */}
                <div className="bg-Surface-2 rounded-2xl shadow-lg p-4 lg:p-8 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className=" text-lg lg:text-xl text-Primary-950 font-medium">پیشرفت کلی</h3>
                            <p className="text-sm text-Gray-800 mt-1">
                                {completedDocuments} از {totalDocuments} مدرک آماده شده
                            </p>
                        </div>
                        <div className="text-left">
                            <div className="text-3xl font-bold text-green-600">{Math.round(progressPercentage)}%</div>
                            <div className="text-xs text-Gray-800 mt-1">تکمیل شده</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-4 bg-Gray-100 rounded-full overflow-hidden mb-4">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 flex items-center justify-end px-2"
                            style={{width: `${progressPercentage}%`}}
                        >
                            {progressPercentage > 10 && (
                                <span
                                    className="text-xs text-Gray-50 font-medium">{Math.round(progressPercentage)}%</span>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-100 rounded-xl">
                            <div className="text-2xl font-bold text-blue-600">{milestones.length}</div>
                            <div className="text-xs text-blue-800 mt-1">مرحله</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                            <div className="text-2xl font-bold text-green-600">{completedDocuments}</div>
                            <div className="text-xs text-green-800 mt-1">انجام شده</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-xl">
                            <div
                                className="text-2xl font-bold text-orange-600">{totalDocuments - completedDocuments}</div>
                            <div className="text-xs text-orange-800 mt-1">باقی‌مانده</div>
                        </div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-col lg:flex-rows gap-4 px-4 lg:px-0 justify-between mb-6">
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        className="flex items-center w-fit gap-2 px-4 py-2 bg-surface border-2 border-Gray-200 rounded-xl  transition-all"
                    >
                        <Check className={`w-4 h-4 ${showCompleted ? 'text-green-600' : 'text-Gray-400'}`}/>
                        <span className="text-sm text-Primary-950">نمایش انجام شده‌ها</span>
                    </button>

                    <div className="text-sm text-Gray-800">
                        مسیر: <span className="font-medium text-Primary-950">{pathway}</span> → {country}
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div
                        className="absolute right-6 lg:right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-Primary-200 via-green-200 to-purple-200"></div>

                    {/* Milestones */}
                    <div className="space-y-6">
                        {milestones.map((milestone) => {
                            const milestoneProgress = milestone.documents.length > 0
                                ? (milestone.documents.filter(d => d.completed).length / milestone.documents.length) * 100
                                : 0;
                            const isExpanded = expandedMilestone === milestone.id;
                            const isMilestoneComplete = milestoneProgress === 100;

                            return (
                                <div key={milestone.id} className="relative pr-16 lg:pr-20">
                                    {/* Milestone Icon */}
                                    <div
                                        className={`absolute right-3 lg:right-5 w-12 h-12 rounded-full flex items-center justify-center text-2xl z-10 ${
                                            isMilestoneComplete
                                                ? 'bg-green-500 shadow-lg shadow-green-200'
                                                : 'bg-white border-4 border-Primary-400 shadow-md'
                                        }`}>
                                        {isMilestoneComplete ? '✓' : milestone.icon}
                                    </div>

                                    {/* Milestone Card */}
                                    <div
                                        className={`bg-Surface-2 rounded-2xl shadow-lg overflow-hidden transition-all ${
                                            isExpanded ? 'ring-2 ring-Primary-400' : ''
                                        }`}>
                                        {/* Milestone Header */}
                                        <button
                                            onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                                            className="w-full p-6 text-right transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-Primary-100 text-Primary-700 rounded-full text-sm font-medium">
                              مرحله                              {milestone.phase}
                                                        </span>
                                                        <span
                                                            className="text-sm text-Gray-800">{milestone.duration}</span>
                                                    </div>
                                                    <h3 className=" text-lg lg:text-xl text-Primary-950 font-medium mb-1">{milestone.title}</h3>
                                                    <p className="text-sm text-Gray-800">{milestone.description}</p>
                                                </div>

                                                <div className="flex items-center gap-4 mr-4">
                                                    <div className="text-center">
                                                        <div
                                                            className={`text-2xl font-bold ${isMilestoneComplete ? 'text-green-600' : 'text-Primary-600'}`}>
                                                            {Math.round(milestoneProgress)}%
                                                        </div>
                                                        <div className="text-xs text-Gray-800">
                                                            {milestone.documents.filter(d => d.completed).length}/{milestone.documents.length}
                                                        </div>
                                                    </div>
                                                    <ChevronDown
                                                        className={`w-6 h-6 text-Gray-800 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
                                                </div>
                                            </div>

                                            {/* Mini Progress Bar */}
                                            <div className="h-2 bg-Gray-100 rounded-full overflow-hidden mt-4">
                                                <div
                                                    className={`h-full rounded-full transition-all ${
                                                        isMilestoneComplete ? 'bg-green-500' : 'bg-Primary-500'
                                                    }`}
                                                    style={{width: `${milestoneProgress}%`}}
                                                ></div>
                                            </div>
                                        </button>

                                        {/* Documents List */}
                                        {isExpanded && (
                                            <div className="border-t border-Gray-200 bg-Gray-50 p-4 lg:p-6">
                                                <div className="space-y-4">
                                                    {milestone.documents
                                                        .filter(doc => showCompleted || !doc.completed)
                                                        .map(doc => (
                                                            <div
                                                                key={doc.id}
                                                                className={`bg-Surface-2 rounded-xl p-5 shadow-sm border-2 transition-all ${
                                                                    doc.completed
                                                                        ? 'border-green-200'
                                                                        : 'border-Gray-200 hover:shadow-md'
                                                                }`}
                                                            >
                                                                <div className="flex flex-col lg:flex-row items-start gap-4">
                                                                    {/* Checkbox */}
                                                                    <button
                                                                        onClick={() => toggleDocument(milestone.id, doc.id)}
                                                                        className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                                                            doc.completed
                                                                                ? 'bg-green-500 text-white shadow-md'
                                                                                : 'border-2 border-Gray-300  bg-white'
                                                                        }`}
                                                                    >
                                                                        {doc.completed && <Check className="w-5 h-5"/>}
                                                                    </button>

                                                                    {/* Document Info */}
                                                                    <div className="flex-1">
                                                                        <div
                                                                            className="flex items-start justify-between gap-4 mb-2">
                                                                            <div className="flex-1">
                                                                                <h4 className={`text-base font-medium mb-1 ${
                                                                                    doc.completed ? 'text-Gray-500 line-through' : 'text-Primary-950'
                                                                                }`}>
                                                                                    {doc.title}
                                                                                </h4>
                                                                                <p className="text-sm text-Gray-800 leading-relaxed">
                                                                                    {doc.description}
                                                                                </p>
                                                                            </div>

                                                                            <div
                                                                                className="flex flex-col items-end gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border-2 ${
                                                getCategoryColor(doc.category)
                                            }`}>
                                          <span>{getCategoryIcon(doc.category)}</span>
                                          <span className="hidden lg:inline">{doc.category}</span>
                                        </span>

                                                                                {doc.priority === 'high' && (
                                                                                    <span
                                                                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                                                                            getPriorityBadge(doc.priority).className
                                                                                        }`}>
                                            <AlertCircle className="w-3 h-3"/>
                                                                                        {getPriorityBadge(doc.priority).label}
                                          </span>
                                                                                )}
                                                                            </div>
                                                                        </div>

                                                                        {/* Meta Info */}
                                                                        <div
                                                                            className="flex items-center gap-4 text-xs text-Gray-800 mb-3">
                                                                            <div className="flex items-center gap-1">
                                                                                <Clock className="w-4 h-4"/>
                                                                                <span>{doc.estimatedTime}</span>
                                                                            </div>
                                                                            {doc.deadline && (
                                                                                <div
                                                                                    className="flex items-center gap-1">
                                                                                    <Calendar className="w-4 h-4"/>
                                                                                    <span>ضرب‌العجل: {doc.deadline}</span>
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                        {/* Tips */}
                                                                        {doc.tips && doc.tips.length > 0 && !doc.completed && (
                                                                            <div
                                                                                className="bg-Primary-50 border-r-4 border-Primary-400 rounded-lg p-3 mb-3">
                                                                                <div className="flex items-start gap-2">
                                                                                    <Star
                                                                                        className="w-4 h-4 text-Primary-600 flex-shrink-0 mt-0.5"/>
                                                                                    <div className="flex-1">
                                                                                        <div
                                                                                            className="text-xs font-medium text-Primary-900 mb-1">نکات
                                                                                            مهم:
                                                                                        </div>
                                                                                        <ul className="space-y-1">
                                                                                            {doc.tips.map((tip, idx) => (
                                                                                                <li key={idx}
                                                                                                    className="text-xs text-Primary-800 flex items-start gap-1">
                                                                                                    <span
                                                                                                        className="mt-1">•</span>
                                                                                                    <span>{tip}</span>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        {/* Actions */}
                                                                        <div className="flex items-center gap-2">
                                                                            {doc.sampleLink && (
                                                                                <a
                                                                                    href={doc.sampleLink}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs transition-colors"
                                                                                >
                                                                                    <Download className="w-3.5 h-3.5"/>
                                                                                    دانلود نمونه
                                                                                </a>
                                                                            )}

                                                                            <button
                                                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-Gray-100 text-Gray-700 rounded-lg text-xs transition-colors">
                                                                                <Upload className="w-3.5 h-3.5"/>
                                                                                آپلود مدرک
                                                                            </button>

                                                                            <button
                                                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-Gray-100 text-Gray-700 rounded-lg text-xs transition-colors">
                                                                                <Bell className="w-3.5 h-3.5"/>
                                                                                یادآوری
                                                                            </button>
                                                                        </div>

                                                                        {/* Notes */}
                                                                        {!doc.completed && (
                                                                            <div className="mt-3">
                                        <textarea
                                            value={doc.notes || ''}
                                            onChange={(e) => updateDocumentNotes(milestone.id, doc.id, e.target.value)}
                                            placeholder="یادداشت شخصی (اختیاری)..."
                                            className="w-full px-3 py-2 text-sm border-2 border-Gray-200 rounded-lg focus:border-Primary-400 focus:outline-none resize-none"
                                            rows={2}
                                        />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>

                                                {/* Milestone Complete Message */}
                                                {isMilestoneComplete && (
                                                    <div
                                                        className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                                                <Check className="w-6 h-6 text-white"/>
                                                            </div>
                                                            <div>
                                                                <div
                                                                    className="text-green-900 font-medium">مرحله {milestone.phase} تکمیل
                                                                    شد! 🎉
                                                                </div>
                                                                <div className="text-sm text-green-700">می‌توانید به
                                                                    مرحله بعدی بروید
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Completion Celebration */}
                {progressPercentage === 100 && (
                    <div
                        className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-2xl p-8 text-center">
                        <div className="text-6xl mb-4">🎊</div>
                        <h3 className="text-3xl font-bold mb-2">تبریک! همه مدارک آماده است!</h3>
                        <p className="text-green-100 text-lg mb-6">
                            شما آماده‌ی ثبت درخواست ویزا هستید
                        </p>
                        <button
                            className="bg-white text-green-600 px-8 py-4 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 font-medium">
                            مشاهده راهنمای ثبت نهایی
                        </button>
                    </div>
                )}

                {/* Help Box */}
                <div
                    className="mt-8 bg-Surface-2 border-2 border-Primary-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                        <div
                            className="w-10 h-10 bg-Primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bell className="w-5 h-5 text-white"/>
                        </div>
                        <div>
                            <h4 className="text-Primary-950 font-medium mb-2">💡 یادآوری هوشمند</h4>
                            <p className="text-Gray-800 leading-relaxed">
                                سیستم هر هفته پیشرفت شما را بررسی می‌کند و برای مدارکی که ضرب‌العجل نزدیکی دارند،
                                به شما اطلاع می‌دهد. می‌توانید برای هر مدرک یادآوری سفارشی تنظیم کنید.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sample data generator based on country and pathway
function getMilestonesForPathway(country, pathway) {
    // This would be dynamically generated based on the actual country and pathway
    // For now, returning sample data for Germany - Blue Card

    return [
        {
            id: 'milestone-1',
            title: 'مدارک شخصی و شناسایی',
            description: 'آماده‌سازی مدارک اولیه و اسناد شناسایی',
            duration: '۱-۲ هفته',
            phase: 1,
            icon: '📋',
            completed: false,
            documents: [
                {
                    id: 'doc-1-1',
                    title: 'پاسپورت معتبر',
                    description: 'پاسپورت با حداقل 6 ماه اعتبار پس از تاریخ ورود به آلمان',
                    category: 'personal',
                    priority: 'high',
                    estimatedTime: '1 روز',
                    completed: false,
                    tips: [
                        'اعتبار پاسپورت را حداقل 6 ماه بیشتر از تاریخ سفر در نظر بگیرید',
                        'اگر پاسپورت ندارید، فوراً اقدام کنید - زمان‌بر است'
                    ]
                },
                {
                    id: 'doc-1-2',
                    title: 'عکس پاسپورتی بیومتریک',
                    description: '2 عکس رنگی با پس‌زمینه سفید (35×45 میلیمتر) مطابق استانداردهای ICAO',
                    category: 'personal',
                    priority: 'high',
                    estimatedTime: '1 روز',
                    deadline: 'قبل از درخواست ویزا',
                    completed: false,
                    tips: [
                        'از آتلیه‌های معتبر عکس بگیرید که با استانداردهای آلمان آشنا هستند',
                        'عکس نباید بیش از 6 ماه قدمت داشته باشد'
                    ],
                    sampleLink: 'https://www.germany.info/photo-guidelines'
                },
                {
                    id: 'doc-1-3',
                    title: 'شناسنامه و کارت ملی (ترجمه رسمی)',
                    description: 'ترجمه رسمی شناسنامه و کارت ملی به آلمانی یا انگلیسی',
                    category: 'personal',
                    priority: 'medium',
                    estimatedTime: '3-5 روز',
                    completed: false,
                    tips: [
                        'از مترجمین رسمی مورد تأیید سفارت استفاده کنید',
                        'ترجمه باید مُهر و امضای مترجم داشته باشد'
                    ]
                },
                {
                    id: 'doc-1-4',
                    title: 'گواهی عدم سوء پیشینه',
                    description: 'گواهی عدم سوء پیشینه کیفری (نباید بیشتر از 3 ماه قدمت داشته باشد)',
                    category: 'legal',
                    priority: 'high',
                    estimatedTime: '7-10 روز',
                    deadline: 'حداکثر 3 ماه قبل از درخواست',
                    completed: false,
                    tips: [
                        'از دادگستری یا پلیس +10 محل سکونت دریافت کنید',
                        'ترجمه رسمی به آلمانی الزامی است',
                        'این مدرک نباید بیش از 3 ماه قدمت داشته باشد'
                    ]
                }
            ]
        },
        {
            id: 'milestone-2',
            title: 'مدارک تحصیلی و تخصصی',
            description: 'ترجمه و تأییدیه مدارک تحصیلی و گواهی‌های حرفه‌ای',
            duration: '2-4 هفته',
            phase: 2,
            icon: '🎓',
            completed: false,
            documents: [
                {
                    id: 'doc-2-1',
                    title: 'مدرک تحصیلی (دیپلم، لیسانس، فوق‌لیسانس)',
                    description: 'اصل و ترجمه رسمی تمام مدارک دانشگاهی',
                    category: 'education',
                    priority: 'high',
                    estimatedTime: '5-7 روز',
                    completed: false,
                    tips: [
                        'ترجمه باید توسط مترجم رسمی انجام شود',
                        'مُهر دانشگاه روی اصل مدرک ضروری است',
                        'برای Blue Card آلمان، معادل‌سازی مدرک لازم است'
                    ],
                    sampleLink: 'https://anabin.kmk.org'
                },
                {
                    id: 'doc-2-2',
                    title: 'ریز نمرات (Transcript)',
                    description: 'ریز نمرات تمام دوره‌های تحصیلی با ترجمه رسمی',
                    category: 'education',
                    priority: 'high',
                    estimatedTime: '3-5 روز',
                    completed: false,
                    tips: [
                        'از دانشگاه اصل ریز نمرات با مُهر و امضای رسمی دریافت کنید',
                        'ترجمه باید کامل و دقیق باشد'
                    ]
                },
                {
                    id: 'doc-2-3',
                    title: 'گواهی‌های تخصصی و دوره‌ها',
                    description: 'گواهی‌های مرتبط با حوزه کاری (اختیاری اما مفید)',
                    category: 'education',
                    priority: 'low',
                    estimatedTime: '2-3 روز',
                    completed: false
                },
                {
                    id: 'doc-2-4',
                    title: 'تأییدیه معادل‌سازی مدرک (ZAB/Anabin)',
                    description: 'تأیید معادل بودن مدرک تحصیلی در آلمان',
                    category: 'education',
                    priority: 'high',
                    estimatedTime: '4-8 هفته',
                    deadline: 'قبل از درخواست Blue Card',
                    completed: false,
                    tips: [
                        'از سایت anabin.kmk.org چک کنید که مدرک شما معتبر است',
                        'اگر نیاز به ارزیابی رسمی دارد، فرآیند طولانی است',
                        'هزینه: حدود 200 یورو'
                    ],
                    sampleLink: 'https://anabin.kmk.org'
                }
            ]
        },
        {
            id: 'milestone-3',
            title: 'مدارک کاری و قرارداد',
            description: 'قرارداد کار، CV و مدارک سوابق شغلی',
            duration: '1-2 هفته',
            phase: 3,
            icon: '💼',
            completed: false,
            documents: [
                {
                    id: 'doc-3-1',
                    title: 'قرارداد کار از کارفرمای آلمانی',
                    description: 'قرارداد کار رسمی با حقوق حداقل 45,300 یورو (2024) برای Blue Card',
                    category: 'work',
                    priority: 'high',
                    estimatedTime: 'بستگی به کارفرما',
                    deadline: 'ضروری',
                    completed: false,
                    tips: [
                        'حقوق باید بالاتر از آستانه Blue Card باشد (45,300€ برای 2024)',
                        'برای مشاغل کمبود نیرو (IT و مهندسی): 41,041.80€',
                        'قرارداد باید جزئیات کامل شغل، حقوق و مزایا را داشته باشد'
                    ]
                },
                {
                    id: 'doc-3-2',
                    title: 'رزومه (CV) به آلمانی/انگلیسی',
                    description: 'رزومه کامل و حرفه‌ای به فرمت اروپایی (Europass)',
                    category: 'work',
                    priority: 'high',
                    estimatedTime: '2-3 روز',
                    completed: false,
                    tips: [
                        'از فرمت Europass استفاده کنید',
                        'تمام سوابق کاری و پروژه‌ها را ذکر کنید',
                        'مهارت‌های زبانی را با سطح دقیق بنویسید'
                    ],
                    sampleLink: 'https://europa.eu/europass'
                },
                {
                    id: 'doc-3-3',
                    title: 'گواهی سوابق کار',
                    description: 'گواهی‌های کار از کارفرمایان قبلی با ترجمه رسمی',
                    category: 'work',
                    priority: 'medium',
                    estimatedTime: '5-7 روز',
                    completed: false,
                    tips: [
                        'از هر کارفرمای قبلی گواهی کار بگیرید',
                        'ترجمه رسمی به آلمانی یا انگلیسی ضروری است',
                        'تاریخ‌ها و سمت‌های شغلی باید دقیق باشد'
                    ]
                }
            ]
        },
        {
            id: 'milestone-4',
            title: 'مدارک مالی و بیمه',
            description: 'اثبات توان مالی و بیمه سلامت',
            duration: '1 هفته',
            phase: 4,
            icon: '💰',
            completed: false,
            documents: [
                {
                    id: 'doc-4-1',
                    title: 'گواهی بیمه سلامت آلمان',
                    description: 'بیمه سلامت معتبر در آلمان (از زمان ورود)',
                    category: 'financial',
                    priority: 'high',
                    estimatedTime: '2-3 روز',
                    deadline: 'قبل از درخواست ویزا',
                    completed: false,
                    tips: [
                        'بیمه باید از تاریخ ورود شروع شود',
                        'شرکت‌های معتبر: TK, AOK, DAK',
                        'هزینه: حدود 110-120 یورو/ماه'
                    ]
                },
                {
                    id: 'doc-4-2',
                    title: 'اثبات توان مالی',
                    description: 'صورتحساب بانکی 3-6 ماه اخیر (اختیاری برای Blue Card)',
                    category: 'financial',
                    priority: 'low',
                    estimatedTime: '1 روز',
                    completed: false
                },
                {
                    id: 'doc-4-3',
                    title: 'گواهی اسکان در آلمان',
                    description: 'رزرو هتل یا قرارداد اجاره یا دعوت‌نامه',
                    category: 'personal',
                    priority: 'medium',
                    estimatedTime: '1-2 روز',
                    completed: false,
                    tips: [
                        'برای اولین ماه‌ها رزرو هتل یا Airbnb کافی است',
                        'بعد از ورود قرارداد اجاره دائمی می‌گیرید'
                    ]
                }
            ]
        },
        {
            id: 'milestone-5',
            title: 'فرم‌ها و درخواست نهایی',
            description: 'پر کردن فرم‌های رسمی و تکمیل درخواست',
            duration: '3-5 روز',
            phase: 5,
            icon: '📝',
            completed: false,
            documents: [
                {
                    id: 'doc-5-1',
                    title: 'فرم درخواست ویزا ملی (Antrag)',
                    description: 'فرم رسمی درخواست ویزای کار آلمان - پر شده و امضا شده',
                    category: 'legal',
                    priority: 'high',
                    estimatedTime: '1-2 ساعت',
                    completed: false,
                    tips: [
                        'با دقت و با خودکار مشکی پر کنید',
                        'اطلاعات باید با سایر مدارک مطابقت داشته باشد',
                        'امضای شخصی ضروری است'
                    ],
                    sampleLink: 'https://teheran.diplo.de/forms'
                },
                {
                    id: 'doc-5-2',
                    title: 'فرم اطلاعات تکمیلی',
                    description: 'فرم‌های اضافی سفارت (در صورت نیاز)',
                    category: 'legal',
                    priority: 'medium',
                    estimatedTime: '30-60 دقیقه',
                    completed: false
                },
                {
                    id: 'doc-5-3',
                    title: 'رسید پرداخت هزینه ویزا',
                    description: 'پرداخت هزینه ویزا (حدود 75 یورو) و رسید آن',
                    category: 'financial',
                    priority: 'high',
                    estimatedTime: '1 روز',
                    deadline: 'روز مصاحبه',
                    completed: false,
                    tips: [
                        'هزینه را در روز مصاحبه پرداخت می‌کنید',
                        'حتماً رسید را نگه دارید'
                    ]
                },
                {
                    id: 'doc-5-4',
                    title: 'نامه توضیحی (Cover Letter)',
                    description: 'نامه‌ای که دلایل مهاجرت و برنامه‌تان را توضیح می‌دهد',
                    category: 'personal',
                    priority: 'medium',
                    estimatedTime: '2-3 ساعت',
                    completed: false,
                    tips: [
                        'به زبان ساده و واضح بنویسید',
                        'دلایل مهاجرت، نقشه کاری و برنامه‌های آینده را ذکر کنید'
                    ]
                }
            ]
        },
        {
            id: 'milestone-6',
            title: 'مصاحبه و پیگیری',
            description: 'رزرو وقت مصاحبه و پیگیری نتیجه',
            duration: '4-12 هفته',
            phase: 6,
            icon: '✈️',
            completed: false,
            documents: [
                {
                    id: 'doc-6-1',
                    title: 'رزرو وقت مصاحبه',
                    description: 'رزرو آنلاین وقت مصاحبه در سفارت آلمان',
                    category: 'legal',
                    priority: 'high',
                    estimatedTime: '1 روز',
                    deadline: 'هرچه زودتر',
                    completed: false,
                    tips: [
                        'وقت‌ها سریع پر می‌شود - فوراً رزرو کنید',
                        'لینک: https://teheran.diplo.de',
                        'معمولاً 2-3 ماه انتظار دارد'
                    ],
                    sampleLink: 'https://teheran.diplo.de'
                },
                {
                    id: 'doc-6-2',
                    title: 'چک‌لیست نهایی مدارک',
                    description: 'مرور و چک کردن تمام مدارک قبل از مصاحبه',
                    category: 'personal',
                    priority: 'high',
                    estimatedTime: '1-2 ساعت',
                    deadline: 'روز قبل مصاحبه',
                    completed: false,
                    tips: [
                        'تمام مدارک را در یک پوشه مرتب کنید',
                        'از هر مدرک یک کپی اضافه داشته باشید',
                        'لیست چک‌لیست سفارت را چاپ کنید'
                    ]
                },
                {
                    id: 'doc-6-3',
                    title: 'آماده‌سازی برای مصاحبه',
                    description: 'آماده شدن برای سؤالات مصاحبه و تمرین پاسخ‌ها',
                    category: 'personal',
                    priority: 'medium',
                    estimatedTime: '2-3 روز',
                    completed: false,
                    tips: [
                        'درباره شرکت و موقعیت شغلی تحقیق کنید',
                        'پاسخ‌های واضح و صادقانه بدهید',
                        'لباس رسمی بپوشید'
                    ]
                },
                {
                    id: 'doc-6-4',
                    title: 'پیگیری وضعیت درخواست',
                    description: 'پیگیری منظم وضعیت درخواست بعد از مصاحبه',
                    category: 'legal',
                    priority: 'low',
                    estimatedTime: '4-12 هفته',
                    completed: false,
                    tips: [
                        'زمان پاسخ معمولاً 4-12 هفته است',
                        'می‌توانید با شماره reference پیگیری کنید',
                        'صبور باشید - فرآیند زمان می‌برد'
                    ]
                }
            ]
        }
    ];
}
