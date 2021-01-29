import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../../firebase';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleRegister = () => {
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      authUser.user.updateProfile({
        displayName: name,
        photoURL: imageUrl || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
      })
    })
    .catch(error => {
      alert(error.message)
    })
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Text h2 style={{marginBottom: 60}}>
        Create A Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input 
          placeholder='Full Name'
          type= 'text'
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input 
          placeholder='Email'
          type= 'email'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input 
          placeholder='Password'
          type= 'password'
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Input 
          placeholder='Profile Picture Url'
          type= 'text'
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
      </View>
      <Button raised title='Sign Up' onPress={handleRegister} containerStyle={styles.button} />
      <View style={{height: 100}} />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  }
})
