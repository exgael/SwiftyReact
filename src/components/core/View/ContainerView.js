import React, { useContext } from 'react';
import { ViewContext } from './ViewContext.js';
import { useViewModel } from './ViewModel.js';
import { generateStackStyles } from "./styleUtils.js";
import { stackViewPropTypes } from "./viewPropTypes.js";
import { StackContext } from "../../layout/StackContext/index.js";

const ContainerView = ({ children, ...props }) => {
    const { requestExpansion: requestParentExpansion } = useContext(ViewContext);
    const {
        shouldExpandHorizontally,
        shouldExpandVertically,
        requestExpansion,
    } = useViewModel(requestParentExpansion);

    const genStyle = generateStackStyles(props, shouldExpandHorizontally, shouldExpandVertically);

    // Ensure the container has position: 'relative'
    const containerStyle = {
        position: 'relative',
        ...genStyle,
    };

    return (
        <StackContext.Provider value={{ direction: props?.direction }}>
            <ViewContext.Provider value={{ requestExpansion }}>
                <div style={containerStyle}>
                    {children}
                </div>
            </ViewContext.Provider>
        </StackContext.Provider>
    );
};

ContainerView.propTypes = stackViewPropTypes;

export default ContainerView;