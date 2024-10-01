import { createContext } from 'react';

/**
 * StackContext for defining the direction of the Stack layout.
 * @type {React.Context<{direction: string}>}
 */
const StackContext = createContext({
    direction: 'column', // Default to column direction
});

export default StackContext;