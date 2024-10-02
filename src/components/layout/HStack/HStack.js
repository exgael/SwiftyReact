import {crossAxisAlignmentMapping, mainAxisAlignmentMapping} from "../../../utils/index.js";
import {StackContext} from "../StackContext/index.js";
import {View} from "../../core/index.js";
import propTypes from 'prop-types';

/**
 * HStack component is a horizontal stack layout component
 * @param debugBorder - If true, the view will render with a random border color for debugging layout.
 * @param alignment - Vertical alignment of children
 * @param distribution - Horizontal alignment of children
 * @param spacing - Spacing between children
 * @param children - Child components
 * @param style - Custom styles to apply to the view
 * @param props - Additional props to pass to the view
 * @return {JSX.Element} - The rendered HStack component
 * @constructor - The HStack component
 */
const HStack = ({
                    debugBorder,
                    alignment = 'center',
                    distribution = 'center',
                    spacing = 0,
                    children,
                    style = {},
                    ...props
                }) => {
    // Map alignment props to CSS equivalents
    const alignItems = crossAxisAlignmentMapping[alignment] || alignment;
    const justifyContent = mainAxisAlignmentMapping[distribution] || distribution;

    return (
        <StackContext.Provider value={{ direction: 'row' }}>
            <View
                debugBorder={debugBorder}
                direction={'row'}
                style={{
                    alignItems: alignItems,
                    justifyContent: justifyContent,
                    gap: spacing,
                    ...style,
                }}
                {...props}
            >
                {children}
            </View>
        </StackContext.Provider>
    );
};

HStack.propTypes = {
    debugBorder: propTypes.bool,
    alignment: propTypes.string,
    distribution: propTypes.string,
    spacing: propTypes.oneOfType([propTypes.string, propTypes.number]),
    children: propTypes.node,
    style: propTypes.object,
};

export default HStack;
