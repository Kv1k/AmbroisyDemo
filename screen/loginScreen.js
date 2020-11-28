import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Button } from 'react-native-elements';
import { AppLoading } from 'expo';


import {
  useFonts,
  HindSiliguri_300Light,
  HindSiliguri_400Regular,
  HindSiliguri_500Medium,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold,
} from '@expo-google-fonts/hind-siliguri';

import firebase from '../database/firebase';

export default function LoginScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function userLogin(){
    if(email === '' || password === '') {
      Alert.alert('Entres les détails de connexion ')
    } else {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        let user = await firebase.auth().currentUser;
        let userData = {
          name: user.displayName,
          email: user.email,
          token: idTokenResult.token,
          uid: user.iud
        }
        try {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
          console.log(e);
        }
        setEmail('');
        setPassword('');
        navigation.navigate('Home');
      })
      .catch(error => {
          Alert.alert(error.message);
      });
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
    <View style={{ flex: 1 }}>
      <View style={styles.arrondi1}>
       
      </View> 
      <View style={styles.arrondi2}>

      </View>
      <View style={{ marginLeft:234,marginTop:-20, alignItems:'center', width:150}}>
        <Text style={{fontFamily:'HindSiliguri_700Bold',fontSize:28, color:'#FB2343'}}> Bonjour </Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:109}}>
     

      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
        
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Mot de passe"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />  
     
 
     
       
        <Text 
        style={{color: '#777777', fontSize:13, fontFamily:'HindSiliguri_600SemiBold', marginTop:6}}
        onPress={() => navigation.navigate('Register')}>
        
          Tu n'as pas de compte ? 
          <Text style={{color:'#FB2343', fontSize:13 ,fontFamily:'HindSiliguri_700Bold'}}> Inscrit-toi</Text>
        </Text>
        
       
      
      <Button
        title="S'identifier"
        onPress={() => userLogin()}
        buttonStyle= {styles.buttonStyle}
       
      />


      </View>
      

    </View>
  );
  }

 
}
const styles = StyleSheet.create({
  
  buttonStyle:{
      backgroundColor:'#FB2343',
      width:149,
      height:47,
      marginTop:29,
      
      borderRadius:22
  },
  inputStyle: {
    width: 316,
    height:51,
    marginBottom: 9,
    paddingBottom: 15,
    alignSelf: "center",
    borderRadius:15,
    borderWidth:1,
    borderColor:'#777777',
    paddingLeft:24,
    paddingTop:15,
    fontFamily:'HindSiliguri_500Medium',

  },
  
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  arrondi1:{
  
      width: 549,
      height:549,
      backgroundColor:'rgba(251, 35, 67, 0.24)',
      borderRadius: 300,  
      marginTop:-265,
      marginLeft:-260
      
  
  },
  arrondi2:{
  
    width:439,
    height:439,
    backgroundColor:'#FB2343',
    borderRadius: 300,  
    marginTop:-510,
    marginLeft:-223
    

}
});