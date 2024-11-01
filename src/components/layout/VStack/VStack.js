import {stackPropTypes} from "../../core/View/viewPropTypes.js";
import {ContainerView} from "../../core/View/index.js";

/**
 * VStack component is a vertical stack layout component
 */
const VStack = ({children, ...props}) => ContainerView({
    children,
    axis: "column",
    ...props
});

VStack.propTypes = stackPropTypes;

export default VStack;