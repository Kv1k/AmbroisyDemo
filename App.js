import * as React from 'react';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import TutoScreen from './screen/tutoScreen';
import LoginScreen from './screen/loginScreen';
import RegisterScreen from './screen/registerScreen';

import RayonScreen from './screen/rayonsScreen';
import ProduitScreen from'./screen/produitScreen';

import ScanScreen from './screen/scanScreen';
import ProfilScreen from './screen/profilScreen';
import PanierScreen from './screen/panierScreen';
import MapScreen from './screen/mapScreen';




//const db = firebase.firestore();


const Stack= createStackNavigator();
const Tab = createBottomTabNavigator();


function MenuScreen(){
  return(
  <Stack.Navigator headerMode= 'none'>
    <Stack.Screen name="Rayon" component={RayonScreen} />
    <Stack.Screen name="Produit" component={ProduitScreen} />
  </Stack.Navigator>
 )
  
}

function Bottom() {
  return (
    <Tab.Navigator 
    initialRouteName='Map'
    screenOptions={({ route }) => ({
      tabBarIcon: ({  focused, color, size  }) => {
        
        
        if (route.name === 'Menu') {
          size = focused
          ? 35
          : 28;
          return <Entypo name="shop" color={color} size={size} />

            
        } else if (route.name === 'Scan') {
          size = focused
          ? 35
          : 28;
          return <FontAwesome name="barcode" color={color} size={size} />

        }
        else if (route.name === 'Map') {
          size = focused
          ? 35
          : 28;
          return  <Feather name="map"  color={color} size={size} />

        }
        else if (route.name === 'Panier') {
          size = focused
          ? 35
          : 28;
          return  <FontAwesome5 name="shopping-basket" size={size} color={color} />

        }
        else if (route.name === 'Profil') {
          size = focused
            ? 35
            : 28;
          return  <MaterialIcons name="account-circle"  color={color} size={size}/>

        }

        
      
      },
    })}
    tabBarOptions={{
      showLabel:false,
      activeTintColor: '#FB2343',
      inactiveTintColor: '#777777',
    }}
  >       
  

   
    <Tab.Screen name="Menu" component={MenuScreen} />
    <Tab.Screen name="Scan" component={ScanScreen} />
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="Panier" component={PanierScreen} />
    <Tab.Screen name="Profil" component={ProfilScreen} />

  </Tab.Navigator>
  );
}


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator     headerMode= 'none'>
        <Stack.Screen name="Tuto" component={TutoScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Bottom} />
        <Stack.Screen name="Profil" component={ProfilScreen} />


      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

