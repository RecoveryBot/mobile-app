import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Icon } from 'expo';

import styles from '../styles.scss';
import { TitleBar } from '../components/TitleBar';
import { HeartCard } from '../components/HeartCard';
import * as config from "../env";

import Swiper from 'react-native-swiper';

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
          <View style={styles.slidesContainer}>
            <Swiper
              style={styles.slideWrapper}
              showsButtons={true}
              activeDotColor="#66e2d6"
              nextButton={
                <Icon.Ionicons
                  name="md-arrow-dropright"
                  color="#66e2d6"
                  size={75}
                />
              }
              prevButton={
                <Icon.Ionicons
                  name="md-arrow-dropleft"
                  color="#66e2d6"
                  size={75}
                />
              }
            >
              <View style={styles.slide}>
                <Text style={styles.slideText}>
                  1 out of every 12 adults in the US struggles with alcohol and/or drug use addiction according to the National Survey on Drug Use and Health.
                </Text>
              </View>
              <View style={styles.slide}>
                <Text style={styles.slideText}>
                  Only 12.2% of adults who need treatment for a substance use disorder receive any type of treatment.
                </Text>
              </View>
              <View style={styles.slide}>
                <Text style={styles.slideText}>
                  Drug abuse and addiction cost American society close to $200 billion in healthcare, criminal justice, legal, and lost workplace production/participation costs in 2007, the Office on National Drug Control Policy (ONDCP) reports.
                </Text>
              </View>
            </Swiper>
          </View>
        </ScrollView>
      </View>
    );
  }
}
