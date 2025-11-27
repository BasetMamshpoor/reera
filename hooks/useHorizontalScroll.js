import {useState, useEffect, useRef} from 'react';

function useSwipeScroll() {
    const [hasSwiped, setHasSwiped] = useState(false);
    const ref = useRef(null); // ref به صورت پیش‌فرض null است
    const isDragging = useRef(false);
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const velXRef = useRef(0);
    const momentumIDRef = useRef(null);
    const hasSwipedRef = useRef(hasSwiped);

    // به‌روزرسانی hasSwipedRef هر وقت hasSwiped تغییر کند
    useEffect(() => {
        hasSwipedRef.current = hasSwiped;
    }, [hasSwiped]);

    useEffect(() => {
        const slider = ref.current;
        // اگر ref به هیچ المنتی متصل نباشد، بدون خطا خارج می‌شویم
        if (!slider) return;

        const handleMouseDown = (e) => {
            e.preventDefault();
            isDownRef.current = true;
            isDragging.current = false;
            startXRef.current = e.pageX - slider.offsetLeft;
            scrollLeftRef.current = slider.scrollLeft;
            cancelMomentumTracking();
        };

        const handleMouseLeave = (e) => {
            e.preventDefault();
            isDownRef.current = false;
        };

        const handleMouseUp = (e) => {
            e.preventDefault();
            isDownRef.current = false;
            beginMomentumTracking();
            setTimeout(() => setHasSwiped(false), 0);
        };

        const handleMouseMove = (e) => {
            if (!isDownRef.current) return;
            e.preventDefault();
            isDragging.current = true;
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startXRef.current) * 1;
            let prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeftRef.current - walk;
            velXRef.current = slider.scrollLeft - prevScrollLeft;
            if (slider.scrollLeft - prevScrollLeft && !hasSwipedRef.current) {
                setHasSwiped(true);
            }
        };

        const handleClick = (e) => {
            if (isDragging.current) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };

        const handleWheel = (e) => {
            cancelMomentumTracking();
        };

        // توابع مربوط به momentum
        const cancelMomentumTracking = () => {
            if (momentumIDRef.current) {
                cancelAnimationFrame(momentumIDRef.current);
                momentumIDRef.current = null;
            }
        };

        const beginMomentumTracking = () => {
            cancelMomentumTracking();
            momentumIDRef.current = requestAnimationFrame(momentumLoop);
        };

        const momentumLoop = () => {
            if (!slider) return;
            slider.scrollLeft += velXRef.current;
            velXRef.current *= 0.9;
            if (Math.abs(velXRef.current) > 0.5) {
                momentumIDRef.current = requestAnimationFrame(momentumLoop);
            }
        };

        // اضافه کردن رویدادها به slider
        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('click', handleClick);
        slider.addEventListener('wheel', handleWheel);

        // تمیزکاری: حذف رویدادها هنگام unmount
        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
            slider.removeEventListener('click', handleClick);
            slider.removeEventListener('wheel', handleWheel);
        };
    }, []); // آرایه وابستگی خالی، یعنی فقط یک بار اجرا شود

    return ref;
}

export default useSwipeScroll;