import React, {ButtonHTMLAttributes, CSSProperties} from 'react';
import {useGeneratedStyles} from "../core/style/useGeneratedStyles.ts";
import {ViewContext} from '../core/ViewContext.ts';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const {
        children,
        style = {},
        disabled = false,
        ...restProps
    } = props;

    // Ensure only a single child is passed ( Multiple child is not a button's job )
    if (React.Children.count(children) !== 1) {
        throw new Error("Button component must have exactly one child element.");
    }

    const {containerStyle, requestExpansion} = useGeneratedStyles({
        style,
        alignment: 'center',
        spacing: 0,
        axis: 'row', // Buttons are usually laid out horizontally
    });

    const buttonStyle: CSSProperties = {
        ...containerStyle,
        cursor: disabled ? 'not-allowed' : style?.cursor ?? 'pointer',
        opacity: disabled ? 0.6 : 1,
    };

    return (
        <ViewContext.Provider value={{expansionAxis: "column", requestExpansion}}>
            <button
                style={buttonStyle}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        </ViewContext.Provider>
    );
};
