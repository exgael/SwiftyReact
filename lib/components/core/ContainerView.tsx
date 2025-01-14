import React, {HTMLAttributes} from 'react';
import {Alignment, Axis} from "./modifier";
import {useGeneratedStyles} from "./style/useGeneratedStyles.ts";
import {ViewContext} from './ViewContext.ts';

export interface ContainerViewProps extends HTMLAttributes<HTMLDivElement> {
    axis?: Axis; // Layout direction: "row" or "column"
    alignment?: Alignment;
    spacing?: number; // Gap between children
}

export const ContainerView: React.FC<ContainerViewProps> = ({
                                                                axis = 'column',
                                                                alignment = 'center',
                                                                spacing = 0,
                                                                style = {},
                                                                children,
                                                                ...props
                                                            }) => {

    const {containerStyle, requestExpansion} = useGeneratedStyles({
        style,
        alignment,
        spacing,
        axis,
    });

    return (
        <ViewContext.Provider value={{expansionAxis: axis, requestExpansion}}>
            <div style={containerStyle} {...props}>
                {children}
            </div>
        </ViewContext.Provider>
    );
};