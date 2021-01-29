import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { auth, db } from '../../firebase'
import * as firebase from 'firebase'

const ChatScreen = ({navigation, route}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chats',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Avatar rounded source={{uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'}}/>
          <Text 
            style={{
              color: '#fff',
              marginLeft: 10,
              fontWeight: '600',
              fontSize: 18
            }}  
          >{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 10
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='arrowleft' size={24} color='#fff' />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 20,
            width: 80
          }}
        >
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  useLayoutEffect(() => {
    const unsub = db.collection('chats')
    .doc(route.params.id)
    .collection('messages')
    .orderBy('timestamp')
    .onSnapshot((snapshot) => 
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    );
    return unsub;
  }, [route]);

  const[input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    Keyboard.dismiss();
    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })
    setInput('');
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar style='light'/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView contentContainerStyle={{paddingTop: 20, paddingHorizontal: 10}}>
              { messages && messages.map(({id, data}) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar 
                      rounded 
                      size={20} 
                      position='absolute'
                      bottom={-5}
                      right={-5}
                      source={{uri: data.photoURL}}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View style={styles.sender}>
                    <Avatar 
                      rounded 
                      size={20} 
                      position='absolute'
                      bottom={-5}
                      right={-5}
                      source={{uri: data.photoURL}}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput 
                placeholder='Signal Message' 
                style={styles.textInput}  
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity onPress={handleSend}>
                <Ionicons name='send' size={24} color='#2b68e6' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  reciever: {
    padding: 15,
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  }, 
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    paddingTop: 10,
    fontSize: 10,
    color: '#fff'
  },  
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%'
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
    backgroundColor: '#ececec'
  }
})
