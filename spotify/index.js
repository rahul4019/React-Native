import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import TrackPlayer from 'react-native-track-player';
import {playbackService} from './musicPlayerServices';

TrackPlayer.registerPlaybackService(() => playbackService);

AppRegistry.registerComponent(appName, () => App);
