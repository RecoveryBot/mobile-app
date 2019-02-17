import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, Dimensions} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo';

export default class Login extends React.Component {
  state = { email: '', name: ''}

  handleSignup = async () => {
    const { email, name} = this.state
    this.props.navigation.navigate('Home', {email: email, name: name})
	}

  render() {
    return (
      <LinearGradient
        colors={['#ff6969ff', '#ff9472ff']}
        style={{width: '100%', height: '100%'}}
      >
            <StatusBar
				barStyle="light-content"
			/>
			<View style={styles.container}>
				<Image
          source={require('../assets/images/logo.png')}
          style={{
            width: Dimensions.get('window').width * 0.75,
            height: Dimensions.get('window').width * 0.75
          }}
          resizeMode='contain'
        />
                <Input
					placeholder='Name'
					placeholderTextColor='#fff'
					autoCapitalize="words"
					inputStyle={{color: 'white'}}
                    leftIcon={{ type: 'font-awesome', name: 'user', color: '#fff' }}
                    leftIconContainerStyle={{marginRight: 10}}
					onChangeText={email => this.setState({ name })}
                    value={this.state.name}
				/>
				<Input
					placeholder='Email'
					placeholderTextColor='#fff'
					autoCapitalize="none"
					inputStyle={{color: 'white'}}
                    leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#fff' }}
                    leftIconContainerStyle={{marginRight: 10}}
					onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    keyboardType="email-address"
				/>

				{this.state.errorMessage &&
							<Text style={{ color: '#ff4a66', fontSize: 16, padding: 5}}>
								{this.state.errorMessage}
							</Text>}
				<Button
					title="Sign Up"
					titleStyle={{color:"#1e4340" }}
					borderRadius={5}
					shake={true}
					buttonStyle={styles.button}
					onPress={this.handleSignup}
				/>
        </View>
		  </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
	  width: 250,
	  backgroundColor: '#66e2d6',
  },
  signupButton: {
		borderWidth: 0,
		backgroundColor: null
  }

})
