import React, {CSSProperties} from 'react';
import {Link, LinkProps} from 'react-router-dom';
import {ViewContext} from '../core/ViewContext';
import {useGeneratedStyles} from '../core/style/useGeneratedStyles';

interface NavigationLinkProps extends LinkProps {
    style?: CSSProperties; // Custom inline styles
}

/**
 * NavigationLink component behaves like a SwiftUI-style navigation link.
 * Uses `Link` from `react-router-dom` and wraps with `ViewContext`.
 */
const NavigationLink: React.FC<NavigationLinkProps> = ({
                                                           to,
                                                           children,
                                                           style = {},
                                                           ...restProps
                                                       }) => {
    // Ensure only one child is passed
    if (React.Children.count(children) !== 1) {
        throw new Error("NavigationLink component must have exactly one child element.");
    }

    // Generate styles with the unified context
    const {containerStyle, requestExpansion} = useGeneratedStyles({
        style,
        alignment: 'center',
        spacing: 0,
        axis: 'column',
    });

    return (
        <ViewContext.Provider value={{expansionAxis: 'column', requestExpansion}}>
            <Link
                to={to}
                style={{
                    ...containerStyle,
                    display: 'inline-block',
                    textDecoration: 'none',
                    cursor: 'pointer',
                }}
                {...restProps}
            >
                {children}
            </Link>
        </ViewContext.Provider>
    );
};

export default NavigationLink;
