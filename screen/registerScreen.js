import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Button } from 'react-native-elements';

import firebase from '../database/firebase';

export default function RegisterScreen({navigation}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const db = firebase.firestore();

    function registerUser() {
        if(email === '' || password === '') {
          Alert.alert('Entrez toutes les informations de connexion ')
        } else {
          setIsLoaded(true);
          firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            res.user.updateProfile({
              displayName: name
            });
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (result) => {
              const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
              const uidResult = await firebase.auth().currentUser.uid;
              console.log("iudResult", uidResult);
              console.log("tyofiudResult", typeof uidResult);
              db.collection('users').add({
                allergene_BLE : false,
                allergene_CELERI: false,
                allergene_LAIT : false,
                allergene_OEUF: false,
                allergene_SESAME: false,
                allergene_SOJA: false,
                allergene_SULFITE: false,
                email: email,
                uid: uidResult,
                name: name,
                token: idTokenResult.token
              });
              let user = await firebase.auth().currentUser;
              let userData = {
                name: user.displayName,
                email: user.email,
                token: idTokenResult.token
              }
              try {
                await AsyncStorage.setItem('user', JSON.stringify(userData));
              } catch (e) {
                console.log(e);
              }
              setName('');
              setEmail('');
              setPassword('');
              setIsLoaded(false);
              navigation.navigate('Profil');
            })
            .catch(error => {
                Alert.alert(error.message);
            });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('That email address is already in use!');
                setIsLoaded(false);
            }
        
            if (error.code === 'auth/invalid-email') {
                Alert.alert('That email address is invalid!');
                setIsLoaded(false);
            }
        
            console.error(error);
          });    
        }
    }

    if(isLoaded === true){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.arrondi1}>
       
       </View> 
      <View style={styles.arrondi2}>
 
      </View>
      <View style={{ marginLeft:234,marginTop:-20, alignItems:'center', width:150}}>
        <Text style={{fontFamily:'HindSiliguri_700Bold',fontSize:28, color:'#FB2343'}}> Bienvenue </Text>
      </View>
      <View style={{marginTop:90, alignItems:'center'}}>

      <TextInput
        style={styles.inputStyle}
        placeholder="Pseudo"
        onChangeText={(val) => setName(val)}
        value={name}
      />      
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
        style={{color: '#777777', fontSize:13, fontFamily:' HindSiliguri_600SemiBold', marginTop:6}}
        onPress={() => navigation.navigate('Login')}>
       Tu as déjà un compte ?
        <Text style={{color:'#FB2343', fontSize:13 ,fontFamily:'HindSiliguri_700Bold'}}> Identifie-toi</Text>

      </Text>
      <Button
        title="Se connecter"
        onPress={() => registerUser()}
        buttonStyle= {styles.buttonStyle}
      />

      </View>

    

    </View>
  );
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
  
  loginText: {
    color: '#009788',
    marginTop: 25,
    textAlign: 'center'
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