import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { GiftedChat, MessageContainer, InputToolbar, Actions, Bubble, SystemMessage } from 'react-native-gifted-chat';
import { Header, Body, Title } from 'native-base';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      'messages': [],
      name: '',
      text: '',
      createdAt: '',
      avatar: '',
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    // this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    // this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    //
    this._isAlright = null;
  }



  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('../bunkData/messages.js'),
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      console.log('previous state', previousState);
      return {
        isLoadingEarlier: true,
      };
    });

    //fetch call to server. get all messages in this trip.
    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('../bunkData/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onReceive(text) {
    console.log('on receive outside of return', text);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Tyrone Scafe',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    console.log('on Send', messages);

    // for demo purpose
    this.answerDemo(messages);
  }

  // need to figure out how to work sockets receiving input and
  // translating that to a {friend name} is typing... string
  // maybe a function that says onSocketNotification
  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'Tyrone is typing...'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive("Yeah, I'm on the way to Matt rn");
              console.log('reply', messages);
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 5000);
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: 'pink',
          }
        }}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText !== null) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}

            placeholder={'Type a message...'}

            user={{
              _id: 1,
            }}

            renderFooter={this.renderFooter}
            // renderBubble={this.renderBubble}
          />

    );
  }

}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
