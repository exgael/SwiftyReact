import {ContainerView, stackPropTypes} from "../../core";

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