import {CSSProperties} from 'react';

export type NonLayoutCSSProperties = Omit<
    CSSProperties,
    | 'display'
    | 'flexDirection'
    | 'justifyContent'
    | 'alignItems'
    | 'alignContent'
    | 'flexWrap'
    | 'gridTemplateColumns'
    | 'gridTemplateRows'
    | 'gridColumn'
    | 'gridRow'
    | 'gap'
    | 'rowGap'
    | 'columnGap'
    | 'float'
    | 'clear'
    | 'position'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'zIndex'
>;