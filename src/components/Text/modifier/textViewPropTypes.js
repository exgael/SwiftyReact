import PropTypes from 'prop-types';
import {coreModifiersPropTypes} from "../../core/index.js";

/**
 * **fontSize**: Sets the font size.
 * Accepts:
 * - Keywords (e.g., 'medium', 'large')
 * - CSS length units as strings (e.g., '16px', '1em', '2rem')
 * - Numbers (interpreted as pixels)
 */
const fontSize = PropTypes.oneOfType([
    PropTypes.oneOf([
        'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large',
        'smaller', 'larger',
    ]),
    PropTypes.string, // CSS length units
    PropTypes.number, // Pixels
]);

/**
 * **clampedFontSize**: Sets the font size with clamping.
 * An object with `min`, `preferred`, and `max` font sizes.
 * Each accepts:
 * - CSS length units as strings (e.g., '12px', '1em')
 * - Numbers (interpreted as pixels)
 */
const clampedFontSize = PropTypes.shape({
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    preferred: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

/**
 * **fontWeight**: Sets the font weight.
 * Accepts:
 * - Keywords: 'normal', 'bold', 'bolder', 'lighter'
 * - Numeric values from 100 to 900 in increments of 100
 */
const fontWeight = PropTypes.oneOfType([
    PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter']),
    PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
    PropTypes.number, // For any other numeric values
]);

/**
 * **textAlign**: Sets the horizontal alignment of the text.
 * Accepts:
 * - 'left', 'right', 'center', 'justify', 'start', 'end', 'match-parent'
 */
const textAlign = PropTypes.oneOf([
    'left', 'right', 'center', 'justify', 'start', 'end', 'match-parent',
]);

/**
 * **fontStyle**: Sets the font style.
 * Accepts:
 * - 'normal', 'italic', 'oblique', 'initial', 'inherit'
 */
const fontStyle = PropTypes.oneOf(['normal', 'italic', 'oblique', 'initial', 'inherit']);

/**
 * **textDecoration**: Adds decoration to the text.
 * Accepts:
 * - 'none', 'underline', 'overline', 'line-through', 'blink', 'inherit', 'initial', 'unset'
 */
const textDecoration = PropTypes.oneOf([
    'none', 'underline', 'overline', 'line-through', 'blink', 'inherit', 'initial', 'unset',
]);

/**
 * **textCase**: Transforms the text casing.
 * Accepts:
 * - 'none', 'capitalize', 'uppercase', 'lowercase', 'full-width', 'full-size-kana'
 */
const textCase = PropTypes.oneOf([
    'none', 'capitalize', 'uppercase', 'lowercase', 'full-width', 'full-size-kana',
]);

/**
 * **textContentType**: Specifies the content type of the text for semantic purposes.
 * Accepts:
 * - Any string value.
 */
const textContentType = PropTypes.string;

/**
 * **truncationMode**: Defines how to handle text overflow.
 * Accepts:
 * - 'clip', 'ellipsis'
 */
const truncationMode = PropTypes.oneOf(['clip', 'ellipsis']);

/**
 * **lineLimit**: Specifies the maximum number of lines to display.
 * Accepts:
 * - A positive integer.
 */
const lineLimit = PropTypes.number;

/**
 * **letterSpacing**: Adjusts the spacing between characters.
 * Accepts:
 * - CSS length units as strings (e.g., '0.1em', '1px')
 * - Numbers (interpreted as pixels)
 */
const letterSpacing = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

/**
 * **lineHeight**: Sets the height of each line of text.
 * Accepts:
 * - Numbers (e.g., 1.5)
 * - Strings (e.g., '1.5', '150%', 'normal')
 */
const lineHeight = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

/**
 * **textOverflow**: Specifies how overflowed content that is not displayed is signaled to users.
 * Accepts:
 * - 'clip', 'ellipsis'
 * - Any custom string value.
 */
const textOverflow = PropTypes.oneOfType([
    PropTypes.oneOf(['clip', 'ellipsis']),
    PropTypes.string,
]);

/**
 * **whiteSpace**: Specifies how white space inside the element is handled.
 * Accepts:
 * - 'normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'
 */
const whiteSpace = PropTypes.oneOf([
    'normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces',
]);

/**
 * **wordBreak**: Specifies how words should break when reaching the end of a line.
 * Accepts:
 * - 'normal', 'break-all', 'keep-all', 'break-word'
 */
const wordBreak = PropTypes.oneOf(['normal', 'break-all', 'keep-all', 'break-word']);

/**
 * **multilineTextAlignment**: Alignment for multiline text (same as `textAlign`).
 * Accepts:
 * - 'left', 'right', 'center', 'justify', 'start', 'end', 'match-parent'
 */
const multilineTextAlignment = textAlign;

/**
 * **direction**: Sets the text direction.
 * Accepts:
 * - 'ltr', 'rtl', 'inherit'
 */
const direction = PropTypes.oneOf(['ltr', 'rtl', 'inherit']);

/**
 * **textShadow**: Applies shadow to the text.
 * Accepts:
 * - A CSS `text-shadow` string (e.g., '2px 2px 4px #000000')
 */
const textShadow = PropTypes.string;

/**
 * **fontFamily**: Sets the font family.
 * Accepts:
 * - A string specifying the font family (e.g., 'Arial, sans-serif')
 */
const fontFamily = PropTypes.string;

/**
 * **fontVariant**: Controls the usage of alternate glyphs.
 * Accepts:
 * - A string or an array of strings (e.g., 'small-caps', ['small-caps', 'ordinal'])
 */
const fontVariant = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
]);

/**
 * PropTypes definitions for text-specific modifiers.
 * These modifiers can be applied to text components to control typography and text styling.
 */
const textModifiersPropTypes = {
    fontSize,
    clampedFontSize,
    fontWeight,
    textAlign,
    fontStyle,
    textDecoration,
    textCase,
    textContentType,
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
};

export const textViewPropTypes= {
    ...coreModifiersPropTypes,
    ...textModifiersPropTypes
}
