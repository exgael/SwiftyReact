import {CSSProperties} from 'react';
import {convertInternalLayoutPropsToStyles} from './to_css_layout.ts';
import {Alignment, Axis} from "../modifier";

export const generateStackStyles = (
    // Generic Style
    style: CSSProperties = {},
    // Stack Explicit Properties
    alignment: Alignment,
    spacing: number,
    // Expansion Handling
    expansionAxis: Axis,
    shouldExpandHorizontally: boolean,
    shouldExpandVertically: boolean
): CSSProperties => {

    const {minWidth, minHeight, width, height} = style;

    // Handle Expansion Styling
    if (shouldExpandHorizontally) {
        style.width = width ?? '100%';
    }

    if (shouldExpandVertically) {
        style.height = height ?? '100%';
    }

    style.boxSizing = 'border-box';

    // Build stack-specific styles
    const stackStyles: CSSProperties = {
        ...convertInternalLayoutPropsToStyles(
            expansionAxis,
            alignment,
            spacing,
        ),
        minWidth: expansionAxis === 'row' ? minWidth ?? 'auto' : 'auto',
        minHeight: expansionAxis === 'column' ? minHeight ?? 'auto' : 'auto',
    };

    // Merge
    return {
        ...style,
        ...stackStyles,
    };
};
