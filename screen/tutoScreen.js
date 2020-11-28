import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View , Dimensions,Text } from 'react-native';
import {  Button, Card } from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler'
import { AppLoading } from 'expo';
import * as Progress from 'react-native-progress';

import {
  useFonts,
  HindSiliguri_300Light,
  HindSiliguri_400Regular,
  HindSiliguri_500Medium,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold,
} from '@expo-google-fonts/hind-siliguri';

import Slide1 from '../composant/slide1'
import Slide2 from '../composant/slide2'
import Slide3 from '../composant/slide3'
import Slide4 from '../composant/slide4'



function TutoScreen ({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [progress, setProgress]= useState (0)

  


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
    <ImageBackground source={require('../assets/tutoImg.jpg')} style={{ flex:1 ,width:windowWidth,height:windowHeight, alignItems: 'center', }}>
      <ScrollView horizontal 
      pagingEnabled
      decelerationRate='fast'
      style={{ height:'65%'}}
      showsHorizontalScrollIndicator={false}
      onScroll={(progress)=>setProgress((progress.nativeEvent.contentOffset.x)/1000)} 

      
      >
      
        <View style={{flexDirection:'column'}}>
          <View>
            <Card containerStyle={{ width: 1420,height:220,marginLeft:110, 
            borderRadius:80,backgroundColor:'#FB2343',borderColor:'#FB2343', 
            marginTop:70,
            shadowColor: "black",
            shadowOffset: {
	          width: 0,
	          height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 30,
          
          }}>
                <View style={{flexDirection:'row'}} >
                  <View style={{flexDirection:'column',marginLeft:30, marginTop:10, width:255}} >
                    <Text style={{marginBottom:30,marginLeft:20,color:'white',fontFamily:'HindSiliguri_700Bold',fontSize:17}}>AMBROISY C'EST SIMPLE !</Text>
                    <Text style={styles.text}>1. Connecte-toi / Inscrit-toi</Text>
                    <Text style={styles.text}>2. Selectionne tes allergies ou/et intolérences</Text>
                  </View>
                  <View style={{flexDirection:'column',marginLeft:30, marginTop:40, width:255}} >
                    <Text style={styles.text}>3. Détermine les magasins ou le rayons d’achat autour de toi</Text>
                  </View>
                  <View style={{flexDirection:'column',marginLeft:170, marginTop:40, width:255}} >
                    <Text style={styles.text}>4.  Choisis les categories de produits que tu souhaites acheter</Text>
                  </View>
                  <View style={{flexDirection:'column',marginLeft:140, marginTop:40, width:255}} >
                    <Text style={styles.text}>5. Choisis les produits que tu souhaites acheter</Text>
                  </View>
                </View>
            </Card> 
          </View>
          <View style={{flexDirection:'row'}}>
            <Slide1/>
            <Slide2/>
            <Slide3/>
            <Slide4/>
          </View>
     
        </View>
       
      </ScrollView>
     

      <View style={{ flex: 1, flexDirection:'column',  height: windowHeight, width:windowWidth,alignItems:'center'}}>
       
           <Progress.Bar progress={progress} width={325}  
         color='#FB2343'
         unfilledColor='#AAACB0'
         borderColor='transparent'
         style={{marginTop:'8%'}}
          /> 
         <View style={{  flexDirection:'row'}}>
              <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
              buttonStyle= {styles.buttonStyleRegister}
              titleStyle={styles.titleRegister}
              
            />
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
              buttonStyle= {styles.buttonStyleLogin}
              titleStyle={styles.titleLogin}
            />
         
      </View>
        </View>
       

    </ImageBackground>
  )
  }
 
  
}
const styles = StyleSheet.create({
  
  buttonStyleRegister:{
    backgroundColor:'transparent',
    width: 149,
    height: 52,
    borderWidth: 1,
    borderColor:'#9B9B9B',
    borderRadius: 25,
    marginRight: 8,
    marginTop:'18%'
    
  },
  titleRegister:{
    color:'#FB2343',
    borderRadius: 10,
    fontFamily: 'HindSiliguri_400Regular',
    fontSize:13,
    fontWeight: 'bold'
   
  },
  buttonStyleLogin:{
    backgroundColor:'#FB2343',
    width: 149,
    height: 52,
    borderRadius: 25,
    marginTop:'18%',
    marginLeft: 8
    
  },
  titleLogin:{
    color:'white',
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    fontWeight: 'bold'
   
  },
  text:{
    marginBottom:19,
    marginLeft:20,
    color:'white',
    fontFamily:'HindSiliguri_700Bold',
    fontSize:17
  }
  
});
export default TutoScreen