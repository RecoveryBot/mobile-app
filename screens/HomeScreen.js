import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import styles from '../styles.scss';
import { TitleBar } from '../components/TitleBar';
import { HeartCard } from '../components/HeartCard';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <TitleBar></TitleBar>
  };

  render() {
    const email = this.props.navigation.getParam('email');
    return (
      <View style={styles.screenContainer}>
        <ScrollView style={styles.homeContainer} contentContainerStyle={styles.contentContainer}>
          <HeartCard email={email}></HeartCard>
        </ScrollView>
      </View>
    );
  }
}
