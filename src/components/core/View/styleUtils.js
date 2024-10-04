const debugColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

// Function to parse padding and margin
export const parseEdgeInsets = (insets) => {
    if (typeof insets === 'number' || typeof insets === 'string') {
        return {
            top: insets,
            right: insets,
            bottom: insets,
            left: insets,
        };
    }
    return {
        top: insets?.top || 0,
        right: insets?.right || 0,
        bottom: insets?.bottom || 0,
        left: insets?.left || 0,
    };
};

const mainAxisAlignmentMapping = {
    // Common alignments for both HStack and VStack
    leading: 'flex-start',
    center: 'center',
    trailing: 'flex-end',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
};

const crossAxisAlignmentMapping = {
    // For HStack (vertical alignment)
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',

    // For VStack (horizontal alignment)
    leading: 'flex-start',
    //center: 'center',
    trailing: 'flex-end',
    //stretch: 'stretch',
};

// Function to convert alignment to CSS
export const getFlexAlignment = (alignment, isMainAxis) => {
    if (isMainAxis) {
        return mainAxisAlignmentMapping[alignment];
    }
    return crossAxisAlignmentMapping[alignment];
};

// Helper to convert hex color to RGB
const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map((c) => c + c).join('');
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
};

// Function to generate CSS styles for View components
export const generateViewStyles = (props) => {
    const {
        // Size and frame
        frame = {},
        padding,
        margin,
        backgroundColor,
        foregroundColor,
        border,
        debugBorder,
        cornerRadius,
        shadow,
        opacity,
        frameAlignment,
    } = props;

    const {
        width,
        height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        alignment: frameAlignSelf,
    } = frame

    // Parse padding and margin
    const paddingValues = parseEdgeInsets(padding);
    const marginValues = parseEdgeInsets(margin);

    const border2 = `${border?.width} ${border?.style} ${border?.color}`

    // Build style object
    return {
        // Size
        width: width? width : 'fit-content',
        height: height? height : 'fit-content',
        minWidth,
        maxWidth: maxWidth ? maxWidth : 'none',
        minHeight,
        maxHeight: maxHeight ? maxHeight : 'none',
        alignSelf: frameAlignSelf
            ? getFlexAlignment(frameAlignSelf)
            : frameAlignment
                ? getFlexAlignment(frameAlignment)
                : undefined,

        // Padding and margin
        paddingTop: paddingValues.top,
        paddingRight: paddingValues.right,
        paddingBottom: paddingValues.bottom,
        paddingLeft: paddingValues.left,
        marginTop: marginValues.top,
        marginRight: marginValues.right,
        marginBottom: marginValues.bottom,
        marginLeft: marginValues.left,

        // Background
        backgroundColor,
        color: foregroundColor,

        // Border & debug border
        border: debugBorder
            ? `2px solid ${debugColors[Math.floor(Math.random() * debugColors.length)]}`
            : `${border?.width || '1px'} ${border?.style || 'solid'} ${border?.color || 'black'}`,

        borderRadius: cornerRadius,

        // Shadow
        boxShadow: shadow
            ? `${shadow.offset?.width || 0}px ${shadow.offset?.height || 0}px ${
                shadow.radius || 0
            }px rgba(${hexToRgb(shadow.color || '#000')}, ${
                shadow.opacity || 1
            })`
            : undefined,

        // Opacity
        opacity,

        // Box sizing
        boxSizing: 'border-box',
    };
};

// Function to generate CSS styles for Stack components
export const generateStackStyles = (
    props,
    shouldExpandHorizontally,
    shouldExpandVertically
) => {
    // Get base styles from generateViewStyles
    const baseStyles = generateViewStyles(props);

    const {
        alignment,
        distribution,
        direction,
        spacing,
        frame,
    } = props;

    // Build stack-specific styles
    const stackStyles = {
        // Display and flex direction
        display: 'flex',
        flexDirection: direction,

        // Alignment and distribution
        alignItems: getFlexAlignment(alignment, false),
        justifyContent: getFlexAlignment(distribution, true),
        gap: spacing,

        minWidth: direction === 'row' ? frame?.minWidth ?? 'auto' : 'auto',
        minHeight: direction === 'column' ? frame?.minHeight ?? 'auto' : 'auto',
    };

    // Handle expansion
    if (shouldExpandHorizontally) {
        stackStyles.width = frame?.width ? frame.width : '100%';
    }

    if (shouldExpandVertically) {
        stackStyles.height = frame?.height ? frame.height : '100%';
    }

    // Merge base styles and stack-specific styles
    return {
        ...baseStyles,
        ...stackStyles,
    };
};