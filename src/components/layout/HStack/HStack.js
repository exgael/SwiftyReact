import {stackDefaultProps, stackPropTypes} from "../../core/View/viewPropTypes.js";
import ContainerView from "../../core/View/ContainerView.js";

/**
 * HStack component is a horizontal stack layout component
 */
const HStack = ({children, ...props}) => ContainerView({
    children,
    direction: "row",
    ...props
});

HStack.propTypes = stackPropTypes;
HStack.defaultProps = stackDefaultProps;

export default HStack;