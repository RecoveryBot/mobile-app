import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { LinearGradient } from 'expo';
import { LineChart } from 'react-native-svg-charts'
import styles from '../styles.scss';

import io from 'socket.io-client';
import * as config from '../env';

export class HeartCard extends React.Component {
  componentWillMount() {
    this.io = io(config.server);

    this.io.emit('login', this.props.email);

    this.io.on('heartRate', heartRate => {
      if (heartRate) {
        let myRates = this.state.data;
        if (myRates.length < 10) {
          myRates = myRates.slice(0).concat(Number(heartRate));
        } else {
          myRates = myRates.slice(1).concat(Number(heartRate));
        }

        this.setState({
          heartRate,
          data: myRates
        });
      }
    });
  }

  state = {
    heartRate: 0,
    data: []
  }

  render() {
    return <View style={styles.heartCardContainer}>
      <LinearGradient
        colors={['#ff6969ff', '#ff9472ff']}
        style={styles.heartCard}
      >
        <View style={styles.heartInfoContainer}>
          <View style={styles.heartRateCounter}>
            {this.state.heartRate < 10 &&
                <Text style={styles.heartRateSubtleText}>0</Text>
            }
            {this.state.heartRate < 100 &&
                <Text style={styles.heartRateSubtleText}>0</Text>
            }
            <Text style={styles.heartRateText}>{this.state.heartRate}</Text>
          </View>
          <Text style={styles.heartRateInfo}>beats per minute</Text>
        </View>
        <View style={styles.heartGraphContainer}>
          <LineChart
            style={{ height: '100%' }}
            data={this.state.data}
            svg={{
              stroke: 'rgba(255,255,255,0.75)',
              strokeWidth: 3
            }}
            contentInset={{ top: 20, bottom: 20 }}
          >
          </LineChart>
        </View>
      </LinearGradient>
    </View>;
  }
}
