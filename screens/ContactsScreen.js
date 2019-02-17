import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Card, Overlay, Button, Input } from 'react-native-elements'
import { WebBrowser } from 'expo';

import styles from '../styles.scss';
import { TitleBar } from '../components/TitleBar';

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    header: <TitleBar title="Contacts"></TitleBar>
  };

  state = {
    isFriendModalVisible: false,
    isHotModalVisible: false,
    isAddModalVisible: false,
    contactName: '',
  };

  handleFriend = () => {
    this.setState({ isFriendModalVisible: !this.state.isFriendModalVisible });
  }

  handleHotline = () => {
    this.setState({ isHotModalVisible: !this.state.isHotModalVisible });
  }

  handleAddFriend = () => {
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });
  }

  textFriend = async () => {
    let msg = "Hey there you ok buddy?"
    console.log("message about to go")
    const sendText = await fetch(`https://unitingdust.api.stdlib.com/examples-twilio@dev/?tel=9253395106&body=${encodeURIComponent(msg)}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit'
    });
  }

  callHotline = () => {
    alert("Hotline Called");
    this.setState({ isHotModalVisible: !this.state.isHotModalVisible });
  }

  render() {
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
          isVisible={this.state.isFriendModalVisible}
          onBackdropPress={() => this.setState({ isFriendModalVisible: false })}
          width="auto"
          height="auto">
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
                onPress={this.textFriend}
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
        <Overlay 
          isVisible={this.state.isHotModalVisible}
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isHotModalVisible: false })}>
          <View style={styles.modalContentR}>
            <Text style={{fontSize:20}}>Are you sure you want to call the hotline </Text>
            <View style = {{flexDirection: "row",justifyContent: "space-around", marginVertical: 30}}>
              <Button 
                title='Cancel'
                onPress={this.handleHotline}
                raised
                type='outline'
                containerStyle={{width: 130}}>
              </Button>
              <Button 
                title='Call Hotline'
                onPress={this.callHotline}
                raised
                type='outline'
                containerStyle={{width: 130}}>
              </Button>
            </View>
          </View>
        </Overlay>
        <TouchableOpacity
          onPress={this.handleAddFriend}>
          <Card Title="Add a Contact">
            <Text>Add a Contact</Text>
          </Card>
        </TouchableOpacity>
        <Overlay 
          isVisible={this.state.isAddModalVisible}
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isAddModalVisible: false })}>
          <View style={styles.modalContent}>
            <Text style={{fontSize:20}}>Enter Contact Info</Text>
            <Input 
            placeholder="Name"
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#626d81' }}
            leftIconContainerStyle={{marginRight: 10}}
					  onChangeText={contactName => this.setState({ contactName })}
            value={this.state.contactName}
            />
          </View>
        </Overlay>
        </ScrollView>
      </View>
    );
  }
}
