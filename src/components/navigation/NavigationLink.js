import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ContainerView, coreModifiersPropTypes } from "../core";

/**
 * NavigationLink component behaves like a SwiftUI-style navigation link.
 * Uses `useNavigate` for navigation instead of `<Link>`.
 */
const NavigationLink = ({ destination, children, style = {}, ...props }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        if (destination.startsWith("http")) {
            // External link: open in a new tab
            window.open(destination, '_blank', 'noopener,noreferrer');
        } else {
            // Internal link: use navigate
            navigate(destination);
        }
    };

    return ContainerView({
        children,
        style: {
            display: 'inline-block',
            cursor: 'pointer',  // Indicates the link is clickable
            textDecoration: 'none', // Avoid underline styling
            ...style
        },
        onClick: handleClick,  // Handle click to navigate
        ...props
    });
};

NavigationLink.propTypes = {
    ...coreModifiersPropTypes,
    destination: PropTypes.string.isRequired,  // Destination URL or route
    children: PropTypes.node.isRequired,       // The content inside the link
    style: PropTypes.object,                   // Custom styles
};

export default NavigationLink;