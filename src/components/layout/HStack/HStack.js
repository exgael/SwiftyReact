import {stackPropTypes} from "../../core/View/viewPropTypes.js";
import {ContainerView} from "../../core/View/index.js";

/**
 * HStack component is a horizontal stack layout component
 */
const HStack = ({children, ...props}) => ContainerView({
    children,
    axis: "row",
    ...props
});

HStack.propTypes = stackPropTypes;

export default HStack;