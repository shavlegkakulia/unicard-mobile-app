import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenNavigationProp } from "../../interfaces/commons";
import { en } from "../../lang";
import AuthService from "../../services/AuthService";
import { login, logout } from "../../Store/actions/auth";
import { use } from "../../Store/actions/translate";
import { ITranslateReducer, ITranslateState } from "../../Store/types/translate";
import Colors from "../../theme/Colors";

const HomeScreen: React.FC<ScreenNavigationProp> = (props) => {
    const dispatch = useDispatch();
    const translateReducer = useSelector<ITranslateReducer>(
        state => state.TranslateReducer,
      ) as ITranslateState;

      const signin = () => {
        AuthService.SignIn({email: 'fhjdskhfjd', password: 'fdsfds'}).subscribe({
            next: async Response => {
                await AuthService.setToken(Response.data.token, Response.data.refresh_token);
                dispatch(login());
            },
            error: err => {
               
            },
            complete: () => {

            }
        })
      }

    return <ScrollView>
        <Text>
            {translateReducer.t('common.name')}
        </Text>
        <TouchableOpacity onPress={() => dispatch(logout())} style={{padding: 10, backgroundColor: Colors.red}}>
            <Text>logout</Text>
        </TouchableOpacity>
    </ScrollView>
}

export default HomeScreen;