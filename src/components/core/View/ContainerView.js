import React, { useContext } from 'react';
import { ViewContext } from './ViewContext.js';
import { useViewModel } from './ViewModel.js';
import { generateStackStyles } from "./styleUtils.js";
import { stackDefaultProps, stackViewPropTypes } from "./viewPropTypes.js";

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
        <ViewContext.Provider value={{ direction: props?.direction, requestExpansion }}>
            <div style={containerStyle}>
                {children}
            </div>
        </ViewContext.Provider>
    );
};

ContainerView.propTypes = stackViewPropTypes;
ContainerView.defaultProps = stackDefaultProps;

export default ContainerView;