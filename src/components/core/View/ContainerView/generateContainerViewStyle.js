import {convertInternalLayoutPropsToStyles, generateCoreViewStyles} from "../../modifiers/index.js";

export const generateStackStyles = (
    props,
    shouldExpandHorizontally,
    shouldExpandVertically
) => {
    // core style
    const baseStyles =  generateCoreViewStyles(props)
    const {
        axis,
        frame,
    } = props;

    // Build stack-specific styles
    const stackStyles = {
        ... convertInternalLayoutPropsToStyles(props),
        minWidth: axis === 'row' ? frame?.minWidth ?? 'auto' : 'auto',
        minHeight: axis === 'column' ? frame?.minHeight ?? 'auto' : 'auto',
    };

    // Handle expansion
    if (shouldExpandHorizontally) {
        stackStyles.width = frame?.width ?? '100%';
    }

    if (shouldExpandVertically) {
        stackStyles.height = frame?.height ?? '100%';
    }

    // Merge base styles and stack-specific styles
    return {
        ...baseStyles,
        ...stackStyles,
    };
};
