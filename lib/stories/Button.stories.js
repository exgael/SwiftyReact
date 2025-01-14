import React from 'react';
import {Button, NavigationLink, Scene, Spacer, Text, VStack} from "../components/index.ts";

export default {
    title: 'Button',
    docs: {
        description: {
            component: 'button has an action and a text/label',
        },
    },
    component: Button
};

const Template = ({}) => {
    return (
        <Scene>
            <VStack spacing={2}>
                <Button action={() => {
                    console.log("I was clicked!")
                }} onMouseEnter={() => {
                    console.log("I was passed over!")
                }}>
                    <Text text={"I am a button"}/>
                </Button>
                <NavigationLink destination={"http://www.google.com"}>
                    <VStack spacing={2}>
                        <Text text={"Google Button"}/>
                        <Spacer/>
                        <Text text={"Google Button"}/>
                    </VStack>
                </NavigationLink>
            </VStack>
        </Scene>
    );
};

export const ButtonStory = Template.bind({});