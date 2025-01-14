import React, {createContext, MutableRefObject, ReactNode, useContext, useEffect, useState} from 'react';

// Create the context
export const ScrollContext = createContext<number>(0);

interface ScrollProviderProps {
    children: ReactNode;
    scrollRef: MutableRefObject<HTMLElement | null>;
}

// Scroll provider component
export const ScrollProvider: React.FC<ScrollProviderProps> = ({children, scrollRef}) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef && scrollRef.current) {
                const scrollPosition = scrollRef.current.scrollTop;
                setScrollPosition(scrollPosition);
                console.log('Current scroll position:', scrollPosition); // Log scroll position to ensure it's firing
            }
        };

        const currentElement = scrollRef?.current;

        if (currentElement) {
            currentElement.addEventListener('scroll', handleScroll);
        }

        // Clean up the event listener on component unmount
        return () => {
            if (currentElement) {
                currentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [scrollRef]);

    return (
        <ScrollContext.Provider value={scrollPosition}>
            {children}
        </ScrollContext.Provider>
    );
};

// Custom hook to consume scroll context
export const useScroll = (): number => useContext(ScrollContext);