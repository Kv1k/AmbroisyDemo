import React from 'react';
import {  Text, View, StyleSheet } from 'react-native';

export default function PanierScreen() {
  return (
    <View style={{ flex: 1 }}>
      
      <View style={styles.arrondi1}>
       
       </View> 
      <View style={styles.arrondi2}></View>
   
    </View>
  );
}
const styles = StyleSheet.create({

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