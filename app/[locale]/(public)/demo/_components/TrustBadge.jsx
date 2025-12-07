import React from 'react';
import { Package, Star, Shield, Award } from 'lucide-react';


export const TrustBadge = ({
                                                          successfulDeliveries,
                                                          className = '',
                                                          showLabel = true
                                                      }) => {
    const getTrustLevel = () => {
        if (successfulDeliveries >= 20) {
            return {
                label: 'حرفه‌ای',
                icon: Award,
                color: 'text-purple-600 bg-purple-50 border-purple-200',
                iconColor: 'text-purple-600'
            };
        } else if (successfulDeliveries >= 10) {
            return {
                label: 'قابل اعتماد',
                icon: Shield,
                color: 'text-green-600 bg-green-50 border-green-200',
                iconColor: 'text-green-600'
            };
        } else if (successfulDeliveries >= 5) {
            return {
                label: 'با تجربه',
                icon: Star,
                color: 'text-blue-600 bg-blue-50 border-blue-200',
                iconColor: 'text-blue-600'
            };
        } else if (successfulDeliveries > 0) {
            return {
                label: 'تازه‌کار',
                icon: Package,
                color: 'text-gray-600 bg-gray-50 border-gray-200',
                iconColor: 'text-gray-600'
            };
        }
        return null;
    };

    const trustLevel = getTrustLevel();

    if (!trustLevel) return null;

    const Icon = trustLevel.icon;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${trustLevel.color} ${className}`}>
            <Icon className={`w-3.5 h-3.5 ${trustLevel.iconColor}`} />
            {showLabel && (
                <span className="text-xs">{trustLevel.label}</span>
            )}
            <span className="text-xs">({successfulDeliveries} ارسال موفق)</span>
        </div>
    );
};



export const UrgentBadge = ({ className }) => {
    return (
        <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500 text-white ${className}`}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">فوری</span>
        </div>
    );
};
