import { createContext } from 'react';

/**
 * StackContext for defining the direction of the Stack layout.
 * @type {React.Context<{axis: string}>}
 */
const StackContext = createContext({
    axis: 'column', // Default to column direction
});

export default StackContext;