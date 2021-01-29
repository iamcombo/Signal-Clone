import React, { useEffect, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../../firebase';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        navigation.replace('Home');
      }
    });
    return unsub;
  }, [])

  const handleSignIn = () => {
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      navigation.replace('Home');
    })
    .catch(err => alert(err.message));
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image 
        source={{
          uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
        }}
        style={{width: 200, height: 200}}
      />
      <View style={styles.inputContainer}>
        <Input 
          placeholder='Email' 
          type='email' 
          value={email} 
          onChangeText={text => setEmail(text)} 
        />
        <Input 
          placeholder='Password' 
          type='password' 
          value={password} 
          onChangeText={text => setPassword(text)} 
          secureTextEntry 
        />
      </View>
      <Button containerStyle={styles.button} title='Login' onPress={handleSignIn} />
      <Button containerStyle={styles.button} type='outline' title='Register' onPress={() => navigation.navigate('Register')} />
      <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: '#fff'
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10,
  }
})