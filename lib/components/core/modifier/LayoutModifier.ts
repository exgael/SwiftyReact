/**
 * **alignment**: Defines the alignment of children along the cross axis (matching VStack/HStack alignment).
 * Accepts:
 * - 'leading', 'trailing', 'center', 'top', 'bottom'
 */
export type Alignment = 'leading' | 'trailing' | 'center' | 'top' | 'bottom';

/**
 * **spacing**: Specifies the space between children in the stack.
 * Accepts:
 * - Number (pixels)
 */
type Spacing = number;

/**
 * **axis**: Specifies stack layout direction.
 * Accepts:
 * - 'horizontal' or 'vertical'
 */
type Axis = 'row' | 'column';

/**
 * Props for the external stack
 */
interface StackProps {
    alignment?: Alignment;
    spacing?: Spacing;
}

/**
 * Props for the internal stack view
 */
interface InternalStackProps {
    axis: Axis;
    alignment: Alignment;
    spacing: Spacing;
}

export type {Axis, StackProps, InternalStackProps};