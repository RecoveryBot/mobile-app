import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Card, Overlay, Button, Input } from 'react-native-elements'
import { Icon, WebBrowser } from 'expo';
import styles from '../styles.scss';
import { TitleBar } from '../components/TitleBar';
import * as config from "../env";

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    header: <TitleBar title="Contacts"></TitleBar>
  };

  state = {
    isFriendModalVisible: false,
    isHotModalVisible: false,
    isAddModalVisible: false,
    isSentModalVisible: false,
    userName: "",
    contactName: '',
    contactNumber: ''
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
    let msg = `Hey! Nadya could really use your support at this time! Please call when you’re available`
    const sendText = await fetch(`https://unitingdust.api.stdlib.com/examples-twilio@dev/?tel=9253395106&body=${encodeURIComponent(msg)}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    });
    this.setState({ isFriendModalVisible: !this.state.isFriendModalVisible });
    this.setState({ isSentModalVisible: !this.state.isSentModalVisible });
  }

  callHotline = () => {
    alert("Hotline Called");
    Linking.openURL('tel:+19737989785');
    this.setState({ isHotModalVisible: !this.state.isHotModalVisible });
  }

  saveContact = async () => {
    const postContacts = await fetch(`${config.server}contacts?userId=nadyafebiana@gmail.com&contactName=${this.state.contactName}&contactPhone=${this.state.contactNumber}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit'
    });
    this.setState({ isAddModalVisible: !this.state.isAddModalVisible });
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <ScrollView style={styles.homeContainer} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity
          onPress={this.handleFriend}
          style={styles.contactCardContainer}
        >
          <Card containerStyle={styles.contactCard} wrapperStyle={styles.contactCardInner}>
            <Icon.Ionicons
              name="md-people"
              size={40}
              color="#626d81"
            />
            <Text style={styles.contactText}>Contact a Friend</Text>
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
        <Overlay 
          isVisible={this.state.isSentModalVisible}
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isSentModalVisible: false })}>
          <View style={styles.modalContent}>
            <Text style={{fontSize:20}}>Message Sent! You should receive a response shortly</Text>
          </View>
        </Overlay>
        <TouchableOpacity
          onPress={this.handleHotline}
          style={styles.contactCardContainer}
        >
          <Card containerStyle={styles.contactCard} wrapperStyle={styles.contactCardInner}>
            <Icon.Ionicons
              name="md-warning"
              size={40}
              color="#626d81"
            />
            <Text style={styles.contactText}>Contact National Hotline</Text>
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
          onPress={this.handleAddFriend}
          style={styles.contactCardContainer}
        >
          <Card containerStyle={styles.contactCard} wrapperStyle={styles.contactCardInner}>
            <Icon.Ionicons
              name="md-add-circle"
              size={40}
              color="#626d81"
            />
            <Text style={styles.contactText}>Add a Contact</Text>
          </Card>
        </TouchableOpacity>
        <Overlay 
          isVisible={this.state.isAddModalVisible}
          width={250}
          height={250}
          onBackdropPress={() => this.setState({ isAddModalVisible: false })}>
          <View>
            <Text style={{fontSize:20}}>Enter Contact Info</Text>
            <Input 
            placeholder="Name"
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#626d81' }}
            leftIconContainerStyle={{marginRight: 10}}
					  onChangeText={contactName => this.setState({ contactName })}
            value={this.state.contactName}
            />
            <Input 
            placeholder="Phone number"
            leftIcon={{ type: 'font-awesome', name: 'phone', color: '#626d81' }}
            leftIconContainerStyle={{marginRight: 10}}
            keyboardType="phone-pad"
					  onChangeText={contactNumber => this.setState({ contactNumber })}
            value={this.state.contactNumber}
            />
            <Button 
                title='Save'
                onPress={this.saveContact}
                raised
                type='outline'
                containerStyle={{width: 130, marginBottom:0}}>
              </Button>
          </View>
        </Overlay>
        </ScrollView>
      </View>
    );
  }
}
