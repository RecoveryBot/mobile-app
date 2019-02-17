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
import * as config from "../env";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <TitleBar></TitleBar>
  };

  state = {
    name: ''
  }

  async componentWillMount() {
    const email = this.props.navigation.getParam('email');
    const getName = await fetch(`${config.server}user?userId=${email}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    });
    const name = await getName.text();
    this.setState({
      name
    });
  }

  render() {
    const email = this.props.navigation.getParam('email');
    return (
      <View style={styles.screenContainer}>
        <ScrollView style={styles.homeContainer} contentContainerStyle={styles.contentContainer}>
          <HeartCard email={email}></HeartCard>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.greetingNameText}>{this.state.name}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
