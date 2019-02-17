import React from 'react';
import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { DirectLine } from "botframework-directlinejs";
import styles from '../styles.scss';
import * as Config from "../env";
import { Icon } from 'react-native-elements';

import { TitleBar } from '../components/TitleBar';

const directLine = new DirectLine({
  secret: Config.SECRET_KEY
});

const botMessageToGiftedMessage = botMessage => ({
  ...botMessage,
  _id: botMessage.id,
  createdAt: botMessage.timestamp,
  user: {
    _id: 2,
    name: "React Native",
    avatar:
      "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-business-man-399587fe24739d5a-512x512.png"
  }
});
function giftedMessageToBotMessage(message) {
  return {
    from: { id: 1, name: "John Doe" },
    type: "message",
    text: message.text
  };
}
export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: <TitleBar title="Chat"></TitleBar>
  };

  state = {
    messages: []
  };

  constructor(props) {
    super(props);
    directLine.activity$.subscribe(botMessage => {
      const newMessage = botMessageToGiftedMessage(botMessage);
      if(newMessage.from.id !== '1' ){
        this.setState({ messages: [newMessage, ...this.state.messages] });
      }
    });
  }

  onSend = messages => {
    this.setState({ messages: [...messages, ...this.state.messages] });
    messages.forEach(message => {
      directLine
        .postActivity(giftedMessageToBotMessage(message))
        .subscribe(() => console.log("success"), () => console.log("failed"));
    });
  };

  renderBubble(props) {
    return (
    <Bubble
      {...props}
      textStyle={{
        left: styles.bubbleTextLeft,
        right: styles.bubbleTextRight
      }}
      wrapperStyle={{
        left: styles.bubbleWrapperLeft,
        right: styles. bubbleWrapperRight,
      }}
    />)
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 50,
          margin: 5, 
          borderColor: '#ff6969', 
          borderWidth:1,
          borderTopColor: '#ff6969',
          borderTopWidth: 1,
        }}
      />)
  }

  renderSend(props) {
    return (
      <Send
        {...props}
        alwaysShowSend={true}
        containerStyle = {{borderRadius: 50, borderColor: '#ff6969', borderWidth:1, marginRight: 10, height:30,width:30, marginBottom:7, backgroundColor: '#ff6969'}}
        children={
          <Icon
            name='send'
            color='#fff'
            size = {20}
            iconStyle={{marginBottom: 4, marginLeft:2}}
          />
        }
      />)
  }

  render() {
    return (
      <View style={styler.container}>
        <GiftedChat 
          user={{ _id: 1 }}
          messages={this.state.messages}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderSend={this.renderSend}
          textInputProps={{color: '#626d81'}}
          onSend={this.onSend}

          />
          {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }
}

const styler = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#ffe9e9',
  },
});
