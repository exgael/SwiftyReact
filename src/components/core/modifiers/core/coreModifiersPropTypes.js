import PropTypes from 'prop-types';

/**
 * **backgroundColor**: Sets the background color of the view.
 * Accepts:
 * - CSS color strings (e.g., '#FF0000', 'rgb(255,0,0)', 'red')
 */
const backgroundColor = PropTypes.string;

/**
 * **foregroundColor**: Sets the color of the foreground content (e.g., text color).
 * Accepts:
 * - CSS color strings
 */
const foregroundColor = PropTypes.string;

/**
 * **opacity**: Sets the opacity of the view.
 * Accepts:
 * - Numbers between 0 (completely transparent) and 1 (completely opaque)
 */
const opacity = PropTypes.number;

/**
 * **cornerRadius**: Applies rounded corners to the view.
 * Accepts:
 * - CSS length units as strings (e.g., '5px', '1em', '10%')
 * - Numbers (interpreted as pixels)
 */
const cornerRadius = PropTypes.oneOfType([
    PropTypes.string, // CSS units
    PropTypes.number, // Pixels
]);

/**
 * **border**: Adds a border around the view.
 * An object with the following properties:
 * - `width`: CSS length units as strings or numbers (pixels)
 * - `style`: Border style string (e.g., 'solid', 'dashed')
 * - `color`: CSS color string
 * - `side` (optional): Specifies which side(s) the border applies to ('top', 'right', 'bottom', 'left', 'all')
 */
const border = PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    style: PropTypes.oneOf([
        'solid', 'dotted', 'dashed', 'double', 'groove',
        'ridge', 'inset', 'outset', 'hidden', 'none',
    ]).isRequired,
    color: PropTypes.string.isRequired,
    side: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'all']),
});

/**
 * **shadow**: Applies a shadow effect to the view.
 * An object with the following properties:
 * - `color`: CSS color string
 * - `offset`: An object with `width` and `height` properties (numbers, pixels)
 * - `opacity`: Number between 0 and 1
 * - `radius`: Number (blur radius in pixels)
 */
const shadow = PropTypes.shape({
    color: PropTypes.string,
    offset: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    opacity: PropTypes.number,
    radius: PropTypes.number,
});

/**
 * **blendMode**: Defines how the view's content blends with the background.
 * Accepts:
 * - CSS `mix-blend-mode` property values
 */
const blendMode = PropTypes.oneOf([
    'normal', 'multiply', 'screen', 'overlay', 'darken',
    'lighten', 'color-dodge', 'color-burn', 'hard-light',
    'soft-light', 'difference', 'exclusion', 'hue',
    'saturation', 'color', 'luminosity',
]);

/**
 * **mask**: Applies a mask to the view.
 * Accepts:
 * - A React element to use as a mask
 */
const mask = PropTypes.node;

/**
 * **clipped**: Clips the view to its bounding frame.
 * Accepts:
 * - Boolean (`true` to clip, `false` to not clip)
 */
const clipped = PropTypes.bool;

/**
 * **saturation**: Adjusts the color saturation.
 * Accepts:
 * - Numbers (percentage), where 1 is 100% (normal), 0 is grayscale, and values above 1 increase saturation
 */
const saturation = PropTypes.number;

/**
 * **brightness**: Adjusts the brightness.
 * Accepts:
 * - Numbers (percentage), where 1 is 100% (normal), 0 is completely dark
 */
const brightness = PropTypes.number;

/**
 * **contrast**: Adjusts the contrast.
 * Accepts:
 * - Numbers (percentage), where 1 is 100% (normal), 0 is no contrast
 */
const contrast = PropTypes.number;

/**
 * **blur**: Applies a blur effect.
 * Accepts:
 * - Numbers (blur radius in pixels)
 */
const blur = PropTypes.number;

/**
 * **backgroundBlur**: Applies a blur effect to the background.
 * Accepts:
 * - Numbers (blur radius in pixels)
 */
const backgroundBlur = PropTypes.number;

/**
 * **padding**: Adds padding inside the view's boundaries.
 * Accepts:
 * - CSS length units as strings (e.g., '10px', '1em')
 * - Numbers (pixels)
 * - An object with `top`, `right`, `bottom`, `left` properties
 */
const padding = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
]);

/**
 * **margin**: Adds margin outside the view's boundaries.
 * Accepts:
 * - CSS length units as strings
 * - Numbers (pixels)
 * - An object with `top`, `right`, `bottom`, `left` properties
 */
const margin = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
]);

/**
 * **frame**: Sets the size and alignment of the view.
 * An object with the following properties:
 * - `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`: CSS length units or numbers (pixels)
 * - `alignment`: Alignment within parent ('leading', 'trailing', 'center', 'top', 'bottom')
 */
