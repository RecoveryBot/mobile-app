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

import io from 'socket.io-client';
import * as config from '../env';

export class HeartCard extends React.Component {
  componentWillMount() {
    this.io = io(config.server);

    this.io.emit('login', this.props.email);

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
    return <View style={styles.heartCardContainer}>
      <LinearGradient
        colors={['#ff6969ff', '#ff9472ff']}
        style={styles.heartCard}
      >
        <Text style={styles.heartRateText}>{this.state.heartRate}</Text>
      </LinearGradient>
    </View>;
  }
}
