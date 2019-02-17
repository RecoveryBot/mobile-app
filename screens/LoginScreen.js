import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, StatusBar} from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends React.Component {
  state = { email: ''}

  handleLogin = async () => {
    const { email} = this.state
    

    this.props.navigation.navigate('Home', {email: email})
	}

  render() {
    return (
		<ImageBackground source={require('../assets/images/login-background.png')} style={{width: '100%', height: '100%'}}>
            <StatusBar
				barStyle="light-content"
			/>
			<View style={styles.container}>
				<Image source={require('../assets/images/logo.png')} style={{width: 100, height: 100}} resizeMode='contain' />
				<Input
					placeholder='Email'
					placeholderTextColor='#fff'
					autoCapitalize="none"
					inputStyle={{color: 'white'}}
                    leftIcon={{ type: 'font-awesome', name: 'user', color: '#fff' }}
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
					title="Login"
					titleStyle={{color:"#1e4340" }}
					borderRadius={5}
					icon={{
						name:'sign-in',
						size:20,
						color:'grey'
					}}
					iconRight
					shake={true}
					buttonStyle={styles.button}
					onPress={this.handleLogin} 
				/>
				<Text style={{color:'white'}}>Don't have an account?</Text>
						<Button
							title="Sign Up"
					onPress={() => this.props.navigation.navigate('SignUp')}
					buttonStyle={styles.signupButton}
					titleStyle={{fontSize:20, fontWeight:'bold' }}
						/>
            </View>
		</ImageBackground>
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