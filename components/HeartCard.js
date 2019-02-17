import React from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import { LinearGradient } from 'expo';
import styles from '../styles.scss';

export class HeartCard extends React.Component {
  render() {
    return <View style={styles.heartCardContainer}>
      <LinearGradient
        colors={['#ff6969ff', '#ff9472ff']}
        style={styles.heartCard}
      >
        
      </LinearGradient>
    </View>;
  }
}
