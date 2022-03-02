import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IRoute {
    key: string;
    name: string;
    params: any;
}

interface INav {
    navigation: NativeStackNavigationProp<
    any,
    any
  >,
  route: IRoute
}

export type ScreenNavigationProp = INav;