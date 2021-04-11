import React, {Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet, Alert, Modal, Flatlist,KeyboardAvoidingView,ScrollView} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

export default class SettingScreen extends Component{

constructor(){
    super();
    this.state={
        emailId:'',
        name:'',
        contact:'',
        docId:''
    }
}

getUserDetails=()=>{
    var email=firebase.auth().currentUser.email;
    db.collection('users').where('email_id','==',email).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            var data= doc.data()
            this.setState({
                emailId:data.email_id,
                name:data.name,
                contact:data.contact,
                docId:doc.id
            })
        })
    })
}

componentDidMount(){
    this.getUserDetails()
}

updateUserDetails=()=>{
    db.collection('users').doc(this.state.docId)
    .update({
        'name':this.state.name,
        'contact':this.state.contact
    })
    Alert.alert('Profile Updated Successfully')
}

    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="Settings"
                  navigation={this.props.navigation}/>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>         Name</Text>
                        <TextInput 
                          style={styles.formTextInput}
                          placeholder={'Name'}
                          maxLength={30}
                          onChangeText={(text)=>{
                              this.setState({
                                  name:text
                              })
                          }}
                          value={this.state.name}
                          />
                           <Text style={styles.label}>Contact Number</Text>
                          <TextInput 
                          style={styles.formTextInput}
                          placeholder={'Contact'}
                          maxLength={10}
                          keyboardType={'numeric'}
                          onChangeText={(text)=>{
                              this.setState({
                                  contact:text
                              })
                          }}
                          value={this.state.contact}
                          />

                          <TouchableOpacity style={styles.button}
                            onPress={()=>{
                                this.updateUserDetails()
                            }}>
                                <Text style={styles.buttonText}>SAVE</Text>
                            </TouchableOpacity>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#6fc0b8'
    },
    button:{
        width:'75%',
        height:RFValue(60),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:RFValue(50),
        backgroundColor:'#32867d',
        shadowColor:'#000',
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.44,
        shadowRadius:10.32,
        elevation:16,
        marginTop:RFValue(20),
        marginLeft:RFValue(80)
    },
    formTextInput:{
        width:'90%',
        height:RFValue(50),
        alignSelf:'center',
        borderColor:'grey',
        borderRadius:2,
        borderWidth:1,
        marginTop:20,
        padding:RFValue(10),
        marginBottom:RFValue(20),
        marginLeft:RFValue(20)
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
        fontSize:RFValue(18),
        color:'#717d7e',
        fontWeight:'bold',
        padding:RFValue(10),
        marginLeft:RFValue(20)
    }
})