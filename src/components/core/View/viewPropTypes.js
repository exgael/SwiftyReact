import PropTypes from 'prop-types';

export const viewPropTypes = {
    // Frame Modifier
    frame: PropTypes.shape({
        width:  PropTypes.string,
        height: PropTypes.string,
        minWidth: PropTypes.string,
        maxWidth: PropTypes.string,
        minHeight: PropTypes.string,
        maxHeight: PropTypes.string,
        alignment: PropTypes.oneOf(['leading', 'trailing', 'center', 'top', 'bottom']),
    }),

    // Padding and Margin
    padding: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            top: PropTypes.string,
            right: PropTypes.string,
            bottom: PropTypes.string,
            left: PropTypes.string,
        }),
    ]),

    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            top: PropTypes.string,
            right: PropTypes.string,
            bottom: PropTypes.string,
            left: PropTypes.string,
        }),
    ]),

    // Visual Modifiers
    backgroundColor:  PropTypes.string,
    foregroundColor: PropTypes.string,

    border: PropTypes.shape({
        color: PropTypes.string,
        width: PropTypes.string,
        style: PropTypes.string,
    }),
    debugBorder: PropTypes.bool,
    cornerRadius: PropTypes.string,

    shadow: PropTypes.shape({
        color: PropTypes.string,
        offset: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        opacity: PropTypes.number,
        radius: PropTypes.number,
    }),

    opacity: PropTypes.number,

    // Accessibility Modifiers
    accessibilityLabel: PropTypes.string,
    accessibilityHint: PropTypes.string,

    // Children
    children: PropTypes.node,
};

export const viewWithChildrenPropTypes = {
    ...viewPropTypes,
    children: PropTypes.node,
};

export const stackPropTypes = {
    ...viewWithChildrenPropTypes,
    alignment: PropTypes.oneOf(['leading', 'center', 'trailing', 'stretch']),
    distribution: PropTypes.oneOf(['leading', 'center', 'trailing', 'spaceBetween', 'spaceAround', 'spaceEvenly']),
    spacing: PropTypes.string,
};

export const viewDefaultProps = {
    opacity: 1,
    debugBorder: false
};

export const stackDefaultProps = {
    ...viewDefaultProps,
    alignment: 'center',
    distribution: 'center',
    spacing: 0
};

export const stackViewPropTypes = {
    ...stackPropTypes,
    direction: PropTypes.oneOf(['row', 'column']),
    style: PropTypes.object,
};


