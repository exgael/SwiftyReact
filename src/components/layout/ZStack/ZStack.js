import React from 'react';
import {StackContext} from "../StackContext/index.js";
import propTypes from 'prop-types';
import {ContainerView} from "../../core/index.js";

const ZStack = ({
                    debugBorder,
                    alignment = 'center',
                    children,
                    style = {},
                    ...props
                }) => {
    // Define alignment for stacking elements
    const justifyContent = alignment === 'center' ? 'center' : alignment;
    const alignItems = alignment === 'center' ? 'center' : alignment;

    return (
        <StackContext.Provider value={{ direction: 'z' }}>
            <ContainerView
                debugBorder={debugBorder}
                style={{
                    position: 'relative', // Allow children to stack on top of each other
                    display: 'flex',
                    alignItems: alignItems,
                    justifyContent: justifyContent,
                    ...style,
                }}
                {...props}
            >
                {React.Children.map(children, (child, index) => (
                    <ContainerView
                        key={index}
                        style={{
                            position: index === 0 ? 'relative' : 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: index === 0 ? 'auto' : 'none',  // Optional for interactive handling
                        }}
                    >
                        {child}
                    </ContainerView>
                ))}
            </ContainerView>
        </StackContext.Provider>
    );
};

ZStack.propTypes = {
    debugBorder: propTypes.bool,
    alignment: propTypes.string,
    children: propTypes.node,
    style: propTypes.object,
};

export default ZStack;