import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import propTypes from 'prop-types';

const accentColor = '#73AE57';

// the tint color is always respected and not overridden by the theme
const tints = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
};

// Define a default theme that mirrors SwiftUI's light and dark themes
const lightTheme = {
    primaryColor: '#007bff',
    secondaryColor: '#8c999b',
    backgroundColor: '#f8f9fa',
    backgroundEmphasisColor: '#e5e5e5',
    foregroundColor: '#000000',
    accentColor: accentColor,
    borderColor: '#e5e5e5',
    primaryButtonColor: '#007bff',
    secondaryButtonColor: '#6c757d',
    primaryTextColor: '#000000',
    secondaryTextColor: '#6c757d',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    opacity: 1,
    ...tints,
};

const darkTheme = {
    primaryColor: '#0a84ff',
    secondaryColor: '#8e8e93',
    backgroundColor: '#1e1e1e',
    backgroundEmphasisColor: '#312f2f',
    foregroundColor: '#ffffff',
    accentColor: accentColor,
    borderColor: '#2c2c2e',
    primaryButtonColor: '#0a84ff',
    secondaryButtonColor: '#8e8e93',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#8e8e93',
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 1,
    ...tints,
};

export const opacifier = (color, opacity) => {
    let rgb;

    // Check if the color is in hex format
    if (color.startsWith('#')) {
        // Convert hex to rgb
        rgb = hexToRgb(color);
    } else {
        // Extract the rgb values from the input string if it's already in rgb format
        rgb = color.match(/\d+/g);
    }

    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
};

// Helper function to convert hex to rgb
const hexToRgb = hex => {
    // Remove the leading # if it's present
    hex = hex.replace(/^#/, '');

    // Handle shorthand hex (#abc)
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map(hexChar => hexChar + hexChar)
            .join('');
    }

    const int = parseInt(hex, 16);

    // Extract the rgb components
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;

    return [r, g, b];
};

const getTypography = textSize => {
    const scale = textSize === 'small' ? 0.85 : textSize === 'large' ? 1.15 : 1;
    return {
        body: { fontSize: `${16 * scale}px`, fontWeight: '400' },
        headline: { fontSize: `${17 * scale}px`, fontWeight: '600' },
        largeTitle: { fontSize: `${34 * scale}px`, fontWeight: '700' },
        title: { fontSize: `${28 * scale}px`, fontWeight: '700' },
        subheadline: { fontSize: `${15 * scale}px`, fontWeight: '500' },
        footnote: { fontSize: `${13 * scale}px`, fontWeight: '400' },
        caption: { fontSize: `${12 * scale}px`, fontWeight: '400' },
    };
};

export const EnvironmentContext = createContext({
    dismiss: id => {}, // Function to dismiss an overlay by ID
    presentModal: () => {}, // Present a modal
    presentAlert: () => {}, // Present an alert
    isOverlayVisible: id => true, // Check visibility
    isCompact: false, // Responsive state (compact or regular)
    language: 'en', // Default language
    textSize: 'medium', // Font size: small, medium, large
    prefersReducedMotion: false, // For accessibility (reduced motion)
    triggerHapticFeedback: () => {}, // Function for haptic feedback
    theme: lightTheme, // Default to light theme
    typography: {}, // Add typography styles
    setTheme: () => {}, // Function to toggle between themes
});

export const useEnvironment = () => {
    return useContext(EnvironmentContext);
};

// Extended EnvironmentProvider
export const EnvironmentProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [textSize, setTextSize] = useState('medium');
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isCompact, setIsCompact] = useState(window.innerWidth < 600);
    const [overlays, setOverlays] = useState({}); // Manage visibility of different overlays
    const overlayCounter = useRef(0);
    const [isDarkMode, setIsDarkMode] = useState(false); // Track theme mode (light/dark)
    const [theme, setTheme] = useState(lightTheme); // Default theme
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isPWA, setIsPWA] = useState(false);

    // Automatically switch to dark mode based on user preference or manual toggle
    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setIsDarkMode(matchMedia.matches);
        matchMedia.addEventListener('change', handleChange);
        handleChange(); // Set initial state
        return () => matchMedia.removeEventListener('change', handleChange);
    }, []);

    // Trigger haptic feedback
    const triggerHapticFeedback = () => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(50); // Simple vibration for 50ms
        }
    };

    // Detect window resize to change the compact state
    useEffect(() => {
        const handleResize = () => {
            setIsCompact(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Detect user preference for reduced motion (accessibility setting)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', event =>
            setPrefersReducedMotion(event.matches),
        );
        return () =>
            mediaQuery.removeEventListener('change', event =>
                setPrefersReducedMotion(event.matches),
            );
    }, []);

    // Register overlay
    const registerOverlay = useCallback(() => {
        const id = overlayCounter.current++;
        setOverlays(prevOverlays => {
            if (prevOverlays[id]) return prevOverlays;
            return { ...prevOverlays, [id]: { visible: true } };
        });
        return id;
    }, []);

    // Dismiss overlay
    const dismiss = id => {
        setOverlays(prevOverlays => {
            if (!prevOverlays[id]?.visible) return prevOverlays;
            return { ...prevOverlays, [id]: { ...prevOverlays[id], visible: false } };
        });
    };


    // Present modal
    const presentModal = useCallback(content => {
        const id = registerOverlay();
        setOverlays(prevOverlays => ({
            ...prevOverlays,
            [id]: { visible: true, type: 'modal', content },
        }));
    }, [registerOverlay]);

    // Present alert
    const presentAlert = useCallback(message => {
        const id = registerOverlay();
        setOverlays(prevOverlays => ({
            ...prevOverlays,
            [id]: { visible: true, type: 'alert', message },
        }));
    }, [registerOverlay]);

    // Update theme based on dark mode
    useEffect(() => {
        setTheme(isDarkMode ? darkTheme : lightTheme);
    }, [isDarkMode]);

    // Toggle theme manually
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prevMode => !prevMode);
    }, []);

    const isOverlayVisible = id => overlays[id]?.visible;

    const typography = getTypography(textSize);
    const colorScheme = isDarkMode ? 'dark' : 'light';
    const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Check if the app is installed as a PWA
        const isStandalonePWA = () => {
            return (
                typeof window !== 'undefined' &&
                window.matchMedia('(display-mode: standalone)').matches
            );
        };

        setIsPWA(isStandalonePWA());

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <EnvironmentContext.Provider
            value={{
                isCompact,
                dismiss,
                colorScheme,
                presentModal,
                presentAlert,
                registerOverlay,
                isOverlayVisible,
                language,
                textSize,
                prefersReducedMotion,
                triggerHapticFeedback,
                theme,
                typography,
                toggleTheme,
                statusBarStyle,
                isMobile: windowWidth < 768,
                isTablet: windowWidth >= 768 && windowWidth < 1024,
                isDesktop: windowWidth >= 1024,
                isPWA,
            }}
        >
            {children}
        </EnvironmentContext.Provider>
    );
};

EnvironmentProvider.propTypes = {
    children: propTypes.node,
};

export default EnvironmentProvider;