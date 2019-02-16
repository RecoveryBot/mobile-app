import React from 'react';
import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { DirectLine } from "botframework-directlinejs";

import * as Config from "../env";

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
    title: 'Chat',
  };

  state = {
    messages: []
  };

  constructor(props) {
    super(props);
    directLine.activity$.subscribe(botMessage => {
      const newMessage = botMessageToGiftedMessage(botMessage);
      this.setState({ messages: [newMessage, ...this.state.messages] });
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

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat 
          user={{ _id: 1 }}
          messages={this.state.messages}
          isAnimated = {true}
          onSend={this.onSend} 
          />
          {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
