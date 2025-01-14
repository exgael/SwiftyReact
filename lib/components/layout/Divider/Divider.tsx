import React, {CSSProperties} from 'react';
import {useEnvironment} from '../../../contexts';

interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    thickness?: number;
    length?: string | number;
    color?: string;
    margin?: string | number;
    style?: CSSProperties;

    [key: string]: any; // For additional props like data attributes
}

export const Divider: React.FC<DividerProps> = ({
                                                    orientation = 'horizontal', // Default orientation is horizontal
                                                    thickness = 1, // Default thickness
                                                    length = '100%', // Default length is full width/height
                                                    color, // Default color
                                                    margin = 0, // Margin around the divider
                                                    style = {}, // Additional custom styles
                                                    ...props
                                                }) => {
    // Determine styles based on orientation
    const isHorizontal = orientation === 'horizontal';

    const {theme} = useEnvironment();

    return (
        <div
            style={{
                width: isHorizontal ? length : thickness,
                height: isHorizontal ? thickness : length,
                backgroundColor: color ?? theme.shadowColor,
                margin,
                ...style,
            }}
            {...props}
        />
    );
};
