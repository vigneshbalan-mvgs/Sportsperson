import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'; // Correct import

const Notification = () => {
    const values = [
        {
        "Heading": "Team A is Ready",
        "Message": "Team A is ready play in Game Name in Location",
        "Timing": "39 min ago"
        },
        {
        "Heading": "Team B is Ready",
        "Message": "Team B is ready play in Game Name in Location",
        "Timing": "52 min ago"
        },
        {
            "Heading": "TeamC is Ready",
            "Message": "Team C is ready play in Game Name in Location",
            "Timing": "52 min ago"
        },
        {
            "Heading": "Team C is Ready",
            "Message": "Team C is ready play in Game Name in Location",
            "Timing": "52 min ago"
        }]
  return (
    <View style={styles.container}>
        <View style={styles.subContainer1}>
            <Text style={styles.headtext}>Notification</Text>
        </View>
        <View style={styles.subContainer2}>
            {values.map((items, key) => (
                <View key={key} style={styles.content}>
                    <View style={styles.headingContainer}>
                    <Text style={styles.texthead}>{items.Heading}</Text>
                    <AntDesign name="close" size={18} color="red" style={styles.icons} />
                    </View>
                    <Text style={styles.textmessage}>{items.Message}</Text>
                    <Text style={styles.texttime}>{items.Timing}</Text>
                </View>
            ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(260, 260, 200, 1)",
        height: "100%",
        width: "100%" 
    },
    subContainer1:{
        margin: 0,
        alignContent: "center",
        height: 30
    },
    headtext:{
        fontSize: 16,
        textAlign: "center"
    },
    content:{
        padding: 10,
        backgroundColor: "rgba(255,255,255,255)",
        borderRadius: 10,
        borderColor: "red",
        borderWidth: 1
    },
    subContainer2:{
        gap:10,
        margin: 10, 
    },
    texthead:{
        color: "red"
    },
    textmessage: {
        margin: 3,
        marginLeft: 4
    },
    endText: {
        color: "red"
        
    },
    headingContainer:{
        flex:0,
        flexDirection: 'row',
        justifyContent:"space-between"
    },
    texttime:{
        textAlign: 'right',
        color:'gray',
        fontSize: 10
    }
})

export default Notification