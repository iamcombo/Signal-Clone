import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

import CustomListItem from '../componenst/CustomListItem'
import { db, auth } from '../../firebase'

const HomeScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: '#000' },
      headerTintColor: { color: '#000' },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={handleSignOut}>
            <Avatar rounded source={{uri: 'https://banner2.cleanpng.com/20180315/vrq/kisspng-logo-lion-shutterstock-red-gradient-lionhead-5aab05d93512d0.9761940315211575932174.jpg'}}/>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20
          }}
        >
          <TouchableOpacity>
            <AntDesign name='camerao' size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons onPress={() => navigation.navigate('AddChat')} name='pencil' size={24} />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsub = db.collection('chats')
    .onSnapshot((snapshot) => 
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })) 
      ) 
    )
    return unsub;
  }, [])

  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace('Login')
    })
  }

  const onEnterChat = (id, chatName) => {
    navigation.navigate('Chat', {id, chatName})
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id, data}) => 
          <CustomListItem 
            key={id} 
            id={id} 
            chatName={data.chatName} 
            enterChat={onEnterChat} 
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})
