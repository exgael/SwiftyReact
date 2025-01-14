import {Text, NavigationLink, Scene, Spacer, VStack, Button, getRandomBorderStyle} from "@exgael/swiftyreact";

function App() {
    return (
        <Scene>
            <VStack style={{height: '500px', width: '500px',  border: getRandomBorderStyle() }}>
                <Button style={{ border: getRandomBorderStyle()}}>
                    <VStack style={{ border: getRandomBorderStyle()}}>
                    <Text
                        text={"Hi"}
                        variant={"body"}
                        style={{
                            color: "blueviolet",
                            border: getRandomBorderStyle()
                        }}
                    />
                        <NavigationLink to={"https:www.google.com"} style={{ border: getRandomBorderStyle()}}>
                            <Text
                                text={"to GOOGLE"}
                                variant={"body"}
                                style={{
                                    color: "blueviolet",
                                    border: getRandomBorderStyle()
                                }}
                            />
                        </NavigationLink>
                    <Spacer />

                    </VStack>
                </Button>


            </VStack>
        </Scene>
    )
}

export default App
