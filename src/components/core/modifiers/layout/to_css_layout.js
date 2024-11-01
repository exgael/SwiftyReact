import {getFlexAlignment} from "../alignment.js";

/**
 * Converts internal layout props into a CSS-compatible style object for React components.
 * @param {object} props - The props object.
 * @returns {object} - A style object with CSS properties based on the provided internal layout modifiers.
 */
export function convertInternalLayoutPropsToStyles(props) {
    const { alignment, spacing, axis, style } = props;

    return {
        display: 'flex',
        flexDirection: axis,
        gap: spacing ? `${spacing}px` : undefined,

        // Primary-axis alignment
        justifyContent: getFlexAlignment(alignment),
        alignItems: "center", // Default is center, No overridable at layout level.
        ...style,
    };
}