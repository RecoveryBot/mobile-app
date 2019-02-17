import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Card, Overlay, Button } from 'react-native-elements'
import { WebBrowser } from 'expo';

import styles from '../styles.scss';
import { TitleBar } from '../components/TitleBar';

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    header: <TitleBar title="Contacts"></TitleBar>
  };

  state = {
    isModalVisible: false,
  };

  handleFriend = () =>{
    this.setState({ isModalVisible: !this.state.isModalVisible }, ()=> {console.log("friend contacted")});
    console.log("friend contacted")
  }

  handleHotline() {
    console.log("Hotline contacted")
  }

  handleAddFriend(){
    console.log("Adding Friend")
  }

  render() {
    const email = this.props.navigation.getParam('email');
    return (
      <View style={styles.screenContainer}>
        <ScrollView style={styles.homeContainer} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity
          onPress={this.handleFriend}>
          <Card Title="Contact a Friend">
            <Text>Contact a Friend</Text>
          </Card>
        </TouchableOpacity>
        <Overlay
          isVisible={this.state.isModalVisible}
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isModalVisible: false })}>
          <View style={styles.modalContentR}>
            <Text style={{fontSize:20}}>How would you like to contact your friend</Text>
            <View style = {{flexDirection: "row",justifyContent: "space-around", marginVertical: 30}}>
              <Button
                title='Call'
                onPress={this.handleFriend}
                raised
                type='outline'
                containerStyle={{width: 130}}>
              </Button>
              <Button
                title='Text'
                onPress={this.handleFriend}
                raised
                type='outline'
                containerStyle={{width: 130}}>
              </Button>
            </View>
          </View>
        </Overlay>
        <TouchableOpacity
          onPress={this.handleHotline}>
          <Card Title="Contact National Hotline">
            <Text>Contact National Hotline</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleAddFriend}>
          <Card Title="Add a Contact">
            <Text>Add a Contact</Text>
          </Card>
        </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}
