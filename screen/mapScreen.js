import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {  Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MapView, {Marker, Circle} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as geolib from 'geolib';

import firebase from '../database/firebase';

export default function MapScreen({navigation}) {

  const [markets, setMarkets] = useState([]);

  const db = firebase.firestore();

  async function getMarkets(){
    let tab = [];
    const dbMarkets = await db
    .collection('product.shop')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        tab.push({...doc.data(), docName: doc.id});
      });
      setMarkets([...tab]);
    });
  }

  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [mapRegion, setMapRegion] = useState({latitude: 48.866667,
                                              longitude: 2.333333,
                                              latitudeDelta: 0.0922,
                                              longitudeDelta: 0.0421,})

  const [rayon, setRayon] = useState(400);
  const [zoom, setZoom] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    nom: "nom",
    horaire: ["h", "h", "h", "h", "h", "h", "h"],
    adresse: "adresse",
    phone: "0606060606"
  });




  useEffect(() => {
    async function askPermissions() {
      getMarkets();
      var { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        setCurrentLatitude(loc.coords.latitude);
        setCurrentLongitude(loc.coords.longitude);
        setMapRegion({latitude: loc.coords.latitude,
                      longitude: loc.coords.longitude,
                      latitudeDelta: 0.0156,
                      longitudeDelta: 0.012,})
        /*Location.watchPositionAsync({distanceInterval: 2},
          (location) => {
            setCurrentLatitude(location.coords.latitude);
            setCurrentLongitude(location.coords.longitude);
            setMapRegion({latitude: location.coords.latitude,
                          longitude: location.coords.longitude,
                          latitudeDelta: 0.0156,
                          longitudeDelta: 0.012,})
          }
        );*/
      }
    }
    askPermissions();
  }, []);

  function isInCircle(point){
    return geolib.isPointWithinRadius(point, {latitude: currentLatitude, longitude: currentLongitude}, rayon);
  }

  let marketInCircle = [];

  var markerMarket = markets.map((market, i) => {
    if(isInCircle({latitude: market.latitude, longitude: market.longitude})){
      marketInCircle.push({nom: market.docName});
      return (
          <Marker 
            key={i}
            pinColor="blue"
            coordinate={{ latitude: market.latitude, longitude: market.longitude }}
            title={market.nom}
            onPress={()=> setModal(market)}
          />
      );
    }
  });

  function rayonPlus(){
    let r = rayon;
    if(zoom>12)
      r += 100;
    else
      r += 1000;
    setRayon(r);
  }

  function rayonMoins(){
    let r = rayon;
    if(rayon>100){
      if(zoom>12)
        r -= 100;
      else
        if((r-1000)>100)
          r -= 1000;
        else
          r = 100;
    }
    setRayon(r);
  }

  function setModal(market){

    let horaires = [];
    let jour = '';
    market.horaire.map((h, i) => {
      switch(i) {
        case 0:
          jour = 'Lundi';
          break;

        case 1:
          jour = "Mardi";
          break;

        case 2:
          jour = "Mercredi";
          break;

        case 3:
          jour = "Jeudi";
          break;

        case 4:
          jour = "Vendredi";
          break;

        case 5:
          jour = "Samedi";
          break;

        case 6:
          jour = "Dimanche";
          break;
      }
      horaires.push(
        jour + ": " + h + '\n'
      );
    });
    
    setModalInfo({
      nom: market.nom + '\n',
      horaire: horaires,
      adresse: market.adresse + '\n',
      phone: market.phone + '\n'
    });
    showModal();
    
  }

  function showModal (){
    setIsModalVisible(!isModalVisible);
  }

  async function goToRayon(){
    console.log(marketInCircle);
    try {
      await AsyncStorage.setItem('markets', JSON.stringify(marketInCircle));
      navigation.navigate('Menu');
    } catch (e) {
      console.log(e);
    }
  }
    
  return (

    <View style={{flex : 1, justifyContent: 'center', alignItems: 'center'}}>

      <MapView style={{flex : 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}
        region={mapRegion}
        onRegionChangeComplete = {(region) => {
          //console.log(" region", region);
          let zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
          setZoom(zoom);
          setMapRegion(region);
        }}
      >

        <Marker key={"currentPos"}
          pinColor="red"
          title="Hello"
          description="I'am here"
          coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
        />
        {markerMarket}

        <Circle
          center = {{latitude: currentLatitude, longitude: currentLongitude}}
          radius = {rayon}
          strokeColor = {'#0660F4'}
          strokeWidth = {2}
          fillColor = {'rgba(98, 154, 244, 0.4)'}
        />

      </MapView>

      <View
        style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'flex-end', //for align to right
        }}
      >
        <Button
          type= "solid"
          buttonStyle= {styles.button}
          icon= {
            <Icon
              name="plus"
              size={15}
              color="black"
            />
          }
          onPress = {() => rayonPlus()}
        />

        <Button
          type= "solid"
          buttonStyle= {styles.button}
          icon= {
            <Icon
              name="minus"
              size={15}
              color="black"
            />
          }
          onPress = {() => rayonMoins()}
        />

      </View>

      <View
        style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'flex-start', //for align to right
        }}
      >

        <TouchableOpacity
          activeOpacity={.8} //The opacity of the button when it is pressed
          style = {styles.valider}
          onPress = {() => goToRayon()}
        >
          <Icon
              name="check"
              size={50}
              color="white"
              style= {{
                alignSelf: 'center'
              }}
          />
        </TouchableOpacity>      
        
      </View>

      <Modal isVisible={isModalVisible} style={{
                                          flex : 1,
                                          position: 'absolute',
                                          top: '5%',
                                          alignSelf: 'center'
                                        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 300, height: 400 , backgroundColor: '#ffffff', borderRadius: 20}}>
          <Text style={{fontWeight: 'bold', marginTop: 10}}>{modalInfo.nom}</Text>
          <Text>{modalInfo.horaire[0]}</Text>
          <Text>{modalInfo.horaire[1]}</Text>
          <Text>{modalInfo.horaire[2]}</Text>
          <Text>{modalInfo.horaire[3]}</Text>
          <Text>{modalInfo.horaire[4]}</Text>
          <Text>{modalInfo.horaire[5]}</Text>
          <Text>{modalInfo.horaire[6]}</Text>
          <Text style={{marginLeft: 6, marginRight: 6}}>{modalInfo.adresse}</Text>
          <Text>{modalInfo.phone}</Text>
          <Button style={{PaddingBottom: 60 }} title="Fermer" onPress={() => showModal()} />
        </View>
      </Modal>

    </View>

  );
}

const styles = StyleSheet.create({
  button: {
    width: 29,
    marginRight: 10,
    backgroundColor: "rgba(255, 255, 255, 1)"
  },
  valider: {
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 1)",
    borderRadius: (100/2),
    width: 100,
    height: 100,
    marginLeft: 10,
    backgroundColor: "rgba(255, 0, 0, 1)"
  },
  text: {
    color: "#ffffff"
  }
});
