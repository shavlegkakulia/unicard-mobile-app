import React from 'react';
import { ScrollView, Text, TouchableOpacity } from "react-native"
import { Icon, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { login } from '../../Store/actions/auth';
import Colors from '../../theme/Colors';

const LoginScreen: React.FC = () => {
    const dispatch = useDispatch();
    return <ScrollView>
        <Text>Login</Text>
        <TouchableOpacity onPress={() => dispatch(login())} style={{padding: 10, backgroundColor: Colors.red}}>
            <Text>login</Text>
        </TouchableOpacity>
        <Input
            placeholder='INPUT WITH CUSTOM ICON'
           
            errorMessage={'fdsfsdfdf'}
            leftIcon={<Icon
            
                name='accessibility-new'
                size={24}
                color='black' tvParallaxProperties={undefined} />} autoCompleteType={''} />
    </ScrollView>
}

export default LoginScreen;