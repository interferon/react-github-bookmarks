import { useState, useEffect, useRef } from 'react';

export const useComponentVisible = (initialIsVisible: boolean)
    : {ref: React.MutableRefObject<any>, isComponentVisible: boolean, setIsComponentVisible: (a: boolean) => void} => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<any>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (ref && ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}