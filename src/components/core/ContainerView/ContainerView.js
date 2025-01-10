import React, { useContext } from 'react';
import { ViewContext } from '../View/ViewContext.js';
import { useViewModel } from '../View/ViewModel.js';
import { internal_StackViewPropTypes } from "./modifier/index.js";
import { StackContext } from "../../layout/StackContext/index.js";
import {generateStackStyles} from "./style/generateStackStyles.js";

const ContainerView = ({ children, style, ...props }) => {
    const { requestExpansion: requestParentExpansion } = useContext(ViewContext);
    const {
        shouldExpandHorizontally,
        shouldExpandVertically,
        requestExpansion,
    } = useViewModel(requestParentExpansion);

    const genStyle = generateStackStyles(props, shouldExpandHorizontally, shouldExpandVertically);

    // Create container style
    const containerStyle = {
        position: 'relative',
        display: 'flex',
        ...genStyle,
        ...style
    };

    return (
        <StackContext.Provider value={{ axis: props?.axis }}>
            <ViewContext.Provider value={{ requestExpansion }}>
                <div
                    style={containerStyle}
                    onClick={props.onClick}
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave}
                    onTouchStart={props.onTouchStart}
                    onTouchEnd={props.onTouchEnd}
                    id={props.id}
                    ref={props.setRef}
                    {...props.custom} // Spread any custom attributes
                >
                    {children}
                </div>
            </ViewContext.Provider>
        </StackContext.Provider>
    );
};

ContainerView.propTypes = internal_StackViewPropTypes;

export default ContainerView;