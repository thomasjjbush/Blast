import { AppRegistry } from 'react-native';
import App from './App';

// to supress isMounted warning until react-native is updated ://
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('Blast', () => App);
