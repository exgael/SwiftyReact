import {getFlexAlignment} from "../alignment.js";

export const generateCoreViewStyles = (props) => {
    const {
        // **Styling Modifiers**
        backgroundColor,
        foregroundColor,
        opacity,
        cornerRadius,
        border,
        shadow,
        blendMode,
        mask, // Note: Not handled
        clipped,
        saturation,
        brightness,
        contrast,
        blur,
        backgroundBlur,

        // **Layout Modifiers**
        padding,
        margin,
        frame,
        offset,
        rotationEffect,
        rotation3DEffect,
        scaleEffect,
        zIndex,

        // **Interaction Modifiers**
        cursor,

        // **Other Modifiers**
        userSelect,
        debugBorder,
    } = props;

    const styles = {};

    // **Styling Modifiers**

    // Background color
    if (backgroundColor !== undefined) {
        styles.backgroundColor = backgroundColor;
    }

    // Foreground color
    if (foregroundColor !== undefined) {
        styles.color = foregroundColor;
    }

    // Opacity
    if (opacity !== undefined) {
        styles.opacity = opacity;
    }

    // Corner radius
    if (cornerRadius !== undefined) {
        styles.borderRadius = formatLengthUnit(cornerRadius);
    }

    // Border
    if (border !== undefined) {
        const { width, style: borderStyle, color, side } = border;
        const borderValue = `${formatLengthUnit(width)} ${borderStyle} ${color}`;

        if (side === undefined || side === 'all') {
            styles.border = borderValue;
        } else {
            styles[`border${capitalizeFirstLetter(side)}`] = borderValue;
        }
    }

    // Shadow
    if (shadow !== undefined) {
        const {
            color: shadowColor = '#000',
            offset = {},
            opacity: shadowOpacity = 1,
            radius = 0,
        } = shadow;
        const { width: offsetX = 0, height: offsetY = 0 } = offset;

        const rgbaColor = colorWithOpacity(shadowColor, shadowOpacity);
        styles.boxShadow = `${offsetX}px ${offsetY}px ${radius}px ${rgbaColor}`;
    }

    // Blend mode
    if (blendMode !== undefined) {
        styles.mixBlendMode = blendMode;
    }

    // Clipped
    if (clipped === true) {
        styles.overflow = 'hidden';
    }

    // Filters
    const filters = [];

    if (saturation !== undefined) {
        filters.push(`saturate(${saturation * 100}%)`);
    }

    if (brightness !== undefined) {
        filters.push(`brightness(${brightness * 100}%)`);
    }

    if (contrast !== undefined) {
        filters.push(`contrast(${contrast * 100}%)`);
    }

    if (blur !== undefined) {
        filters.push(`blur(${formatLengthUnit(blur)})`);
    }

    if (filters.length > 0) {
        styles.filter = filters.join(' ');
    }

    // Background blur
    if (backgroundBlur !== undefined) {
        styles.backdropFilter = `blur(${formatLengthUnit(backgroundBlur)})`;
    }

    // **Layout Modifiers**

    // Padding
    if (padding !== undefined) {
        const paddingValues = parseEdgeInsets(padding);
        Object.assign(styles, edgeInsetsToStyles(paddingValues, 'padding'));
    }

    // Margin
    if (margin !== undefined) {
        const marginValues = parseEdgeInsets(margin);
        Object.assign(styles, edgeInsetsToStyles(marginValues, 'margin'));
    }

    // Frame
    if (frame !== undefined) {
        const {
            width,
            height,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
            alignment,
        } = frame;

        if (width !== undefined) {
            styles.width = formatLengthUnit(width);
        } else {
            styles.width = "fit-content"
        }

        if (height !== undefined) {
            styles.height = formatLengthUnit(height);
        } else {
            styles.height = "fit-content"
        }

        if (minWidth !== undefined) {
            styles.minWidth = formatLengthUnit(minWidth);
        }

        if (maxWidth !== undefined) {
            styles.maxWidth = formatLengthUnit(maxWidth);
        }

        if (minHeight !== undefined) {
            styles.minHeight = formatLengthUnit(minHeight);
        }

        if (maxHeight !== undefined) {
            styles.maxHeight = formatLengthUnit(maxHeight);
        }

        // Alignment (requires flex layout in parent)
        if (alignment !== undefined) {
            styles.alignSelf = getFlexAlignment(alignment);
        }
    }

    // Offset and Transforms
    const transforms = [];

    if (offset !== undefined) {
        const { x = 0, y = 0 } = offset;
        const translateX = formatLengthUnit(x);
        const translateY = formatLengthUnit(y);
        transforms.push(`translate(${translateX}, ${translateY})`);
    }

    if (rotationEffect !== undefined) {
        transforms.push(`rotate(${rotationEffect}deg)`);
    }

    if (rotation3DEffect !== undefined) {
        const {
            angle,
            axis = { x: 0, y: 0, z: 1 },
            anchor,
            anchorZ = 0,
            perspective,
        } = rotation3DEffect;
        const { x, y, z } = axis;

        if (perspective !== undefined) {
            transforms.push(`perspective(${perspective}px)`);
        }

        transforms.push(`rotate3d(${x}, ${y}, ${z}, ${angle}deg)`);

        if (anchor !== undefined) {
            styles.transformOrigin = anchor;
        }

        if (anchorZ !== 0) {
            // Note: `transformOrigin` does not support `z` in CSS; may need 3D transformations
        }
    }

    if (scaleEffect !== undefined) {
        if (typeof scaleEffect === 'number') {
            transforms.push(`scale(${scaleEffect})`);
        } else {
            const { x = 1, y = 1 } = scaleEffect;
            transforms.push(`scale(${x}, ${y})`);
        }
    }

    if (transforms.length > 0) {
        styles.transform = transforms.join(' ');
    }

    // zIndex
    if (zIndex !== undefined) {
        styles.zIndex = zIndex;
        styles.position = 'relative'; // Ensure z-index takes effect
    }

    // **Interaction Modifiers**

    // Cursor
    if (cursor !== undefined) {
        styles.cursor = cursor;
    }

    // User select
    if (userSelect !== undefined) {
        styles.userSelect = userSelect;
    }

    // **Other Modifiers**

    // Debug border
    if (debugBorder === true) {
        styles.border = '1px dashed red';
    }

    styles.boxSizing = "border-box"

    return styles;
};

