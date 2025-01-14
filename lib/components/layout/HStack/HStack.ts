import {ContainerView} from "../../core";
import {StackViewProps} from "../VStack/VStack.ts";

/**
 * HStack component is a horizontal stack layout component
 */
const HStack = (
    props: StackViewProps
) => ContainerView({
    axis: "row",
    alignment: "center",
    spacing: 0,
    ...props
});

export default HStack;