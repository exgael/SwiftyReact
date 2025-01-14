import React, {ReactNode, useEffect} from 'react';
import {useEnvironment} from '../../contexts';

interface SceneSetupProps {
    children: ReactNode;
}

export const SceneSetup: React.FC<SceneSetupProps> = ({children}) => {
    const {theme} = useEnvironment();

    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.height = '100vh';
        document.body.style.width = '100vw';
        document.body.style.overflow = 'auto';
        document.documentElement.style.height = '100%';
        document.documentElement.style.width = '100%';
        document.body.style.backgroundColor = theme.backgroundColor;
        document.body.style.color = theme.primaryTextColor;

        return () => {
            // Cleanup styles
            document.body.style.removeProperty('margin');
            document.body.style.removeProperty('padding');
            document.body.style.removeProperty('height');
            document.body.style.removeProperty('width');
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('background-color');
            document.body.style.removeProperty('color');
            document.documentElement.style.removeProperty('height');
            document.documentElement.style.removeProperty('width');
        };
    }, [theme]);

    return <div>{children}</div>;
};
