import {
    Star, Utensils, Hotel, ShoppingCart, Cross, Heart, Scale,
    Globe2, FileText, CheckCircle2, Phone, MapPin, Clock,
    Sparkles, AlertCircle, Info, TrendingUp, Navigation,
    Clipboard, Building2
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';


export function TravelGuideResults({ nationalityName, destinationName, data } ) {
    return (
        <div id="results-section">
            {/* Summary Banner */}
            <section className="py-8 bg-gradient-to-r from-[#4299c1] to-[#3a87ab] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full mb-4">
                            <Sparkles className="size-5" />
                            <span>بسته اختصاصی شما آماده است!</span>
                        </div>
                        <h2 className="text-4xl mb-4 text-[20px]">
                            🎯 بسته کامل برای {nationalityName}‌ها در {destinationName}
                        </h2>
                        <p className="text-xl opacity-90 text-[12px]">
                            {data.restaurants.length} رستوران • {data.hotels.length} هتل • {data.supermarkets.length} سوپرمارکت •
                            {data.medicalCenters.length} مرکز پزشکی • {data.legalServices.length} خدمت قانونی •
                            {data.culturalTips.length} نکته فرهنگی
                        </p>
                    </div>
                </div>
            </section>

            {/* Restaurants */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-[#4299c1] rounded-xl flex items-center justify-center shadow-md">
                            <Utensils className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl text-[#142738]">
                                رستوران‌های {nationalityName}
                            </h2>
                            <p className="text-[#64656f] mt-1">با منو، پرسنل و فضای {nationalityName}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.restaurants.map((restaurant) => (
                            <div
                                key={restaurant.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 duration-300"
                            >
                                <div className="relative h-56">
                                    <ImageWithFallback
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {restaurant.verified && (
                                        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                            <CheckCircle2 className="size-5 text-green-500" />
                                            <span className="text-[#142738]">تایید شده</span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                                        <Star className="size-5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-white">{restaurant.rating}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl text-[#142738] mb-2">
                                        {restaurant.name}
                                    </h3>
                                    <p className="text-[#64656f] mb-4 text-sm leading-relaxed">{restaurant.description}</p>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-[#64656f]">
                                            <Phone className="size-4 text-[#4299c1]" />
                                            <span dir="ltr">{restaurant.phone}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-[#64656f]">
                                            <MapPin className="size-4 text-[#4299c1] mt-0.5 flex-shrink-0" />
                                            <span>{restaurant.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#64656f]">
                                            <Clock className="size-4 text-[#4299c1]" />
                                            <span>{restaurant.hours}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {restaurant.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-gradient-to-r from-[#4299c1]/10 to-[#4299c1]/5 text-[#4299c1] px-3 py-1.5 rounded-lg text-xs border border-[#4299c1]/20"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supermarkets */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                            <ShoppingCart className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl text-[#142738]">
                                سوپرمارکت‌ها و فروشگاه‌های {nationalityName}
                            </h2>
                            <p className="text-[#64656f] mt-1">مواد غذایی، ادویه‌جات و محصولات خاص</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.supermarkets.map((market) => (
                            <div
                                key={market.id}
                                className="bg-gradient-to-br from-orange-50 to-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-orange-100"
                            >
                                <div className="relative h-48">
                                    <ImageWithFallback
                                        src={market.image}
                                        alt={market.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {market.verified && (
                                        <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                                            <CheckCircle2 className="size-4 text-green-500" />
                                            <span className="text-[#142738] text-sm">تایید شده</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl text-[#142738] mb-2">
                                        {market.name}
                                    </h3>
                                    <p className="text-[#64656f] mb-4">{market.description}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-[#64656f]">
                                            <Phone className="size-4 text-orange-500" />
                                            <span dir="ltr">{market.phone}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-[#64656f]">
                                            <MapPin className="size-4 text-orange-500 mt-0.5" />
                                            <span>{market.address}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {market.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-xs"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hotels */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                            <Hotel className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl text-[#142738]">
                                هتل‌ها و اقامتگاه‌های مناسب
                            </h2>
                            <p className="text-[#64656f] mt-1">با پرسنل {nationalityName}‌زبان و امکانات ویژه</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.hotels.map((hotel) => (
                            <div
                                key={hotel.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 duration-300"
                            >
                                <div className="relative h-64">
                                    <ImageWithFallback
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {hotel.verified && (
                                        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                            <CheckCircle2 className="size-5 text-green-500" />
                                            <span className="text-[#142738]">تایید شده</span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                                            <Star className="size-5 fill-yellow-400 text-yellow-400" />
                                            <span className="text-white">{hotel.rating}</span>
                                        </div>
                                        <div className="bg-white px-4 py-2 rounded-full">
                                            <span className="text-[#142738]">{hotel.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl text-[#142738] mb-2">
                                        {hotel.name}
                                    </h3>
                                    <p className="text-[#64656f] mb-4">{hotel.description}</p>

                                    <div className="mb-4">
                                        <h4 className="text-sm text-[#142738] mb-2">امکانات:</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {hotel.facilities.map((facility, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm text-[#64656f]">
                                                    <CheckCircle2 className="size-4 text-green-500" />
                                                    <span>{facility}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {hotel.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg text-xs"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Medical Centers */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-md">
                            <Cross className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl text-[#142738]">
                                مراکز پزشکی و درمانی
                            </h2>
                            <p className="text-[#64656f] mt-1">با پزشکان و پرسنل {nationalityName}‌زبان</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.medicalCenters.map((center) => (
                            <div
                                key={center.id}
                                className="bg-red-50/50 rounded-2xl p-6 hover:shadow-lg transition-all border-2 border-red-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md">
                                        {center.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-xl text-[#142738]">
                                                {center.name}
                                            </h3>
                                            {center.verified && (
                                                <CheckCircle2 className="size-5 text-green-500" />
                                            )}
                                        </div>
                                        <p className="text-[#64656f] mb-3">{center.description}</p>

                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 text-sm text-[#64656f] mb-2">
                                                <Phone className="size-4 text-red-500" />
                                                <span dir="ltr">{center.phone}</span>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <h4 className="text-xs text-[#64656f] mb-2">تخصص‌ها:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {center.specialties.map((spec, idx) => (
                                                    <span key={idx} className="bg-white text-red-700 px-2 py-1 rounded text-xs border border-red-200">
                            {spec}
                          </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {center.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs"
                                                >
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Religious Centers */}
            {data.religiousCenters.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                                <Building2 className="size-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl text-[#142738]">
                                    مراکز مذهبی و فرهنگی
                                </h2>
                                <p className="text-[#64656f] mt-1">محل دور هم جمع شدن جامعه {nationalityName}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.religiousCenters.map((center) => (
                                <div
                                    key={center.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="relative h-48">
                                        <ImageWithFallback
                                            src={center.image}
                                            alt={center.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {center.verified && (
                                            <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                                                <CheckCircle2 className="size-4 text-green-500" />
                                                <span className="text-[#142738] text-sm">تایید شده</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl text-[#142738] mb-2">
                                            {center.name}
                                        </h3>
                                        <p className="text-[#64656f] mb-4">{center.description}</p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-start gap-2 text-sm text-[#64656f]">
                                                <MapPin className="size-4 text-indigo-500 mt-0.5" />
                                                <span>{center.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#64656f]">
                                                <Clock className="size-4 text-indigo-500" />
                                                <span>{center.schedule}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {center.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs"
                                                >
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Legal Services */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <Scale className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl text-[#142738]">
                                خدمات حقوقی، اداری و مالی
                            </h2>
                            <p className="text-[#64656f] mt-1">متخصصان با تجربه در کمک به {nationalityName}‌ها</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.legalServices.map((service) => (
                            <div
                                key={service.id}
                                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 hover:shadow-xl transition-all border-2 border-blue-100"
                            >
                                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4 shadow-md">
                                    {service.icon}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl text-[#142738]">
                                        {service.name}
                                    </h3>
                                    {service.verified && (
                                        <CheckCircle2 className="size-5 text-green-500" />
                                    )}
                                </div>
                                <p className="text-[#64656f] mb-4">{service.description}</p>

                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-sm text-[#64656f]">
                                        <Phone className="size-4 text-blue-600" />
                                        <span dir="ltr">{service.phone}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="text-xs text-[#64656f] mb-2">خدمات:</h4>
                                    <div className="space-y-1">
                                        {service.services.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-[#64656f]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs"
                                        >
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Attractions */}
            {data.attractions.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center shadow-md">
                                <Heart className="size-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl text-[#142738]">
                                    نقاط دیدنی و تفریحی
                                </h2>
                                <p className="text-[#64656f] mt-1">مورد علاقه جامعه {nationalityName}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.attractions.map((attraction) => (
                                <div
                                    key={attraction.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="relative h-56">
                                        <ImageWithFallback
                                            src={attraction.image}
                                            alt={attraction.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                                            <Star className="size-5 fill-yellow-400 text-yellow-400" />
                                            <span className="text-white">{attraction.rating}</span>
                                        </div>
                                        {attraction.nextEvent && (
                                            <div className="absolute top-4 right-4 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg">
                                                <span className="text-sm">رویداد بعدی: {attraction.nextEvent}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl text-[#142738] mb-2">
                                            {attraction.name}
                                        </h3>
                                        <p className="text-[#64656f] mb-4">{attraction.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {attraction.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-pink-100 text-pink-700 px-3 py-1.5 rounded-lg text-xs"
                                                >
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Cultural Tips */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-md">
                            <Sparkles className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl text-[#142738]">
                                نکات فرهنگی و رفتاری
                            </h2>
                            <p className="text-[#64656f] mt-1">اطلاعات مهم برای زندگی بهتر</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.culturalTips.map((tip) => (
                            <div
                                key={tip.id}
                                className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all border-2 border-yellow-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        {tip.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg text-[#142738]">
                                                {tip.title}
                                            </h3>
                                            <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs">
                        {tip.category}
                      </span>
                                        </div>
                                        <p className="text-[#64656f] leading-relaxed">
                                            {tip.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Guides */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                            <Navigation className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl text-[#142738]">
                                راهنماهای گام‌به‌گام
                            </h2>
                            <p className="text-[#64656f] mt-1">چطور کارها را انجام دهید؟</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.quickGuides.map((guide) => (
                            <div
                                key={guide.id}
                                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all border-2 border-green-100"
                            >
                                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white mb-4 shadow-md">
                                    {guide.icon}
                                </div>
                                <h3 className="text-lg text-[#142738] mb-4">
                                    {guide.title}
                                </h3>
                                <ol className="space-y-3">
                                    {guide.steps.map((step, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                        {idx + 1}
                      </span>
                                            <span className="text-[#64656f] text-sm leading-relaxed flex-1">
                        {step}
                      </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Checklist */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-[#4299c1] rounded-xl flex items-center justify-center shadow-md">
                            <Clipboard className="size-6 text-white" />
                        </div>
                        <h2 className="text-3xl text-[#142738] text-center">
                            چک‌لیست کارهای اولیه
                        </h2>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.checklist.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 bg-white p-4 rounded-xl hover:shadow-md transition-all"
                                >
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                        item.priority === 'high' ? 'border-red-500 bg-red-50' :
                                            item.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                                                'border-green-500 bg-green-50'
                                    }`}>
                                        <div className={`w-4 h-4 rounded-full ${
                                            item.priority === 'high' ? 'bg-red-500' :
                                                item.priority === 'medium' ? 'bg-yellow-500' :
                                                    'bg-green-500'
                                        }`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[#142738]">{item.task}</p>
                                        <p className="text-xs text-[#64656f] mt-1">{item.category}</p>
                                    </div>
                                    {item.priority === 'high' && (
                                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                      ضروری
                    </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-[#4299c1] to-[#3a87ab] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Sparkles className="size-16 mx-auto mb-6" />
                    <h2 className="text-4xl mb-4">
                        آماده برای شروع سفر هستید؟
                    </h2>
                    <p className="text-xl opacity-90 mb-8">
                        با اطلاعات کامل و دقیق بالا، سفر شما به {destinationName} راحت‌تر و لذت‌بخش‌تر خواهد بود
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button className="bg-white text-[#4299c1] px-8 py-4 rounded-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                            ذخیره این بسته
                        </button>
                        <button className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-all">
                            اشتراک‌گذاری
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
