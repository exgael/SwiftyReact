import {stackPropTypes} from "../../core/View/viewPropTypes.js";
import ContainerView from "../../core/View/ContainerView.js";

/**
 * VStack component is a vertical stack layout component
 */
const VStack = ({children, ...props}) => ContainerView({
    children,
    direction: "column",
    ...props
});

VStack.propTypes = stackPropTypes;

export default VStack;