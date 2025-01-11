import React from 'react';
import {VStack, HStack, Spacer, Text, Scene} from "../components";

const mainAxisAlignmentMapping = {
    leading: 'flex-start',
    center: 'center',
    trailing: 'flex-end',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
};

const crossAxisAlignmentMapping = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',
    leading: 'flex-start',
    trailing: 'flex-end',
};

export default {
    title: 'Learn/Dynamic Layout',
    docs: {
        description: {
            component: 'Spacer is a layout component that adds flexible space between or around child views. It is used to create space between or around child views in a stack. Spacer is a simple component that expands to fill the available space in the stack.',
        },
    },
    component: Spacer,
    argTypes: {
        numberOfChildren: {
            options: [3],
            control: { type: 'select' }
        },
        spacerPositions: {
            control: { type: 'object' },
            description: 'An array of boolean values indicating whether to place a spacer before each child. Example: [true, false, true] for placing a spacer before the first and third child.',
        },
        spacerDebugBorder: {
            control: { type: 'boolean' },
            description: 'Adds a border around the Spacer component for debugging purposes'
        },
        stackType: {
            options: ['HStack', 'VStack'],
            control: { type: 'select' },
            defaultValue: 'HStack',
        },
        alignment: {
            options: Object.keys(crossAxisAlignmentMapping),
            control: { type: 'select' },
            defaultValue: 'center',
        },
        distribution: {
            options: Object.keys(mainAxisAlignmentMapping),
            control: { type: 'select' },
            defaultValue: 'center',
        },
    },
    args: {
        numberOfChildren: 3,
        spacerPositions: [true, false, false, true],
        spacerDebugBorder: true,
        stackType: 'HStack',
        alignment: 'center',
        distribution: 'center',
    },
};

const Template2 = ({ ...args }) => {
    const childrenArray1 = Array.from({ length: 2 }, (_, i) => (
        <React.Fragment key={i}>
            <Text
                text={ `Child ${i + 1}`}
                padding={"10px"}
                multilineTextAlignment={'center'}
                debugBorder={true}
            />
        </React.Fragment>
    ));

    const childrenArray2 = Array.from({ length: 2 }, (_, i) => (
        <React.Fragment key={i+6}>
            <Text text={ `Child ${i + 3}`} padding={"10px"} debugBorder={true}/>
        </React.Fragment>
    ));

    const childrenArray3 = Array.from({ length: 2 }, (_, i) => (
        <React.Fragment key={i+10} >
            <Text text={ `Child ${i + 5}`} padding={"10px"} debugBorder={true} />
        </React.Fragment>
    ));

    delete args.numberOfChildren;
    delete args.spacerDebugBorder;
    delete args.stackType;
    delete args.spacerPositions;
    delete args.width;
    delete args.height;
    return (
        <Scene>
            <VStack
                padding={"10px"}
                debugBorder={true}
            >
                {childrenArray1}
                <Spacer />
                <HStack>
                    {childrenArray2}
                    <Spacer />
                    {childrenArray3}
                </HStack>
            </VStack>
        </Scene>
    );
};

export const DynamicLayout = Template2.bind({});
DynamicLayout.args = {
    debugBorder: false,
};
DynamicLayout.parameters = {
    docs: {
        description: {
            story: 'This story demonstrates how you can create dynamic layouts by utilizing the Spacer and flexible alignment options. The stack stretches vertically and aligns its children along the leading edge.',
        },
    },
};