const frame = PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    alignment: PropTypes.oneOf(['leading', 'trailing', 'center', 'top', 'bottom']),
});

/**
 * **offset**: Offsets the view by a certain amount.
 * An object with `x` and `y` properties.
 * Accepts:
 * - CSS length units as strings
 * - Numbers (pixels)
 */
const offset = PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

/**
 * **rotationEffect**: Rotates the view.
 * Accepts:
 * - Number (degrees)
 */
const rotationEffect = PropTypes.number;

/**
 * **rotation3DEffect**: Applies a 3D rotation effect.
 * An object with the following properties:
 * - `angle`: Number (degrees)
 * - `axis`: An object with `x`, `y`, `z` properties (numbers)
 * - `anchor`: CSS transform-origin (e.g., 'center', 'top', 'left')
 * - `anchorZ`: Number
 * - `perspective`: Number
 */
const rotation3DEffect = PropTypes.shape({
    angle: PropTypes.number.isRequired,
    axis: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number,
    }),
    anchor: PropTypes.string,
    anchorZ: PropTypes.number,
    perspective: PropTypes.number,
});

/**
 * **scaleEffect**: Scales the view.
 * Accepts:
 * - Number (uniform scale)
 * - An object with `x` and `y` properties (numbers)
 */
const scaleEffect = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
]);

/**
 * **zIndex**: Controls the drawing order of the view.
 * Accepts:
 * - Number
 */
const zIndex = PropTypes.number;

/**
 * **onClick**: Handler for click events.
 * Accepts:
 * - Function
 */
const onClick = PropTypes.func;

/**
 * **onMouseEnter**: Handler for mouse enter events.
 * Accepts:
 * - Function
 */
const onMouseEnter = PropTypes.func;

/**
 * **onMouseLeave**: Handler for mouse leave events.
 * Accepts:
 * - Function
 */
const onMouseLeave = PropTypes.func;

/**
 * **onTouchStart**: Handler for touch start events.
 * Accepts:
 * - Function
 */
const onTouchStart = PropTypes.func;

/**
 * **onTouchEnd**: Handler for touch end events.
 * Accepts:
 * - Function
 */
const onTouchEnd = PropTypes.func;

/**
 * **allowsHitTesting**: Determines whether the view responds to hit testing.
 * Accepts:
 * - Boolean
 */
const allowsHitTesting = PropTypes.bool;

/**
 * **focusable**: Indicates whether the view can be focused.
 * Accepts:
 * - Boolean
 */
const focusable = PropTypes.bool;

/**
 * **cursor**: Sets the cursor style when hovering over the view.
 * Accepts:
 * - CSS cursor values (e.g., 'pointer', 'default', 'text')
 */
const cursor = PropTypes.string;

/**
 * **accessibilityLabel**: Provides an accessibility label.
 * Accepts:
 * - String
 */
const accessibilityLabel = PropTypes.string;

/**
 * **accessibilityHint**: Provides an accessibility hint.
 * Accepts:
 * - String
 */
const accessibilityHint = PropTypes.string;

/**
 * **accessibilityIdentifier**: Provides an identifier for testing.
 * Accepts:
 * - String
 */
const accessibilityIdentifier = PropTypes.string;

/**
 * **id**: Assigns a unique identifier to the view.
 * Accepts:
 * - String or Number
 */
const id = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

/**
 * **tag**: Associates a tag with the view.
 * Accepts:
 * - Any value
 */
const tag = PropTypes.any;

/**
 * **setKey**: Assigns a React key to the view.
 * Accepts:
 * - String or Number
 */
const setKey = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

/**
 * **setRef**: Assigns a React ref to the view.
 * Accepts:
 * - Function or Ref object
 */
const setRef = PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]);

/**
 * **userSelect**: Controls whether the user can select text within the view.
 * Accepts:
 * - 'auto', 'none', 'text', 'contain', 'all'
 */
const userSelect = PropTypes.oneOf(['auto', 'none', 'text', 'contain', 'all']);

/**
 * **debugBorder**: If true, applies a visible border for debugging layout issues.
 * Accepts:
 * - Boolean
 */
const debugBorder = PropTypes.bool;

/**
 * PropTypes definitions for core modifiers.
 * These modifiers can be applied to any view to control styling, layout, interaction, and accessibility.
 */
export const coreModifiersPropTypes = {
    // **Styling Modifiers**
    backgroundColor,
    foregroundColor,
    opacity,
    cornerRadius,
    border,
    shadow,
    blendMode,
    mask,
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
    onClick,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    allowsHitTesting,
    focusable,
    cursor,

    // **Accessibility Modifiers**
    accessibilityLabel,
    accessibilityHint,
    accessibilityIdentifier,

    // **Other Modifiers**
    id,
    tag,
    setKey,
    setRef,
    userSelect,
    debugBorder,
};