// Helper functions

function formatLengthUnit(value) {
    if (typeof value === 'number') {
        return `${value}px`;
    }
    return value; // Assume it's a valid CSS length string
}

function parseEdgeInsets(value) {
    if (typeof value === 'number' || typeof value === 'string') {
        const cssValue = formatLengthUnit(value);
        return { top: cssValue, right: cssValue, bottom: cssValue, left: cssValue };
    } else if (typeof value === 'object') {
        const { top, right, bottom, left } = value;
        return {
            top: top !== undefined ? formatLengthUnit(top) : '0px',
            right: right !== undefined ? formatLengthUnit(right) : '0px',
            bottom: bottom !== undefined ? formatLengthUnit(bottom) : '0px',
            left: left !== undefined ? formatLengthUnit(left) : '0px',
        };
    } else {
        return { top: '0px', right: '0px', bottom: '0px', left: '0px' };
    }
}

function edgeInsetsToStyles(values, prefix) {
    return {
        [`${prefix}Top`]: values.top,
        [`${prefix}Right`]: values.right,
        [`${prefix}Bottom`]: values.bottom,
        [`${prefix}Left`]: values.left,
    };
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function colorWithOpacity(color, opacity) {
    let r, g, b;

    if (color.startsWith('#')) {
        const hex = color.slice(1);
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        } else {
            // Invalid hex color
            return color;
        }
    } else if (color.startsWith('rgb')) {
        // Extract RGB values
        [r, g, b] = color.match(/\d+/g).map(Number);
    } else {
        // Unsupported color format
        return color;
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


