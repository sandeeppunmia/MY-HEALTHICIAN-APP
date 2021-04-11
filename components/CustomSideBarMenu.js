import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
import {Avatar, Icon} from 'react-native-elements';
import * as Permissions from "expo-permissions";
import {RFValue} from 'react-native-responsive-fontsize';

export default class CustomSideBarMenu extends Component{

constructor(){
    super();
    this.state={
        userId:firebase.auth().currentUser.email,
        image:'#',
        name:'',
        docId:''
    }
}

selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + " " + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

        render(){
            return(
                <View style={{flex:1}}>
                <View style={{flex:0.5,alignItems:'center',backgroundColor:'orange'}}>
                    <Avatar 
                    rounded
                    source={{
                        uri:this.state.image
                    }}
                    size="ex-large"
                    onPress={()=>{
                        this.selectPicture()
                    }}
                    showEditButton/>
                    <Text style={{fontWeight:'300',fontSize:RFValue(20),color:'#ffffff',paddingTop:RFValue(10)}}>
                        {this.state.name}
                    </Text>
                    </View>
                    <View style={styles.drawerItemsContainer}>
                

                    <DrawerItems {...this.props}/>
                </View>
                <View style={styles.logOutContainer}>
                    <TouchableOpacity style={styles.logOutButton}
                    onPress={()=>{
                        this.props.navigation.navigate('UserSignUpScreen')
                        firebase.auth().signOut()
                    }}>
                      <Icon
                          name="logout"
                          type="antdesign"
                          size={RFValue(20)}
                          iconStyle={{paddingLeft:RFValue(10)}}/>
                        <Text style={{
                          fontSize:RFValue(15),
                          fontWeight:'bold',
                          marginLeft:RFValue(30)
                        }}>
                            LogOut
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            )
        }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    drawerItemsContainer:{
        flex:0.8
    },
    logOutContainer:{
        flex:0.2,
        justifyContent:'flex-end',
        paddingBottom:30
    },
    logOutButton:{
        height:30,
        width:'100%',
        justifyContent:'center',
        padding:10
    },
      logOutText: {
        fontSize: 15,
        fontWeight: "comic",
      },
      imageContainer: {
        flex: 0.75,
        width: "40%",
        height: "20%",
        marginLeft: 20,
        marginTop: 30,
        borderRadius: 40,
      }
})