import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { ListItem,Icon } from 'react-native-elements';
import { FlatList } from 'react-native';

export default class MembersScreen extends Component{

    constructor(){
        super();
        this.state={
            emailId: firebase.auth().currentUser.email,
            allMembers:[]
        }
        this.notificationRef = null;
    }

    getMemberDetails=()=>{
        this.requestRef = db.collection('members')
        .where("emailId","==",this.state.emailId)
        .onSnapshot((snapshot)=>{
            var allMembers = [];
            snapshot.docs.map((doc)=>{
                var members = doc.data()
                members["doc_id"] = doc.id
                allMembers.push(members)
            })
            this.setState({
                allMembers:allMembers
            })
        })
    }

    componentDidMount(){
        this.getMemberDetails()
    }

    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,index})=>{
        return(
        <ListItem
            key={i}
            bottomDivider>
            <ListItem.Content>
            <Image source={require("../assets/nameIcon.png")}
                style={styles.nameIcon}/>
                <ListItem.Title>
                    {item.memberName}
                </ListItem.Title>
                <ListItem.Subtitle>
                    {item.memberContact}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
        )
    }

    render(){
        return(
            <View style={{flex:1}}>
            <View style={{flex:0.1}}>
                <MyHeader Title={"Members"}
                navigation = {this.props.navigation}
                />
            </View>
            <View style={{flex:0.9}}>
                {
                    this.state.allMembers.length === 0?
                    (
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:25}}>
                                You have no members added
                            </Text>
                        </View>
                    )
                    :
                    (
                        <FlatList
                          keyExtractor={this.keyExtractor}
                          data={this.state.allMembers}
                          renderItem={this.renderItem}
                        />
                    )
                }
            </View>
        </View>
        )
    }
}

const styles=StyleSheet.create({
    nameIcon:{
        width:'20%',
        height:'60%'
    }
})