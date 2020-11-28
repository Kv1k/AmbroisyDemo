import React, {useState, useEffect} from 'react';
import {  Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {  Card, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppLoading } from 'expo';

import {
  useFonts,
  HindSiliguri_300Light,
  HindSiliguri_400Regular,
  HindSiliguri_500Medium,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold,
} from '@expo-google-fonts/hind-siliguri';


export default function ProfilScreen({navigation}) {
 
  const [opSulfites, setopSulfites] = useState(false);
  const [opOeuf, setopOeuf] = useState(false);
  const [opSesame, setopSesame] = useState(false);
  const [opLait, setopLait] = useState(false);
  const [opCeleri, setopCeleri] = useState(false);
  const [opSoja, setopSoja] = useState(false);
  const [opBle, setopBle] = useState(false);

  const db = firebase.firestore();

  const iduser = '';

     //useeffect d' initialisation
     useEffect( () => { 
     
       async function getDataUser() {

        //Firestore (users)
        const doc = await db.collection('users').doc('e07HEzIRGQRIwBFw0E2k').get()
          
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());

            setopBle(doc.allergene_BLE);
            setopCeleri(doc.allergene_CELERI);
            setopLait(doc.allergene_LAIT);
            setopOeuf(doc.allergene_OEUF);
            setopSesame(doc.allergene_SESAME);
            setopSoja(doc.allergene_SOJA);
            setopSulfites(doc.allergene_SULFITE);
          }
        
        
    
        
        //LocalStorage
        const userValue = await AsyncStorage.getItem('user'); 

        try {

          if(userValue != null){
                userValue = JSON.parse(userValue) ;
                setopSulfites(userValue.allergene_Sulfites);
                setopOeuf(userValue.allergene_Oeuf);
                setopSesame(userValue.allergene_Sesame);
                setopLait(userValue.allergene_Lait);
                setopCeleri(userValue.allergene_Celeri);
                setopSoja(userValue.allergene_Soja);
                setopBle(userValue.allergene_Ble);
          }

        } catch(e) {
          // error reading value
        }
      }
      getDataUser();
     }
     
     , []);
     


 //   useEffect après MAJ des allergenes enregistre dans Firestore et dans le Local Storage
  useEffect(() => { 
  async function opAllergene(){
    
    const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
    const user = await firebase.auth().currentUser;
    
    db.collection('users').doc('e07HEzIRGQRIwBFw0E2k')
    .update({
      allergene_BLE : opBle,
      allergene_CELERI : opCeleri,
      allergene_LAIT : opLait,
      allergene_OEUF : opOeuf,
      allergene_SESAME : opSesame,
      allergene_SOJA : opSoja,
      allergene_SULFITE : opSulfites

    })
    let userData = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      token: idTokenResult.token,
      allergene_Oeuf: opOeuf,
      allergene_Sulfites: opSulfites,
      allergene_Sesame: opSesame, 
      allergene_Lait: opLait,
      allergene_Celeri: opCeleri,
      allergene_Soja: opSoja,
      allergene_Ble: opBle}
        
      try {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } 
        catch (e) {
          console.log(e);
        }
        
      }
      opAllergene();
    } 
    
, [opSulfites, opOeuf, opSesame, opLait, opCeleri, opSoja, opBle]);
 


//fonction appellé lorsqu'on clique sur le bouton de validation
async function goToMap(){
  const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
  const user = await firebase.auth().currentUser;
  
  let userData = {
    name: user.displayName,
    email: user.email,
    uid: user.uid,
    token: idTokenResult.token,
    allergene_Oeuf: opOeuf,
    allergene_Sulfites: opSulfites,
    allergene_Sesame: opSesame, 
    allergene_Lait: opLait,
    allergene_Celeri: opCeleri,
    allergene_Soja: opSoja,
    allergene_Ble: opBle}
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    navigation.navigate('Map');
    console.log("userData", userData);
  } catch (e) {
    console.log(e);
  }
}

