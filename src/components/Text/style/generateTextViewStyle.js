import {generateCoreViewStyles} from "../../core";


const generateTextStyles = (props) => {
    const {
        // **Text Styling Modifiers**
        fontSize,
        clampedFontSize,
        fontWeight,
        textAlign,
        fontStyle,
        textDecoration,
        textCase,
        truncationMode,
        lineLimit,
        letterSpacing,
        lineHeight,
        textOverflow,
        whiteSpace,
        wordBreak,
        multilineTextAlignment,
        direction,
        textShadow,
        fontFamily,
        fontVariant,
    } = props;

    const styles = {};

    // **Text Styling Modifiers**

    // Font size
    if (clampedFontSize) {
        styles.fontSize = `clamp(${formatLengthUnit(clampedFontSize.min)}, ${formatLengthUnit(clampedFontSize.preferred)}, ${formatLengthUnit(clampedFontSize.max)})`;
    } else if (fontSize !== undefined) {
        styles.fontSize = formatLengthUnit(fontSize);
    }

    // Font weight
    if (fontWeight !== undefined) {
        styles.fontWeight = fontWeight;
    }

    // Text alignment
    if (multilineTextAlignment || textAlign) {
        styles.textAlign = multilineTextAlignment || textAlign;
    }

    // Font style
    if (fontStyle !== undefined) {
        styles.fontStyle = fontStyle;
    }

    // Text decoration
    if (textDecoration !== undefined) {
        styles.textDecoration = textDecoration;
    }

    // Text transform (case)
    if (textCase !== undefined) {
        styles.textTransform = textCase;
    }

    // Truncation (line clamping)
    if (lineLimit && lineLimit > 1) {
        styles.display = '-webkit-box';
        styles.overflow = 'hidden';
        styles.WebkitBoxOrient = 'vertical';
        styles.WebkitLineClamp = lineLimit;
        styles.whiteSpace = 'normal';
    } else if (whiteSpace !== undefined) {
        styles.whiteSpace = whiteSpace;
    }

    // Word break
    if (wordBreak !== undefined) {
        styles.wordBreak = wordBreak;
    }

    // Letter spacing
    if (letterSpacing !== undefined) {
        styles.letterSpacing = formatLengthUnit(letterSpacing);
    }

    // Line height
    if (lineHeight !== undefined) {
        styles.lineHeight = lineHeight;
    }

    // Text overflow
    if (textOverflow !== undefined) {
        styles.textOverflow = textOverflow;
    }

    // Text direction
    if (direction !== undefined) {
        styles.direction = direction;
    }

    // Text shadow
    if (textShadow !== undefined) {
        styles.textShadow = textShadow;
    }

    // Font family
    if (fontFamily !== undefined) {
        styles.fontFamily = fontFamily;
    }

    // Font variant
    if (fontVariant !== undefined) {
        styles.fontVariant = Array.isArray(fontVariant) ? fontVariant.join(' ') : fontVariant;
    }

    return styles;
};

// Helper function to format length units for consistent use in styles
function formatLengthUnit(value) {
    return typeof value === 'number' ? `${value}px` : value;
}

export const generateTextViewStyle = (
    props
) => {
    // core style
    const baseStyles = generateCoreViewStyles(props)
    const textStyles = generateTextStyles(props)

    // Merge base styles and stack-specific styles
    return {
        ...baseStyles,
        ...textStyles,
    };
};
