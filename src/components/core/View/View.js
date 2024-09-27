import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { crossAxisAlignmentMapping, mainAxisAlignmentMapping } from '../../../utils/alignmentMapping';
import { ViewContext } from './ViewContext';
import { useViewModel } from './ViewModel';

const listColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

/**
 * View component as a neutral container that propagates expansion requests
 * @param {ViewProps} props
 * @returns {React.ReactElement}
 */
const View = ({
                  children,
                  spacing = '0px',
                  alignment = 'center',
                  justify = 'center',
                  direction = 'column',
                  style = {},
                  margin = {},
                  padding = {},
                  minSize,
                  maxWidth,
                  maxHeight,
                  debugBorder,
                  border,
                  ...props
              }) => {
    const { requestExpansionCallBack } = useContext(ViewContext);
    const {
        shouldExpandHorizontally,
        shouldExpandVertically,
        requestExpand,
    } = useViewModel(requestExpansionCallBack);

    const baseStyle = {
        display: 'flex',
        flexDirection: direction,
        gap: spacing,
        alignItems: crossAxisAlignmentMapping[alignment] || alignment,
        justifyContent: mainAxisAlignmentMapping[justify] || justify,
        width: shouldExpandHorizontally ? '100%' : 'auto',
        height: shouldExpandVertically ? '100%' : 'auto',
        minWidth: direction === 'row' ? minSize : 'auto',
        minHeight: direction === 'column' ? minSize : 'auto',
        maxWidth: maxWidth ? `${maxWidth}px` : 'none',
        maxHeight: maxHeight ? `${maxHeight}px` : 'none',
        marginTop: margin.top,
        marginRight: margin.right,
        marginBottom: margin.bottom,
        marginLeft: margin.left,
        paddingTop: padding.top,
        paddingRight: padding.right,
        paddingBottom: padding.bottom,
        paddingLeft: padding.left,
        boxSizing: 'border-box',
        border: border || debugBorder ? `2px solid ${listColors[Math.floor(Math.random() * listColors.length)]}` : 'none',
        ...style,
    };

    return (
        <ViewContext.Provider value={{ requestExpand }}>
            <div style={baseStyle} {...props}>
                {children}
            </div>
        </ViewContext.Provider>
    );
};

View.propTypes = {
    children: PropTypes.node,
    spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    alignment: PropTypes.oneOf(['leading', 'center', 'trailing', 'top', 'bottom', 'stretch']),
    justify: PropTypes.oneOf(['leading', 'center', 'trailing', 'spaceBetween', 'spaceAround', 'spaceEvenly']),
    direction: PropTypes.oneOf(['row', 'column']),
    style: PropTypes.object,
    margin: PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    padding: PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    minSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    debugBorder: PropTypes.bool,
    border: PropTypes.string,
};

export default View;