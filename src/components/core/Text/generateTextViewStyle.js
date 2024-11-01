import {generateTextStyles} from "../modifiers/text/to_css_text.js";
import {generateCoreViewStyles} from "../modifiers/index.js";

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
