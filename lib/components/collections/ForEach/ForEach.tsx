import React, {CSSProperties, memo, ReactNode} from 'react';

const generateObjectHash = (item: any): number => {
    // Simple hash function for basic purposes
    return JSON.stringify(item)
        .split('')
        .reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
};

interface ForEachProps<T> {
    data: T[];
    viewBuilder: (item: T, index: number) => ReactNode;
    style?: CSSProperties;
    events?: Record<string, any>;
}

/**
 * ForEach component
 * Renders a list of items using a custom viewBuilder.
 */
export const ForEach = memo(<T, >({data, viewBuilder, style = {}, events = {}}: ForEachProps<T>) => {
    const foreachStyle: CSSProperties = {
        display: 'contents',
        ...style,
    };


    return (
        <div style={foreachStyle} {...events}>
            {data?.map((item, index) => (
                // @ts-ignore
                <React.Fragment key={generateObjectHash(item + index)}>
                    {viewBuilder(item, index)}
                </React.Fragment>
            ))}
        </div>
    );
});

ForEach.displayName = 'ForEach';