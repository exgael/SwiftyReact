import PropTypes from 'prop-types';
import {coreModifiersPropTypes} from "../modifiers/index.js";
import {textModifiersPropTypes} from "../modifiers/index.js";
import {internalLayoutModifiersPropTypes, layoutModifiersPropTypes} from "../modifiers/index.js";

const viewWithChildrenPropTypes = {
    ...coreModifiersPropTypes,
    children: PropTypes.node.isRequired,
};

const stackPropTypes= {
    ...viewWithChildrenPropTypes,
    ...layoutModifiersPropTypes
};

const internal_StackViewPropTypes= {
    ...viewWithChildrenPropTypes,
    ...internalLayoutModifiersPropTypes,
};

const textViewPropTypes= {
    ...coreModifiersPropTypes,
    ...textModifiersPropTypes
}

export { stackPropTypes, internal_StackViewPropTypes, textViewPropTypes };
