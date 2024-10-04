import React from 'react';
import { HStack } from "../components/index.js";

export default {
    title: 'Layout/HStack',
    component: HStack,
    argTypes: {
        numberOfChildren: {
            options: [1, 3, 5, 10, 20],
            control: { type: 'select' }
        },
    },
    args: {
        numberOfChildren: 5,
    }
};

const Template = ({ ...args }) => {
    const childrenArray = Array.from({ length: args.numberOfChildren }, (_, i) => (
        <div style={{ border: "1px solid black" }} key={i}>
            Child {i + 1}
        </div>
    ));
    delete args.numberOfChildren;
    return <HStack {...args}>{childrenArray}</HStack>;
};

export const Default = Template.bind({});
Default.args = {
    debugBorder: true,
};

export const Playground = Template.bind({});
Playground.args = {
    spacing: "10px",
    alignment: "center",
    distribution: "center",
    backgroundColor: "rgb(166,213,86)",
    foregroundColor: "black",
    debugBorder: true,
    opacity: 1,
    cornerRadius: "10px",
    frame: {
        height: "100px",
    },
    padding: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
    },
    margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
    },

    border: {
        color: "black",
        width: "2px",
        style: "dotted"
    },
    shadow: {
        color: "black",
        offset: {
            width: 5,
            height: 5,
        },
        opacity: 0.5,
        radius: 5
    },
    accessibilityHint: "This is a VStack",
    accessibilityLabel: "VStack"
}