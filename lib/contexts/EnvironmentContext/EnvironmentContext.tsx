import React, {createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState,} from 'react';

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

// Theme types
interface Theme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    backgroundEmphasisColor: string;
    foregroundColor: string;
    accentColor: string;
    borderColor: string;
    primaryButtonColor: string;
    secondaryButtonColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
    shadowColor: string;
    opacity: number;

    [key: string]: string | number;
}

const lightTheme: Theme = {
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

const darkTheme: Theme = {
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

interface Typography {
    body: FontStyle;
    headline: FontStyle;
    largeTitle: FontStyle;
    title: FontStyle;
    subheadline: FontStyle;
    footnote: FontStyle;
    caption: FontStyle;
}

interface FontStyle {
    fontSize: string;
    fontWeight: string;
}


// Helper functions
const hexToRgb = (hex: string): [number, number, number] => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const int = parseInt(hex, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
};

export const opacifier = (color: string, opacity: number): string => {
    // @ts-ignore
    let rgb: RegExpMatchArray | number[] | null = color.startsWith('#')
        ? hexToRgb(color)
        : color.match(/\d+/g)?.map(Number);

    if (!rgb) throw new Error(`Invalid color format: ${color}`);

    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
};

const getTypography = (textSize: 'small' | 'medium' | 'large'): Typography => {
    const scale = textSize === 'small' ? 0.85 : textSize === 'large' ? 1.15 : 1;
    return {
        body: {fontSize: `${16 * scale}px`, fontWeight: '400'},
        headline: {fontSize: `${17 * scale}px`, fontWeight: '600'},
        largeTitle: {fontSize: `${34 * scale}px`, fontWeight: '700'},
        title: {fontSize: `${28 * scale}px`, fontWeight: '700'},
        subheadline: {fontSize: `${15 * scale}px`, fontWeight: '500'},
        footnote: {fontSize: `${13 * scale}px`, fontWeight: '400'},
        caption: {fontSize: `${12 * scale}px`, fontWeight: '400'},
    };
};

interface EnvironmentContextProps {
    dismiss: (id: number) => void;
    presentModal: (content: ReactNode) => void;
    presentAlert: (message: string) => void;
    isOverlayVisible: (id: number) => boolean;
    isCompact: boolean;
    language: string;
    textSize: 'small' | 'medium' | 'large';
    prefersReducedMotion: boolean;
    triggerHapticFeedback: () => void;
    theme: Theme;
    colorScheme: "light" | "dark";
    typography: Typography;
    toggleTheme: () => void;
    statusBarStyle: string;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPWA: boolean;
}

const defaultContext: EnvironmentContextProps = {
    dismiss: () => {
    },
    presentModal: () => {
    },
    presentAlert: () => {
    },
    isOverlayVisible: () => false,
    isCompact: false,
    language: 'en',
    textSize: 'medium',
    prefersReducedMotion: false,
    triggerHapticFeedback: () => {
    },
    theme: lightTheme,
    colorScheme: "light",
    typography: getTypography('medium'),
    toggleTheme: () => {
    },
    statusBarStyle: 'dark-content',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isPWA: false,
};

export const EnvironmentContext = createContext<EnvironmentContextProps>(defaultContext);

export const useEnvironment = (): EnvironmentContextProps => {
    return useContext(EnvironmentContext);
};

interface EnvironmentProviderProps {
    children: ReactNode;
}


// Extended EnvironmentProvider
export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({children}) => {
    const [language, _setLanguage] = useState<string>('en');
    const [textSize, _setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
    const [isCompact, setIsCompact] = useState<boolean>(window.innerWidth < 600);
    const [overlays, setOverlays] = useState<Record<number, {
        visible: boolean;
        type?: string;
        content?: ReactNode;
        message?: string
    }>>({});
    const overlayCounter = useRef<number>(0);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [theme, setTheme] = useState<Theme>(lightTheme);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [isPWA, setIsPWA] = useState<boolean>(false);

    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setIsDarkMode(matchMedia.matches);
        matchMedia.addEventListener('change', handleChange);
        handleChange();
        return () => matchMedia.removeEventListener('change', handleChange);
    }, []);

    const triggerHapticFeedback = () => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    };

    useEffect(() => {
        const handleResize = () => setIsCompact(window.innerWidth < 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', event => setPrefersReducedMotion(event.matches));
        return () => mediaQuery.removeEventListener('change', event => setPrefersReducedMotion(event.matches));
    }, []);

    const registerOverlay = useCallback((): number => {
        const id = overlayCounter.current++;
        setOverlays(prevOverlays => ({...prevOverlays, [id]: {visible: true}}));
        return id;
    }, []);

    const dismiss = (id: number) => {
        setOverlays(prevOverlays => {
            if (!prevOverlays[id]?.visible) return prevOverlays;
            return {...prevOverlays, [id]: {...prevOverlays[id], visible: false}};
        });
    };

    const presentModal = useCallback((content: ReactNode) => {
        const id = registerOverlay();
        setOverlays(prevOverlays => ({
            ...prevOverlays,
            [id]: {visible: true, type: 'modal', content},
        }));
    }, [registerOverlay]);

    const presentAlert = useCallback((message: string) => {
        const id = registerOverlay();
        setOverlays(prevOverlays => ({
            ...prevOverlays,
            [id]: {visible: true, type: 'alert', message},
        }));
    }, [registerOverlay]);

    useEffect(() => {
        setTheme(isDarkMode ? darkTheme : lightTheme);
    }, [isDarkMode]);

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prevMode => !prevMode);
    }, []);

    const isOverlayVisible = (id: number) => overlays[id]?.visible ?? false;

    const typography = getTypography(textSize);
    const colorScheme = isDarkMode ? 'dark' : 'light';
    const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        const isStandalonePWA = () => window.matchMedia('(display-mode: standalone)').matches;
        setIsPWA(isStandalonePWA());

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <EnvironmentContext.Provider
            value={{
                isCompact,
                dismiss,
                colorScheme,
                presentModal,
                presentAlert,
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
