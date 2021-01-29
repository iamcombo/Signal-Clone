import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'


const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem 
      key={id} 
      onPress={() => enterChat(id, chatName)}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
        }}
      />
      <ListItem.Content>
        <ListItem.Title>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>
          {enterChat}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
