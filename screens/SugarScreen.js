import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,Image,TouchableOpacity ,Modal,ScrollView,KeyboardAvoidingView, Alert} from 'react-native';
import db from '../config';
import firebase from'firebase';
import {RFValue} from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';

export default class SugarScreen extends Component{

constructor(){
    super();
    this.state={
        userId:firebase.auth().currentUser.email,
        name:'',
        age:'',
        sugar:'',
        date:''
    }
}

    componentDidMount(){
        this.getUserDetails()
    }

    getUserDetails=async()=>{
        var email=firebase.auth().currentUser.email;
        var requestRef= await db.collection('sugar').doc(this.state.userId)
        .get()
        .then((doc)=>{
            var name=doc.data().name
            console.log(name);
            console.log(doc.data().age);
            console.log(doc.data().sugar);
            this.setState({
                name:doc.data().name,
                age:doc.data().age,
                sugar:doc.data().sugar,
                date:doc.data().date
            })
        })
               var date1 = new Date().getDate()
                var date2 = this.state.date
                if(date2 - date1>20){
                    Alert.alert("Please Check Your Sugar")
                    this.playSound()
                }else{
                    Alert.alert("Your parametres are up to date")
                }
    }

    
updateUserDetails=()=>{
    db.collection('sugar').doc(this.state.userId)
    .update({
        'name':this.state.name,
        'age':this.state.age,
        'sugar':this.state.sugar,
        'date':new Date().getDate()
    })
    Alert.alert('Profile Updated Successfully')
}

playSound = async () => {
    await Audio.Sound.createAsync(
      {
        uri:"http://soundbible.com/mp3/Buzzer-SoundBible.com-188422102.mp3"
      },
      {
        shouldPlay:true
      }
    )
 }
    
    render(){
        return(
           
            <KeyboardAvoidingView style={styles.container}>
                <MyHeader title="Sugar" navigation ={this.props.navigation}/>
                <View style={styles.formContainer}>
                <View style={styles.imageView}>
                      <Image source={require("../assets/sugar2.jpg")}
                         style={styles.sugarImage}/>
                  </View>
                    <Text style={styles.label}>         Age        </Text>
                    <TextInput
                       style={styles.formTextInput}
                      // placeholder={'Age'}
                       keyboardType='numeric'
                       maxLength={3}
                       onChangeText={(text)=>{
                           this.setState({
                               age:text
                           })
                       }}
                       value={this.state.age}
                       />

                    <Text style={styles.label}>      Sugar      </Text>
                    <TextInput
                       style={styles.formTextInput}
                       //placeholder={'Blood Pressure'}
                       keyboardType='numeric'
                       maxLength={3}
                       onChangeText={(text)=>{
                           this.setState({
                               sugar:text
                           })
                       }}
                       value={this.state.sugar}
                       />

                       <TouchableOpacity style={styles.button}
                         onPress={()=>{
                                this.updateUserDetails()
                         }}>
                             <Text style={styles.buttonText}>Save</Text>
                         </TouchableOpacity>
                </View>
                <View style={styles.imageView}>
                      <Image source={require("../assets/sugar3.jpg")}
                         style={styles.sugarImage2}/>
                  </View>
           </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#6fc0b8'
    },
    button:{
        width:'100%',
        height:60,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        backgroundColor:'#32867d',
        shadowColor:'#000',
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.44,
        shadowRadius:10.32,
        elevation:16,
        marginTop:20,
        marginLeft:RFValue(175)
    },
    formTextInput:{
        width:'90%',
        height:50,
        alignSelf:'center',
        borderColor:'grey',
        borderRadius:2,
        borderWidth:1,
        marginTop:20,
        padding:10,
        marginBottom:20,
        marginLeft:20
    },
    formContainer:{
        flex:0.88,
        justifyContent:'center'
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
    },
    label:{
        fontSize:18,
        color:'#717d7e',
        fontWeight:'bold',
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:RFValue(120)
    },
    sugarImage:{
        width:RFValue(150),
        height:RFValue(100),
        resizeMode:'stretch',
        marginLeft:RFValue(250),
        borderColor:'black',
        marginTop:RFValue(75)
    },
    sugarImage2:{
        width:100,
        height:100,
        resizeMode:'stretch',
        marginRight:RFValue(250),
        borderColor:'black'
    }
})