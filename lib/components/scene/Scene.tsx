import React, {createContext, CSSProperties, ReactNode, useContext} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {SceneSetup} from './SceneSetup';
import {ContainerView} from '../core';
import {EnvironmentProvider} from '../../contexts/EnvironmentContext';

interface SafeArea {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface SceneProps {
    children: ReactNode;
    safeArea?: SafeArea;
    style?: CSSProperties;

    [key: string]: any; // For additional props such as data attributes
}

const SceneContext = createContext<{ safeArea: SafeArea }>({
    safeArea: {top: 0, right: 0, bottom: 0, left: 0},
});

export const useSceneContext = () => useContext(SceneContext);

export const Scene: React.FC<SceneProps> = ({
                                                children,
                                                safeArea = {top: 0, right: 0, bottom: 0, left: 0},
                                                style = {},
                                                ...props
                                            }) => {
    const sceneStyle: CSSProperties = {
        overflow: 'auto',
        paddingTop: `${safeArea.top}px`,
        paddingRight: `${safeArea.right}px`,
        paddingBottom: `${safeArea.bottom}px`,
        paddingLeft: `${safeArea.left}px`,
        height: '100vh',
        width: '100vw',
        ...style,
    };

    return (
        <BrowserRouter>
            <SceneContext.Provider value={{safeArea}}>
                <EnvironmentProvider>
                    <SceneSetup>
                        <ContainerView
                            // Bedrock
                            axis={"column"}
                            alignment={"center"}
                            spacing={0}
                            // Styling
                            style={sceneStyle}
                            {...props}
                        >
                            {children}
                        </ContainerView>
                    </SceneSetup>
                </EnvironmentProvider>
            </SceneContext.Provider>
        </BrowserRouter>
    );
};