/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './source/Routes';
import {name as appName} from './app.json';
import { typography } from "./source/config/Typography";

typography()
AppRegistry.registerComponent(appName, () => App);
