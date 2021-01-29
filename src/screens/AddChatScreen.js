import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { db } from '../../firebase'

const AddChatScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats'
    })
  }, [])

  const [input, setInput] = useState('');

  const handleCreate = async() => {
    await db.collection('chats').add({
      chatName: input
    })
    .then(() => {
      navigation.goBack()
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  return (
    <View style={styles.container}>
      <Input 
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={handleCreate}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} />
        }
      />
      <Button title='Create New Chat' onPress={handleCreate}/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    height: '100%'
  }
})
