import {CSSProperties} from 'react';
import {useViewContext, useViewModel} from "../ViewContext";
import {generateStackStyles} from "./generateStackStyles";
import {Alignment, Axis} from "../modifier";

interface UseGeneratedStylesParams {
    style: CSSProperties;
    alignment: Alignment;
    spacing: number;
    axis: Axis;
}

export const useGeneratedStyles = ({style, alignment, spacing, axis}: UseGeneratedStylesParams) => {
    const {requestExpansion: requestParentExpansion} = useViewContext()

    const {shouldExpandHorizontally, shouldExpandVertically, requestExpansion} = useViewModel(requestParentExpansion);

    const containerStyle: CSSProperties = generateStackStyles(
        style,
        alignment,
        spacing,
        axis,
        shouldExpandHorizontally,
        shouldExpandVertically
    );

    return {containerStyle, requestExpansion};
};
