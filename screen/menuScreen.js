import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MenuScreen() {

   
    
      return (
        <View style={styles.container}>
          <Text>Menu</Text>
          <Button title="Go back"
        onPress={() => navigation.navigate('RayonStack')}
        />
        <Button title="Go produit"
        onPress={() => navigation.navigate('Produit')}
        />
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4E937A',
        alignItems: 'center',
        justifyContent: 'center',
    },
});