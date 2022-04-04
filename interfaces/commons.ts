import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface IRoute {
  data: any;
  key: string;
  name: string;
  params: any;
}

interface INav {
  navigation: NativeStackNavigationProp<any, any>;
  route: IRoute;
}

export type ScreenNavigationProp = INav;

declare module 'axios' {
  interface AxiosRequestConfig {
    anonymous?: boolean;
    fromLogin?: boolean;
    objectResponse?: boolean;
    skipRefresh?: boolean;
  }
}
