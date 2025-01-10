import PropTypes from "prop-types";
import {ContainerView, coreModifiersPropTypes} from "../core/index.js";
import { useEnvironment } from "../../contexts/index.js";

const Button = ({ children, action, style = {}, ...props }) => {
    const { theme } = useEnvironment();

    return ContainerView({
        children,
        axis: "row",                      // Set axis to row for horizontal layout
        style: {
            display: 'inline-block',       // Ensure it behaves like a button
            cursor: 'pointer',             // Pointer cursor for button behavior
            textAlign: 'center',
            backgroundColor: theme.primaryButtonColor,  // Default button color
            ...style                       // Allow overriding styles through props
        },
        onClick: action,                   // Click handler for the button
        ...props                           // Spread any additional props
    });
}

Button.propTypes = {
    ...coreModifiersPropTypes,
    children: PropTypes.node.isRequired, // The content inside the button
    action: PropTypes.func,              // The click handler function
    style: PropTypes.object,             // Custom styles to override the button container style
};

export default Button;