import {useContext} from "react";
import {StackContext} from "../StackContext/index.js";
import {ViewContext} from "../../core/View/ViewContext.js";
import {View} from "../../core/index.js";
import PropTypes from "prop-types";

const Spacer = ({
                           debugBorder,
                           minSize = '0px',
                           ...props
                       }) => {
    const { direction } = useContext(StackContext);
    const { requestExpansion } = useContext(ViewContext);

    React.useEffect(() => {
        // Spacer requests expansion in its stack’s direction (horizontal or vertical)
        requestExpansion(direction);
    }, [direction, requestExpansion]);

    return (
        <View
            debugBorder={debugBorder}
            direction={direction}
            style={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
                minWidth: direction === 'row' ? minSize : 'auto',
                minHeight: direction === 'column' ? minSize : 'auto',
            }}
            {...props}
        />
    );
};

Spacer.propTypes = {
    debugBorder: PropTypes.string,
    minSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Spacer.defaultProps = {
    debugBorder: null,
    minSize: '0px',
};

export default Spacer;
