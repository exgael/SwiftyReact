import {useEnvironment} from "../../../contexts/index.js";
import {View} from "../../core/index.js";
import propTypes from 'prop-types';

export const Divider = ({
                            orientation = 'horizontal', // Default orientation is horizontal
                            thickness = 1, // Default thickness
                            length = '100%', // Default length is full width/height
                            color = undefined, // Default color
                            margin = 0, // Margin around the divider
                            style = {}, // Additional custom styles
                            ...props
                        }) => {
    // Determine styles based on orientation
    const isHorizontal = orientation === 'horizontal';

    const { theme } = useEnvironment();

    return (
        <View
            style={{
                width: isHorizontal ? length : thickness,
                height: isHorizontal ? thickness : length,
                backgroundColor: color ?? theme.shadowColor,
                margin,
                ...style,
            }}
            {...props}
        />
    );
};

Divider.propTypes = {
    orientation: propTypes.oneOf(['horizontal', 'vertical']),
    thickness: propTypes.number,
    length: propTypes.oneOfType([propTypes.string, propTypes.number]),
    color: propTypes.string,
    margin: propTypes.oneOfType([propTypes.string, propTypes.number]),
    style: propTypes.object,
};

export default Divider;