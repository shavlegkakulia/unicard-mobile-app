import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/actions/auth";
import Colors from "../../theme/Colors";

const HomeScreen: React.FC = () => {
    const dispatch = useDispatch();
    return <ScrollView>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => dispatch(logout())} style={{padding: 10, backgroundColor: Colors.red}}>
            <Text>logout</Text>
        </TouchableOpacity>
    </ScrollView>
}

export default HomeScreen;