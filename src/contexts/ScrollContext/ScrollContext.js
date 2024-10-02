import React, { createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';

// Create the context
export const ScrollContext = createContext();

// Scroll provider component
export const ScrollProvider = ({ children, scrollRef }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

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
export const useScroll = () => React.useContext(ScrollContext);

// Prop types
ScrollProvider.propTypes = {
    children: propTypes.node.isRequired,
    scrollRef: propTypes.object.isRequired,
};