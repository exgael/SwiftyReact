import React, {CSSProperties} from 'react';
import {useEnvironment} from "../../contexts";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string;
    variant?: 'largeTitle' | 'title' | 'headline' | 'body' | 'caption';
    showDebugBorder?: boolean; // Shows a debug border
}

// **Text Component with Variant Support**
export const Text: React.FC<TextProps> = ({
                                              text,
                                              variant = 'body', // Default to "body" variant
                                              ...props
                                          }) => {

    const {typography, theme} = useEnvironment();

    // Define styles based on the variant
    const variantStyles = {
        largeTitle: typography.largeTitle,
        title: typography.title,
        headline: typography.headline,
        body: typography.body,
        caption: typography.caption,
    };

    const selectedStyle = variantStyles[variant] || variantStyles.body; // Fallback to "body"

    // Merge the base styles
    const textStyle: CSSProperties = {

        // Default
        fontSize: selectedStyle.fontSize,
        fontWeight: selectedStyle.fontWeight,
        color: theme.primaryTextColor,

        // Custom
        ...props.style,

        // Bedrock
        boxSizing: 'border-box',
        ...(props.showDebugBorder ? {border: '2px dashed black'} : {}),
    };

    return (
        <span
            style={textStyle}
            {...props}
        >
            {text}
        </span>
    );
}
