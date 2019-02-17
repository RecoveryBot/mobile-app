import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import io from 'socket.io-client';
import * as config from '../env';

import styles from '../styles.scss';
import { HeartCard } from '../components/HeartCard';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Recovery Bot'
  };

  constructor(props) {
    super(props);
    this.io = io(config.server);

    this.io.emit('login', config.user);

    this.io.on('heartRate', heartRate => {
      if (heartRate) {
        this.setState({
          heartRate
        });
      }
    });
  }

  state = {
    heartRate: 0
  }

  render() {
    const email= this.props.navigation.getParam('email');
    return (
      <View style={styles.screenContainer}>
        <ScrollView style={styles.homeContainer} contentContainerStyle={styles.contentContainer}>
          <HeartCard></HeartCard>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}
