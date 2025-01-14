import {CSSProperties} from 'react';
import {Alignment, Axis} from "../modifier";

export interface InternalLayoutStyles extends Pick<CSSProperties,
    'position' | 'display' | 'flexDirection' | 'gap' | 'justifyContent' | 'alignItems'> {
}

export function getFlexAlignment(
    alignment: Alignment
): 'flex-start' | 'flex-end' | 'center' {
    switch (alignment) {
        case 'leading':
        case 'top':
            return 'flex-start';
        case 'trailing':
        case 'bottom':
            return 'flex-end';
        case 'center':
            return 'center';
        default:
            return 'center'; // Default alignment
    }
}

export function convertInternalLayoutPropsToStyles(
    axis: Axis,
    alignment: Alignment,
    spacing: number
): InternalLayoutStyles {

    return {
        display: 'flex',
        position: 'relative',
        flexDirection: axis,
        justifyContent: getFlexAlignment(alignment),
        gap: spacing ? `${spacing}px` : undefined,
        alignItems: 'center', // Default is center; not overridable at layout level.
    };
}
