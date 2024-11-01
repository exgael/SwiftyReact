import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { SceneSetup } from './SceneSetup';
import EnvironmentProvider from "../../../contexts/EnvironmentContext/EnvironmentContext.js";
import {ContainerView} from "../View/index.js";

const SceneContext = createContext({
    safeArea: { top: 0, right: 0, bottom: 0, left: 0 },
});

export const useSceneContext = () => useContext(SceneContext);

const Scene = ({
                   children,
                   safeArea = { top: 0, right: 0, bottom: 0, left: 0 },
                   style = {},
                   ...props
               }) => {

    const sceneStyle = {
        overflow: 'auto',
        ...style,
    };

    return (
        <SceneContext.Provider value={{ safeArea }}>
            <EnvironmentProvider>
                <SceneSetup>
                    <ContainerView
                        frame={{
                            'height': '100vh',
                            'width': '100%'
                        }}
                        padding={{
                            'paddingTop': safeArea.top,
                            'paddingRight': safeArea.right,
                            'paddingBottom': safeArea.bottom,
                            'paddingLeft': safeArea.left,
                        }}
                        axis={"column"}
                        style={sceneStyle} {...props}
                    >
                        {children}
                    </ContainerView>
                </SceneSetup>
            </EnvironmentProvider>
        </SceneContext.Provider>
    );
};

Scene.propTypes = {
    children: PropTypes.node,
    safeArea: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
    }),
    style: PropTypes.object,
};

export default Scene;
