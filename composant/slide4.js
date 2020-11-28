import React from 'react';
import { View , Dimensions, Image} from 'react-native';
import {  Card } from 'react-native-elements';




const Slide4 = () =>{
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (




    <View style={{ marginTop:29,alignItems:'center', width:windowWidth }}>
    <Card containerStyle={{ width: 300,height:300,  borderRadius:15, shadowColor: "#000",
        padding:0,          
    
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
                
  
      }}>
         
         <Image source={require('../assets/tutoProduit.jpg')} style={{width:300, height:300, borderRadius:15}} />
      </Card>
  </View>
)}

export default Slide4
