import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import BackButton from '@components/back'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '@/const/colors'


const groupchat = () => {

  const staticData = [
    {"id": "1", "image": "PIC", "username": "FirstName", "notify": "Admin"},
    {"id": "2", "image": "PIC", "username": "FirstName", },
    {"id": "3", "image": "PIC", "username": "FirstName", },
    {"id": "4", "image": "PIC", "username": "FirstName", },
    ]
const render = ({item}) => {

return(
    
        <TouchableOpacity style={styles.third_headerContainer} >
            <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}} >
              <View style={styles.pic_Container}>
                  <Image style={{width:60 , height:60, borderRadius: 50, }} resizeMode="cover" source={require("@/assets/images/contnet.jpg")}/>
              </View>
              <View style={styles.messageContainer}>
                  <Text style={{alignSelf: 'flex-start'}} >{item.username}</Text>
              </View>
            </View>
        </TouchableOpacity >
)}

  return (
    <View>
        <View><BackButton/></View>
        <View>
            <View style={styles.container}>
                <Image style={{width:100 , height:100, borderRadius: 50, }} resizeMode="cover" source={require("@/assets/images/contnet.jpg")}/>
                <Text style={{margin: 10, fontSize:24, fontWeight:'500'}}>Group Name</Text>
            </View>
            <View style={styles.group}>
              <Text>Group Descriptions</Text>
            </View>
            <View style={styles.group}>
              <Text>Peoples</Text>
            </View>
        </View>
        <View style={styles.flatList}>
            <FlatList 
            data={staticData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={render}
            
            ListFooterComponent={() => <View style={{height: 100}}></View>}
          />
        </View>
    </View>
  )
}

export default groupchat;

const styles = StyleSheet.create({
    container:{
      padding:10,
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:"center",
        alignItems:"center",
        borderBlockColor:'black'
    },
    
  third_headerContainer:{
    display: 'flex',
    flexDirection:'row',
    alignItems: "center",
    justifyContent:'space-between',
    padding:10,
    borderBottomEndRadius: 0.5,
    marginVertical: 2,
    elevation: 0.5,
  },
  
  pic_Container:{
    height:60,
    width:60,
    borderRadius: 50, 
    backgroundColor: 'white',
    justifyContent:'center'
  },
  flatList:{
    padding:10,
    borderRadius:10
  },
  messageContainer:{
    display:'flex',
    flexDirection:'row',
    alignSelf:'auto'   
  },
  
  group:{
    margin:10,
    height: 60,
    gap:10
  }
  })