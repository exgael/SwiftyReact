import {ContainerView, StackProps} from "../../core";
import {HTMLAttributes} from "react";

export interface StackViewProps extends StackProps, HTMLAttributes<HTMLDivElement> {
}

/**
 * VStack component is a vertical stack layout component
 */
const VStack = (
    props: StackViewProps
) => ContainerView({
    axis: "column",
    alignment: "center",
    spacing: 0,
    ...props
});

export default VStack;