let [fontsLoaded] = useFonts({
  HindSiliguri_300Light,
  HindSiliguri_400Regular,
  HindSiliguri_500Medium,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold,
});
if(! fontsLoaded){
  return  < AppLoading /> 
}else{
  


  return (
    
<View style={{ marginTop:29, alignItems:'center', justifyContent:'center' }}>
    
    <Card containerStyle={{ width: 300,height:400,  borderRadius:15, shadowColor: "black",
      padding:0,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
      alignItems:'center',
      justifyContent:'center' 
              

    }}>
        
      

        <Text
          style={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161'}}
          containerStyle={{backgroundColor:'white', borderColor:'white', marginTop:20, marginBottom:20}}
          value={opSulfites}
          onPress={()=> opSulfites ? setopSulfites(false) : setopSulfites(true) }
          >Les sulfites ?      {opSulfites ? "👍" : "👎"}</Text>

      <Card.Divider style={{width:240, marginLeft:10}}/>

        <Text
          style={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161' }}
          containerStyle={{backgroundColor:'white', borderColor:'white', marginTop:20, marginBottom:20}}
          value={opOeuf}
          onPress={()=> opOeuf ? setopOeuf(false) : setopOeuf(true) }
        >Les oeufs ? {opOeuf ? "👍" : "👎"}</Text>

      <Card.Divider style={{width:240, marginLeft:10}}/>


      <Text
        style={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161'}}
        containerStyle={{backgroundColor:'white', borderColor:'white', marginTop:20, marginBottom:20}}
        containerStyle={{backgroundColor:'white', borderColor:'white',  marginBottom:21}}
        value={opSesame}
        onPress={()=> opSesame ? setopSesame(false) : setopSesame(true)}
        >Le sésame ? {opSesame ? "👍" : "👎"}</Text>

      <Card.Divider style={{width:240, marginLeft:10}}/>

      <Text
        style={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161'}}
        containerStyle={{backgroundColor:'white', borderColor:'white', marginTop:20, marginBottom:20}}
        value={opLait}
        onPress={()=> opLait ? setopLait(false) : setopLait(true)}
        >Le lait ? {opLait ? "👍" : "👎"}</Text>

      <Card.Divider style={{width:240, marginLeft:10}}/>

      <Text
        style={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161'}}
        containerStyle={{backgroundColor:'white', borderColor:'white', marginTop:20, marginBottom:20}}
        value={opCeleri}
        onPress={()=> opCeleri ? setopCeleri(false) : setopCeleri(true)}
        >Le céleri ? {opCeleri ? "👍" : "👎"}</Text>

      <Card.Divider style={{width:240, marginLeft:10}}/>
  
      <Text
        style={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161'}}
        containerStyle={{backgroundColor:'white', borderColor:'white', marginTop:20, marginBottom:20}}
        value={opSoja}
        onPress={()=> opSoja ? setopSoja(false) : setopSoja(true)}
      >Le soja ? {opSoja ? "👍" : "👎"}</Text>

      <Card.Divider style={{width:240, marginLeft:10}}/>

      <Text
         style={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161'}}
          containerStyle={{backgroundColor:'white', borderColor:'white', marginTop:20, marginBottom:20}}
         value={opBle}
         onPress={()=> opBle ? setopBle(false) : setopBle(true)}
      >Le blé ? {opBle ? "👍" : "👎"}</Text>

<TouchableOpacity
          activeOpacity={.8} //The opacity of the button when it is pressed
          style = {styles.valider}
          onPress = {() => goToMap()}
        >
          <Icon
              name="check"
              size={20}
              color="white"
              style= {{
                alignSelf: 'center'
              }}
          />
        </TouchableOpacity>   


    </Card>


    <View
        style={{
            
            bottom: 10,
            alignSelf: 'flex-start', //for align to right
        }}
      >

   
        
      </View>

  </View>

  );}
}

const styles = StyleSheet.create({
  valider: {
    alignSelf:'center',
    justifyContent:'center',
    alignContent: 'center',
    borderWidth: 7,
    borderColor: "rgba(255, 255, 255, 1)",
    borderRadius: (100/2),
    width: 50,
    height: 50,
    marginTop: 0,
    marginLeft: 0,
    backgroundColor: "rgba(255, 0, 0, 1)"
  },
  text: {
    color: "#ffffff"
  }
});
