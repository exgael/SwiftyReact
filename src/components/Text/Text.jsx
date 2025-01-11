import React from 'react';
import PropTypes from "prop-types";
import {useEnvironment} from "../../contexts";
import {generateTextViewStyle} from "./style/index";
import {textViewPropTypes} from "./modifier/index";

// Text component with variant support
export const Text = ({
                text,
                variant = "body", // Default to "body" if no variant is provided
                ...props
              }) => {
  const { typography, theme } = useEnvironment(); // Get typography and theme from environment context

  // Define styles based on the variant
  const variantStyles = {
    largeTitle: typography.largeTitle,
    title: typography.title,
    headline: typography.headline,
    body: typography.body,
    caption: typography.caption,
  };

  const selectedStyle = variantStyles[variant] || variantStyles.body; // Fallback to "body" if variant not found

  // Merge the base styles
  const textStyle = generateTextViewStyle({
    ...props,
    fontSize: selectedStyle.fontSize,
    fontWeight: selectedStyle.fontWeight,
    color: props.color || theme.primaryTextColor,
  });

  return (
      <span
          style={textStyle}
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onTouchStart={props.onTouchStart}
          onTouchEnd={props.onTouchEnd}
          id={props.id}
          ref={props.setRef}
          {...props.custom} // Spread any custom attributes
      >
      {text}
    </span>
  );
};

// PropTypes validation
Text.propTypes = {
  ...textViewPropTypes,
  variant: PropTypes.oneOf(["largeTitle", "title", "headline", "body", "caption"]),
};