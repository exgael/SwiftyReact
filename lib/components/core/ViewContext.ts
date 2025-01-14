import {createContext, useContext, useEffect, useState} from 'react';
import {Axis} from "./modifier";

/**
 * ViewContextType: Defines the shape of the ViewContext
 */
interface ViewContextType {
    expansionAxis: Axis; // The layout direction: 'row' or 'column'
    requestExpansion: (expansionDirection: Axis) => void; // Function to request expansion in the parent
}

/**
 * Default ViewContext values
 */
const defaultViewContext: ViewContextType = {
    expansionAxis: 'column',
    requestExpansion: () => {
        // Default no-op function
    },
};

/**
 * ViewContext: Provides layout direction and expansion request handling
 */
export const ViewContext = createContext<ViewContextType>(defaultViewContext);

/**
 * Custom Hook: `useViewContext`
 */
export const useViewContext = () => useContext(ViewContext);

/**
 * ViewModel for handling expansion logic
 * @param requestParentExpansion - Function from the parent context
 */
export const useViewModel = (requestParentExpansion: (expansionAxis: Axis) => void) => {
    const [shouldExpandHorizontally, setShouldExpandHorizontally] = useState(false);
    const [shouldExpandVertically, setShouldExpandVertically] = useState(false);

    const requestExpansion = (expansionAxis: Axis) => {
        if (expansionAxis === 'row') {
            setShouldExpandHorizontally(true);
            requestParentExpansion('row');
        } else if (expansionAxis === 'column') {
            setShouldExpandVertically(true);
            requestParentExpansion('column');
        }
    };

    useEffect(() => {
        if (shouldExpandHorizontally) requestExpansion('row');
        if (shouldExpandVertically) requestExpansion('column');
    }, [shouldExpandHorizontally, shouldExpandVertically]);

    return {
        shouldExpandHorizontally,
        shouldExpandVertically,
        requestExpansion,
    };
};
