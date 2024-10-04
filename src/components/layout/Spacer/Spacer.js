import React from 'react';
import {useContext} from "react";
import {StackContext} from "../StackContext/index.js";
import {ViewContext} from "../../core/View/ViewContext.js";
import PropTypes from "prop-types";

const Spacer = ({debugBorder, minSize = '0px'}) => {
    const { direction } = useContext(StackContext);
    const { requestExpansion } = useContext(ViewContext);

    React.useEffect(() => {
        // Spacer requests expansion in its stack’s direction (horizontal or vertical)
        requestExpansion(direction);
    }, [direction, requestExpansion]);

    const viewStyle = {
        position: 'relative',
        boxSizing: 'border-box',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: direction === 'row' ? minSize : 'auto',
        minHeight: direction === 'column' ? minSize : 'auto',
        border: debugBorder ? '1px solid red' : undefined,
    };

    return (
        <div style={viewStyle} />
    );
};

Spacer.propTypes = {
    debugBorder: PropTypes.bool,
    minSize: PropTypes.string
};

export default Spacer;
