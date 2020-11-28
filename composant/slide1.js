import React from 'react';
import { View , Dimensions, Image} from 'react-native';
import {  Card, CheckBox } from 'react-native-elements';




const Slide1 = () =>{
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height; 
  

  return ( 
   
   

  
  
  <View style={{ marginTop:29,alignItems:'center', width:windowWidth }}>
    
    <Card containerStyle={{ width: 300,height:300,  borderRadius:15, shadowColor: "black",
      padding:0,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
              

    }}>
{/*         
      <CheckBox
        title='Pas de lactose'
        textStyle={{fontFamily: 'HindSiliguri_400Regular', fontSize:14,color: '#616161'}}
        disabled={false}
        containerStyle={{backgroundColor:'white', borderColor:'white', marginTop:20, marginBottom:20}}
      />
    
      <Card.Divider style={{width:240, marginLeft:10}}/>
      <CheckBox
        title={ `Pas de crustacé` +icon  }
        textStyle={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161'}}
        containerStyle={{backgroundColor:'white', borderColor:'white', marginBottom:20}}
       
      />

      <Card.Divider style={{width:240, marginLeft:10}}/>
      <CheckBox
        title="Pas d'arachide"
        textStyle={{fontFamily: 'HindSiliguri_400Regular', fontSize:14, color: '#616161'}}
        containerStyle={{backgroundColor:'white', borderColor:'white',  marginBottom:21}}
      /> */}
      <Image source={require('../assets/tutoAllergie.jpg')} style={{marginLeft:10,width:280, height:280, borderRadius:15}}/>
    </Card>
  </View>
   
);
}


export default Slide1;
   
