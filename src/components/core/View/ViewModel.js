import { useState, useEffect } from 'react';

/**
 * ViewModel for handling expansion logic
 * @param {function(string): void} requestParentExpansion - Parent context requestExpand function
 * @returns {Object} ViewModel with handlers for expansion
 */
export const useViewModel = (requestParentExpansion) => {
    const [shouldExpandHorizontally, setShouldExpandHorizontally] = useState(false);
    const [shouldExpandVertically, setShouldExpandVertically] = useState(false);

    const requestExpansion = (expansionDirection) => {
        if (expansionDirection === 'row') {
            setShouldExpandHorizontally(true);
            requestParentExpansion('row'); // Notify parent to expand horizontally
        } else if (expansionDirection === 'column') {
            setShouldExpandVertically(true);
            requestParentExpansion('column'); // Notify parent to expand vertically
        }
    };

    // Propagate expansion requests
    useEffect(() => {
        if (shouldExpandHorizontally) {
            requestExpansion('row');
        }
        if (shouldExpandVertically) {
            requestExpansion('column');
        }
    }, [shouldExpandHorizontally, shouldExpandVertically]);

    return {
        shouldExpandHorizontally,
        shouldExpandVertically,
        requestExpansion,
    };
};
