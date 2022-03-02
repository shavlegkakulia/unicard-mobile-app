import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import AppNavigator from "./appNavigator";

export default () => {
    return <NavigationContainer>
        <AppNavigator />
    </NavigationContainer>
}