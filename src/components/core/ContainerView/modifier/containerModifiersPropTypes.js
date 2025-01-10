import PropTypes from 'prop-types';
import {coreModifiersPropTypes} from "../../modifiers/index.js";


/**
 * **alignment**: Defines the alignment of children along the cross axis (matching VStack/HStack alignment).
 * Accepts:
 * - 'leading', 'trailing', 'center', 'top', 'bottom'
 */
const alignment = PropTypes.oneOf(['leading', 'trailing', 'center', 'top', 'bottom']);

/**
 * **spacing**: Specifies the space between children in the stack.
 * Accepts:
 * - Number (pixels)
 */
const spacing = PropTypes.number;

/**
 * **axis**: Specifies stack layout direction.
 * Accepts:
 * - 'horizontal' or 'vertical'
 */
const axis = PropTypes.oneOf(['row', 'column']);

/**
 * PropTypes definitions for layout-specific modifiers. These modifiers can be applied to text components to control layout.
 */
const containerModifiersPropTypes = {
    alignment,
    spacing,
};

const internalLayoutModifiersPropTypes = {
    alignment,
    spacing,
    axis,
    style: PropTypes.object,
}

export const stackPropTypes= {
    children: PropTypes.node.isRequired,
    ...coreModifiersPropTypes,
    ...containerModifiersPropTypes
};

export const internal_StackViewPropTypes= {
    children: PropTypes.node.isRequired,
    ...coreModifiersPropTypes,
    ...internalLayoutModifiersPropTypes,
};