import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { crossAxisAlignmentMapping, mainAxisAlignmentMapping } from '../../../utils/index.js';
import { ViewContext } from './ViewContext.js';
import { useViewModel } from './ViewModel.js';

const listColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

/**
 * A neutral container component that handles layout and propagates expansion requests.
 * It uses the Flexbox model to align, justify, and distribute children within the layout.
 * The View component also communicates layout expansion requests to its parent through the ViewContext.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} [props.children] - The child elements to be rendered within the View.
 * @param {(number|string)} [props.spacing='0px'] - The space between child elements, can be a number or string.
 * @param {'leading'|'center'|'trailing'|'top'|'bottom'|'stretch'} [props.alignment='center'] - Cross-axis alignment for children.
 * @param {'leading'|'center'|'trailing'|'spaceBetween'|'spaceAround'|'spaceEvenly'} [props.distribution='center'] - Main-axis distribution of children.
 * @param {'row'|'column'} [props.direction='column'] - Flexbox direction for arranging children. Either 'row' or 'column'.
 * @param {Object} [props.style={}] - Additional inline styles applied to the View.
 * @param {Object} [props.margin={}] - Margin object defining top, right, bottom, and left margins.
 * @param {(string|number)} [props.margin.top] - Top margin value.
 * @param {(string|number)} [props.margin.right] - Right margin value.
 * @param {(string|number)} [props.margin.bottom] - Bottom margin value.
 * @param {(string|number)} [props.margin.left] - Left margin value.
 * @param {Object} [props.padding={}] - Padding object defining top, right, bottom, and left paddings.
 * @param {(string|number)} [props.padding.top] - Top padding value.
 * @param {(string|number)} [props.padding.right] - Right padding value.
 * @param {(string|number)} [props.padding.bottom] - Bottom padding value.
 * @param {(string|number)} [props.padding.left] - Left padding value.
 * @param {(string|number)} [props.minSize] - Minimum size for the view in either width (if direction is 'row') or height (if direction is 'column').
 * @param {number} [props.maxWidth] - Maximum width of the view (in pixels).
 * @param {number} [props.maxHeight] - Maximum height of the view (in pixels).
 * @param {boolean} [props.debugBorder=false] - If true, the view will render with a random border color for debugging layout.
 * @param {string} [props.border] - Custom border style to apply to the view.
 * @returns {React.ReactElement} The rendered View component.
 */
const View = ({
                  children,
                  spacing = '0px',
                  alignment = 'center',
                  distribution = 'center',
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
    const { requestExpansion: requestParentExpansion } = useContext(ViewContext);
    const {
        shouldExpandHorizontally,
        shouldExpandVertically,
        requestExpansion,
    } = useViewModel(requestParentExpansion);

    const baseStyle = {
        display: 'flex',
        flexDirection: direction,
        gap: spacing,
        alignItems: crossAxisAlignmentMapping[alignment] || alignment,
        justifyContent: mainAxisAlignmentMapping[distribution] || distribution,
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
        <ViewContext.Provider value={{ requestExpansion }}>
            <div style={baseStyle} {...props}>
                {children}
            </div>
        </ViewContext.Provider>
    );
};

View.propTypes = {
    /** Child elements to be rendered within the View. */
    children: PropTypes.node,
    /** Space between child elements, can be a number or string. */
    spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Cross-axis alignment for children. */
    alignment: PropTypes.oneOf(['leading', 'center', 'trailing', 'top', 'bottom', 'stretch']),
    /** Main-axis distribution of children. */
    distribution: PropTypes.oneOf(['leading', 'center', 'trailing', 'spaceBetween', 'spaceAround', 'spaceEvenly']),
    /** Flexbox direction for arranging children. Either 'row' or 'column'. */
    direction: PropTypes.oneOf(['row', 'column']),
    /** Additional inline styles applied to the View. */
    style: PropTypes.object,
    /** Margin object defining top, right, bottom, and left margins. */
    margin: PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    /** Padding object defining top, right, bottom, and left paddings. */
    padding: PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    /** Minimum size for the view in either width (if direction is 'row') or height (if direction is 'column'). */
    minSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Maximum width of the view (in pixels). */
    maxWidth: PropTypes.number,
    /** Maximum height of the view (in pixels). */
    maxHeight: PropTypes.number,
    /** If true, the view will render with a random border color for debugging layout. */
    debugBorder: PropTypes.bool,
    /** Custom border style to apply to the view. */
    border: PropTypes.string,
};

export default View;