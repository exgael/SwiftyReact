import React, {useEffect} from 'react';
import {useViewContext} from "../../core/ViewContext.ts";

interface SpacerProps {
    debugBorder?: boolean;
    minSize?: string;
}

export const Spacer: React.FC<SpacerProps> = ({
                                                  debugBorder = false,
                                                  minSize = '0px',
                                              }) => {
    const {expansionAxis, requestExpansion} = useViewContext();

    useEffect(() => {
        // Spacer requests expansion in its stack’s direction (horizontal or vertical)
        requestExpansion(expansionAxis);
    }, [expansionAxis, requestExpansion]);

    const viewStyle: React.CSSProperties = {
        position: 'relative',
        boxSizing: 'border-box',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: expansionAxis === 'row' ? minSize : 'auto',
        minHeight: expansionAxis === 'column' ? minSize : 'auto',
        border: debugBorder ? '1px solid red' : undefined,
    };

    return <div style={viewStyle}/>;
};
