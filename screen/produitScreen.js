import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, Image,  } from 'react-native';
import { CommonActions,  } from '@react-navigation/native';
import { Button, Card, Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign , MaterialIcons} from '@expo/vector-icons'; 

import { AppLoading } from 'expo';
import {
  useFonts,
  HindSiliguri_300Light,
  HindSiliguri_400Regular,
  HindSiliguri_500Medium,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold,
} from '@expo-google-fonts/hind-siliguri';

import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database/firebase';

import LoadingIcon from '../composant/loading';
import { color } from 'react-native-reanimated';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProduitScreen({navigation}) {
  
  const db = firebase.firestore();
  const [produits, setProduits]= useState([])
  const [visibleLoading, setVisibleLoading] = useState(false);
  const [visible, setVisible]= useState(false)
  const [ nom, setNom]= useState('')
  const [ description, setDescription]= useState('')
  const [ ingredient, setIngredient]= useState('')
  const [ nutriScore, setNutriScore]= useState('')

  var toggleOverlay = (nom, description, ingredient, nutriScore) => {
    setVisible(!visible);
    setNom(nom)
    setDescription(description)
    setIngredient(ingredient)
    setNutriScore(nutriScore)

  };

  //useEffect d'initilisation récupère la liste produit suivant les elements du Storage
  var tab=[]
  useEffect(() => {  
    
    setVisibleLoading(true);
    
    async function getMarkets(){

        //LocalStorage (user)
        try {
          const userValue = await AsyncStorage.getItem('user'); 
          if(userValue != null){
                userValue = JSON.parse(userValue) ;
                console.log("userValue: ", userValue)
               // userValue.allergene_Sulfites
               // userValue.allergene_Oeuf
               // userValue.allergene_Sesame
               // userValue.allergene_Lait
               // userValue.allergene_Celeri
               // userValue.allergene_Soja
               // userValue.allergene_Ble
          }

        } catch(e) {
          // error reading value
        }



        //LocalStorage (market)
        try {
          const marketValue = await AsyncStorage.getItem('markets', JSON.stringify(marketInCircle));
          if(marketValue != null){
                marketValue = JSON.parse(marketValue) ;
                console.log("marketValue: ", marketValue)
                // marketValue.nom = Array
          }

        } catch(e) {
          // error reading value
        }



        //LocalStorage (rayon)
        try {
          const rayonValue = await AsyncStorage.getItem('rayon');
          if(rayonValue != null){
                console.log("rayonValue: ", rayonValue)
                // rayonValue = String
          }

        } catch(e) {
          // error reading value
        }

//for ( i =0 ; i<marketValue.length ; i++){

  const dbProduct = db.collection('product.shop').doc('shop1').collection('surg')

  
 //await dbProduct.limit(30).get()
 //.then(snapshot => {
 //       
 // snapshot.forEach(doc => {
 //  tab.push({...doc.data()});
 //  });     
 //  console.log(tab.length)      
 //  setProduits([...tab])                     
 //})
//}

      
      await dbProduct.limit(30).get()
      
      .then(snapshot => {
             
       snapshot.forEach(doc => {
        tab.push({...doc.data()});
        });     
        console.log(tab.length)      
        setProduits([...tab])     
        setVisibleLoading(false)
                
      })
    }
    getMarkets()
    
  }, []);
  
  
  
 var alreadyExist;
  for (let i = 0; i<produits.length; i++){
    if (produits.nom === produits[i].nom){
      alreadyExist=true
      
    }else{
      alreadyExist=false
    }
 }

 if(!alreadyExist){
  var tab1= produits.slice(0, ((produits.length)/2))
  console.log(tab1)

    var listProduit1 = tab1.map((produit, i) => {
      var nom= produit.nom
      if(produit.nom.length> 40){
        nom= (produit.nom.slice(0,40)+'...')
      
      }
      
        return (
          <Card containerStyle={styles.card}>
            <View style={{ borderRadius:12,alignSelf:'center'}}>
               <Image source={{uri : produit.image}} 
          style={{width:99,  height:82, padding:30}}/>
            </View>
         
          <View style={{flexDirection:'row', marginTop:10,marginLeft:4}}> 
            <Text style={{fontFamily:'HindSiliguri_400Regular', fontSize:12, 
            alignSelf:'center', marginTop:-5, marginLeft:5, width:92, height:60}}>
              {nom}
            </Text>

            <Button 
            containerStyle={{marginLeft:13,  position:'absolute', marginTop:5}}
            icon={<MaterialIcons name="add-shopping-cart" size={24} color="white" />}
            buttonStyle={{backgroundColor:'#FB2343', width:50, height:38, borderRadius:11, marginLeft:89}}
            />
          
          </View>
          <Button
          containerStyle={{position:'absolute', marginLeft:130}}
          buttonStyle={{backgroundColor:'transparent'}}
          icon={
            <MaterialIcons name="info" size={24} color="#777777" />
          }
          onPress={()=>{toggleOverlay(produit.nom, produit.description, produit.ingredient, produit.nuti_score)}}
          />
        </Card>
        
        );
      
    });

    var tab2=produits.slice(((((produits.length)/2)+1)))

    var listProduit2 = tab2.map((produit, i) => {
      var nom= produit.nom
      if(produit.nom.length> 40){
        nom= (produit.nom.slice(0,40)+'...')
      
      }
      
        return (
          <Card containerStyle={styles.card}>
          <View style={{ borderRadius:12,alignSelf:'center'}}>
               <Image source={{uri : produit.image}} 
          style={{width:99,  height:82, padding:30}}/>
            </View>
          <View style={{flexDirection:'row', marginTop:10,marginLeft:4}}> 
            <Text style={{fontFamily:'HindSiliguri_400Regular', fontSize:12, 
            alignSelf:'center', marginTop:-5, marginLeft:5,  width:92, height:60}}>
              {nom}
            </Text>

            <Button 
            containerStyle={{marginLeft:13,  position:'absolute',  marginTop:5}}
            icon={<MaterialIcons name="add-shopping-cart" size={24} color="white" />}
            buttonStyle={{backgroundColor:'#FB2343', width:50, height:38, borderRadius:11, marginLeft:89}}
            />
          
          </View>
          <Button
          containerStyle={{position:'absolute', marginLeft:130}}
          buttonStyle={{backgroundColor:'transparent'}}
          icon={
            <MaterialIcons name="info" size={24} color="#777777" />
          }
          onPress={()=>{toggleOverlay(produit.nom, produit.description, produit.ingredient, produit.nuti_score)}}
          />
        </Card>
        );
      
    
  });
 } else{
   console.log('no data')
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
      <View style={{ flex:1}}>
       
      
        <ScrollView style={{ flex: 1}} >
          <View style={{flexDirection:'row', marginTop:40}}>

           
            <View style={{alignItems:'center',width:windowWidth,  }}>           
             <Text style={{fontFamily:'HindSiliguri_600SemiBold', fontSize:25, textAlign:'center', color:'#FB2343'}}>Surgelé</Text>
            </View>

          </View>
          <Overlay isVisible={visibleLoading}   width="auto" height="auto">
            <LoadingIcon/><Text>Loading</Text>
            
        </Overlay>
        <Overlay isVisible={visible}  onBackdropPress={()=>{toggleOverlay()}}  overlayStyle={{width:360, borderRadius:15}}>
        <Text style={{fontFamily:'HindSiliguri_300Light',fontWeight:'bold',
            color:'#FB2343',marginTop:10}}>
            Nom: 
            <Text style={{ color:'black', fontWeight:'normal'}}> {nom}</Text></Text>
            <Text style={{fontFamily:'HindSiliguri_300Light',fontWeight:'bold',
            color:'#FB2343',marginTop:10}}>
            Description: 
            <Text style={{ color:'black', fontWeight:'normal'}}> {description}</Text>
          </Text>
          <Text style={{fontFamily:'HindSiliguri_300Light',fontWeight:'bold',
            color:'#FB2343',marginTop:10}}>
            Ingredient: 
            <Text style={{ color:'black', fontWeight:'normal'}}> {ingredient}</Text>
          </Text>
          <Text style={{fontFamily:'HindSiliguri_300Light',fontWeight:'bold',
            color:'#FB2343',marginTop:10}}>
             Nutri-Score: 
            <Text style={{ color:'black'}}>{nutriScore}</Text>
          </Text>
            
        </Overlay>
          
          <View style={{flexDirection:'row',alignSelf:'center'}}>
            <View style={{flexDirection:'column'}}> 
            {listProduit1}  
            </View>
            <View style={{flexDirection:'column'}}> 
            {listProduit2}  
            </View>
            
          </View>

         

        </ScrollView>   
        <Button  
                containerStyle={{position:'absolute'}}
                buttonStyle={{width:50, height:39, backgroundColor:'transparent',marginLeft:6, marginTop:39}}
                icon={
                  <AntDesign name="back" size={29} color="#FB2343" />
                }
                onPress={() => navigation.dispatch(CommonActions.goBack())}
        />
      </View>
     
    );
  }
}
       
const styles = StyleSheet.create({
    card: {
      borderColor:'transparent',
      padding:0,
       width:170,
       height:151,
       borderRadius:25,
       shadowColor: "black",
       shadowOffset: {
        width: 0,
        height: 12,
      },
       shadowOpacity: 0.58,
       shadowRadius: 16.00,
       elevation: 15,  
      marginBottom:12 
    },
    textDesc:{
      fontFamily:'HindSiliguri_600SemiBold',
      color:'blue'
    },
    descContent:{
      fontFamily:'HindSiliguri_400Regular'
    }
});
export default ProduitScreen