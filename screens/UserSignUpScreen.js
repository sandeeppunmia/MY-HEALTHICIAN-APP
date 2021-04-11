import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,Image,TouchableOpacity ,Modal,ScrollView,KeyboardAvoidingView, Alert} from 'react-native';
import db from '../config';
import firebase from'firebase';
import BpScreen from './BpScreen';
import AppTabNavigator from '../components/AppTabNavigator';
import { RFValue } from 'react-native-responsive-fontsize';

export default class UserSignUpScreen extends Component{

    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            name:'',
            contact:'',
            isModalVisible:'false',
            confirmPassword:''
        }
    }

    userSignUp=(emailId,password,confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert("Password doesn't match\n Check your password")
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailId,password)
            .then(()=>{
                db.collection('users').add({
                    name:this.state.name,
                    contact:this.state.contact,
                    email_id:this.state.emailId
                })
                return Alert.alert('User Added Succesfully','',[{text:'Ok',onPress:()=>this.setState({'isModalVisible':false})}])
            })
            .catch(function(error){
                var errorCode = error.code
                var errorMessage = error.message
                return Alert.alert(errorMessage)
            })
        }
    }

    userLogin=(emailId,password)=>{
        console.log("in user login")
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then((response)=>{
            this.props.navigation.navigate('BpScreen')
        })
        .catch (function(error){
            var errorCode = error.code
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        })
    }

    showModal=()=>{
        return(
            <Modal
             animationType='fade'
             transparent={true}
             visible={this.state.isModalVisible}
             >
            <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                        <Text style={styles.modalTitle}>
                            Registration
                        </Text>

                        <TextInput style={styles.formTextInput}
                            placeholder={'Name'}
                            maxLength={30}
                            onChangeText={(text)=>{
                                this.setState({
                                    name:text
                                })
                        }}/>

                        <TextInput style={styles.formTextInput}
                            placeholder={'Email Id'}
                            keyboardType={'email-address'}
                            onChangeText={(text)=>{
                                this.setState({
                                    emailId:text
                                })
                        }}/>

                        <TextInput style={styles.formTextInput}
                            placeholder={'Contact'}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                    contact:text
                                })
                        }}/>

                        <TextInput style={styles.formTextInput}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                password:text
                            })
                        }}/>

                        <TextInput style={styles.formTextInput}
                            placeholder={"Confirm Password"}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                                this.setState({
                                    confirmPassword:text
                                })
                        }}/>

                        <View style={styles.modalBackButton}>
                            <TouchableOpacity
                               style={styles.registerButton}
                               onPress={()=>{
                                   this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                               }}>
                                    <Text style={styles.registerButtonText}>
                                        Register
                                    </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBackButton}>
                            <TouchableOpacity
                               style={styles.cancelButton}
                               onPress={()=>{
                                this.setState({
                                    'isModalVisible':'false'
                                })
                               }}>
                                    <Text style={{color:'ff57522'}}>
                                       Cancel
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
            </Modal>
        )
    }

    render(){
        return(
            <View style={styles.container}>
            {
                this.showModal()
            }
            <View style={{flex:0.25}}>
                <View style={{flex:0.15}}/>
                  <View style={styles.imageView}>
                      <Image source={require("../assets/healthician.png")}
                         style={styles.healthicianImage}/>
                  </View>
                </View>
                <View style={{flex:0.45}}>
                <View style={styles.textInput}>
                <TextInput 
                   style={styles.loginBox}
                   placeholder="abc@example.com"
                   keyboardType='email-address'
                   onChangeText={(text)=>{
                       this.setState({
                           emailId:text
                       })
                }}/>

                <TextInput 
                   style={styles.loginBox}
                   placeholder="Enter Password"
                   secureTextEntry={true}
                   onChangeText={(text)=>{
                       this.setState({
                           password:text
                       })
                }}/>

                <TouchableOpacity
                   style={[styles.button,{marginBottom:20,marginTop:20}]}
                   onPress={()=>{
                       this.userLogin(this.state.emailId,this.state.password)
                }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                   style={styles.button}
                   onPress={()=>{
                       this.setState({isModalVisible:true})
                }}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageView}>
                      <Image source={require("../assets/healthQuote.jpg")}
                         style={styles.healthQuote}/>
                  </View>
        </View>
    </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        backgroundColor:'#f08080'
    },
    formTextInput:{
        width:300,
        height:50,
        borderBottomWidth:1.5,
        borderColor:'#ff8a65',
        fontSize:20,
        margin:10,
        paddingLeft:50
    },
    modalBackButton:{},
    registerButton:{
        width:150,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'#ff9800',
        shadowColor:'#0000',
        shadowOffset:{
            width:0,
            height:0
        },
        shadowOpacity:0.30,
        shadowRadius:10.32,
        elevation:16
    },
    registerButtonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
    },
    cancelButton:{
        width:150,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'#ff9800',
        shadowColor:'#0000',
        shadowOffset:{
            width:0,
            height:0
        },
        shadowOpacity:0.30,
        shadowRadius:10.32,
        elevation:16
    },
    container:{
        flex:1,
        backgroundColor:'#786bee'
    },
    title:{
        fontSize:65,
        fontWeight:"300",
        paddingTop:50,
        color:'#ff3d00',
        paddingLeft:10
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:'#ff9800',
        shadowColor:'#0000',
        shadowOffset:{
            width:0,
            height:0
        },
        shadowOpacity:0.30,
        shadowRadius:10.32,
        elevation:16
    },
    loginBox:{
        width:300,
        height:50,
        borderBottomWidth:1.5,
        borderColor:'#ff8a65',
        fontSize:20,
        margin:10,
        paddingLeft:50
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
    },
    registerButton: {
        width: "75%",
        height: 50,
        marginTop:20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: "#32867d",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 10
      },
      registerButtonText: {
        fontSize:23,
        fontWeight: "bold",
        color: "#fff"
      },
      cancelButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#32867d",
        marginTop: 10
      },
      imageView: {
        flex: 0.85,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
      },
      healthicianImage: {
        width: "90%",
        height: "100%",
        resizeMode: "stretch"
      },
      healthQuote:{
        marginTop:180,
        width: "90%",
        height: RFValue(110),
        resizeMode: "stretch",
        marginBottom:RFValue(40)
      }
})