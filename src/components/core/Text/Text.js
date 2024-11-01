import React from 'react';
import {useEnvironment} from "../../../contexts/index.js";
import {textViewPropTypes} from "../View/viewPropTypes.js";
import {generateTextViewStyle} from "./generateTextViewStyle.js";


// Core Text component
const Text = ({
  text,
  ...props
}) => {

  const textStyle= generateTextViewStyle(props);

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
Text.propTypes = textViewPropTypes;

// LargeTitle component
export const LargeTitle = ({ children, ...props }) => {
  const { typography, theme } = useEnvironment(); // Get the typography from environment context
  return (
    <Text
        text={text}
      fontSize={typography.largeTitle.fontSize}
      fontWeight={typography.largeTitle.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    />
  );
};

LargeTitle.propTypes = textViewPropTypes;

// Title component
export const Title = ({ text, ...props }) => {
  const { typography, theme } = useEnvironment();
  return (
    <Text
      text={text}
      fontSize={typography.title.fontSize}
      fontWeight={typography.title.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    />
  );
};

Title.propTypes = textViewPropTypes;

// Headline component
export const Headline = ({ text, ...props }) => {
  const { typography, theme } = useEnvironment();
  return (
      <Text
          text={text}
      fontSize={typography.headline.fontSize}
      fontWeight={typography.headline.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    />
  );
};

Headline.propTypes = textViewPropTypes;

// Body component
export const Body = ({ text, ...props }) => {
  const { typography, theme } = useEnvironment();
  return (
    <Text
        text={text}
      fontSize={typography.body.fontSize}
      fontWeight={typography.body.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    />
  );
};

Body.propTypes = textViewPropTypes;

// Caption component
export const Caption = ({ text, ...props }) => {
  const { typography, theme } = useEnvironment();
  return (
    <Text
        text={text}
      fontSize={typography.caption.fontSize}
      fontWeight={typography.caption.fontWeight}
      color={theme.primaryTextColor}
      {...props}
    />
  );
};

Caption.propTypes = textViewPropTypes;

export default Text;
