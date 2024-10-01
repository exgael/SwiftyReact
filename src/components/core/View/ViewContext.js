import { createContext } from 'react';

/**
 * ViewContext for propagating expansion requests
 * @type {React.Context<{requestExpansion: (expansionDirection: string) => void}>}
 */
export const ViewContext = createContext({
    requestExpansion: () => {}, // Default no-op
});