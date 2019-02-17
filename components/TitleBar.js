import React from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  Header
} from 'react-native-elements';
import styles from '../styles.scss';

export class TitleBar extends React.Component {
  render() {
    return <Header
      placement="left"
      leftComponent={{}}
      centerComponent={{
        text: 'Recovery Bot' + (this.props.title ? ' - ' + this.props.title : ''),
        style: styles.headerText
      }}
      rightComponent={{}}
      containerStyle={styles.header}
    />
  }
}
