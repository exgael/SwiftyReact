import React from 'react';
import PropTypes from 'prop-types';
import {useEnvironment} from "../../../contexts/index.js";


// Core Text component
const Text = ({
  children,
  color, // Optional custom color
  weight, // Optional font weight
  italic = false, // Apply italic style
  underline = false, // Apply underline
  strikethrough = false, // Apply strikethrough
  multilineTextAlignment = 'left', // Text alignment
  kerning, // Letter spacing
  customStyle, // Custom styles if needed
  fontSize, // Specific font size passed by intrinsic components like LargeTitle, Title
  fontWeight, // Specific font weight passed by intrinsic components
  ...props
}) => {
  const { theme, typography } = useEnvironment(); // Access theme and typography from the environment

  // Determine the color: custom or theme-based
  const colorFromTheme = color || theme.primaryTextColor;

  // Generate the style object dynamically based on context and props
  const getStyle = () => ({
    color: colorFromTheme, // Use custom color or default primary text color from theme
    fontWeight: fontWeight || weight || typography.body.fontWeight, // Use intrinsic weight or custom
    fontStyle: italic ? 'italic' : 'normal', // Conditionally apply italic
    textDecoration: underline
      ? 'underline'
      : strikethrough
        ? 'line-through'
        : 'none', // Apply underline/strikethrough
    fontSize: fontSize || typography.body.fontSize, // Use intrinsic size or fallback to body size
    letterSpacing: kerning || 'normal', // Apply kerning
    textAlign: multilineTextAlignment, // Text alignment
    ...customStyle, // Merge custom styles if provided
  });

  return (
    <span style={getStyle()} {...props}>
      {children}
    </span>
  );
};

// PropTypes validation
Text.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string, // Optional color
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional weight
  italic: PropTypes.bool, // Apply italic
  underline: PropTypes.bool, // Apply underline
  strikethrough: PropTypes.bool, // Apply strikethrough
  multilineTextAlignment: PropTypes.oneOf([
    'left',
    'center',
    'right',
    'justify',
  ]), // Text alignment
  kerning: PropTypes.string, // Letter spacing (kerning)
  customStyle: PropTypes.object, // Custom styles
  fontSize: PropTypes.string, // Passed font size for intrinsic components
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Passed font weight for intrinsic components
};

// LargeTitle component
export const LargeTitle = ({ children, ...props }) => {
  const { typography, theme } = useEnvironment(); // Get the typography from environment context
  return (
    <Text
      fontSize={typography.largeTitle.fontSize}
      fontWeight={typography.largeTitle.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    >
      {children}
    </Text>
  );
};

LargeTitle.propTypes = {
    children: PropTypes.node.isRequired,
};

// Title component
export const Title = ({ children, ...props }) => {
  const { typography, theme } = useEnvironment();
  return (
    <Text
      fontSize={typography.title.fontSize}
      fontWeight={typography.title.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    >
      {children}
    </Text>
  );
};

Title.propTypes = {
    children: PropTypes.node.isRequired,
};

// Headline component
export const Headline = ({ children, ...props }) => {
  const { typography, theme } = useEnvironment();
  return (
    <Text
      fontSize={typography.headline.fontSize}
      fontWeight={typography.headline.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    >
      {children}
    </Text>
  );
};

Headline.propTypes = {
  children: PropTypes.node.isRequired,
};

// Body component
export const Body = ({ children, ...props }) => {
  const { typography, theme } = useEnvironment();
  return (
    <Text
      fontSize={typography.body.fontSize}
      fontWeight={typography.body.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    >
      {children}
    </Text>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
};

// Caption component
export const Caption = ({ children, ...props }) => {
  const { typography, theme } = useEnvironment();
  return (
    <Text
      fontSize={typography.caption.fontSize}
      fontWeight={typography.caption.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    >
      {children}
    </Text>
  );
};

Caption.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Text;
