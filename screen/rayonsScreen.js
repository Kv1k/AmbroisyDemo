import React from 'react';
import {  Text, View, Dimensions, Image,TouchableOpacity } from 'react-native';
import {Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const windowHeight = Dimensions.get('window').height;


function RayonScreen({navigation}) {

  let [fontsLoaded] = useFonts({
    HindSiliguri_300Light,
    HindSiliguri_400Regular,
    HindSiliguri_500Medium,
    HindSiliguri_600SemiBold,
    HindSiliguri_700Bold,
  });


  async function goToProduit(rayon){
    console.log(rayon);
    try {
      await AsyncStorage.setItem('rayon', rayon);
      navigation.navigate('Produit');
    } catch (e) {
      console.log(e);
    }
  }



  if(! fontsLoaded){
    return  < AppLoading /> 
  }else{
    return (
      
      <ScrollView style={{ flex: 1}} >
        <Text style={{fontFamily:'HindSiliguri_600SemiBold', fontSize:27, textAlign:'center', color:'#FB2343', marginTop:40}}>CATEGORIES</Text>
         
          {/* Le background: */}
            <View style={{width: 675, height: 712,marginLeft: -265, marginTop: -408,borderWidth: 3,
            borderColor:'#FB2343', borderRadius:600 
            }}></View>
            <View style={{width: 675, height: 712,borderWidth: 3,
            borderColor:'#FB2343', borderRadius:600,marginLeft:100, marginTop: -308,
            }}></View>
            <View style={{width: 675, height: 712,borderWidth: 3,
            borderColor:'#FB2343', borderRadius:600,marginLeft:-500, marginTop: -108,
            }}></View>  
          {/* */}
        
         
          <View style={{width: 675, height: 612,borderWidth: 3,
          borderColor:'#FB2343', borderRadius:600,marginLeft:130, marginTop: -708,
          }}></View>


          <View style={{position:'absolute', marginTop:105, flex:1, alignSelf:'center'}}>
            <View style={{flexDirection:'row',}}>
              {/* 1- Colone de gauche */}
              <View style={{ flexDirection:'column'}}>
                <Card containerStyle={{ width: 179,height:259, 
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,  
                  borderColor:'transparent',
                }}>
                  <Card.Title style={{height:50, width:177, borderTopLeftRadius:150,  
                  borderTopRightRadius:150,  borderBottomLeftRadius:500, borderBottomRightRadius:500,   
                  backgroundColor:'#FB2343',shadowColor: "#0000",
                    shadowOffset: {
                    width: 0,
                    height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 30, alignSelf:'center', textAlign:'center', 
                    textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                    fontSize:14, marginTop: -16}}
                  >
                    Fruits & Legumes 
                  </Card.Title>
                  <Image source={require('../assets/fruitLegumes.jpg')} style={{width:177, height:257, marginTop:-49, marginLeft:-15, borderRadius:11}}/>
                </Card> 
                <Card containerStyle={{ width: 179,height:190, 
                  marginTop:23,
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,
                  borderColor:'transparent'
                  
                }}>
                  <Text style={{height:50, width:177, borderTopLeftRadius:150,  borderTopRightRadius:150,  
                    borderBottomLeftRadius:500, borderBottomRightRadius:500,   
                    backgroundColor:'#FB2343',shadowColor: "black",
                      shadowOffset: {
                      width: 0,
                      height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.00,
                      elevation: 20, textAlign:'center',
                      textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                      alignSelf:'center',
                      fontSize:14, marginTop:-15}}                  
                  >
                    Viandes & Poisson
                  </Text>
                  <Image source={require('../assets/poissonViande.jpg')} style={{width:177, height:179, marginTop:-41, marginLeft:-15, borderRadius:11}}/>

                </Card> 
                <TouchableOpacity activeOpacity={0.9}  onPress={() => goToProduit('surg') }>
                   <Card containerStyle={{ width: 179,height:158, 
                  marginTop:23,
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,
                  borderColor:'transparent',
                 }}
                >
                  <Text style={{height:50, width:177,borderTopLeftRadius:150,  borderTopRightRadius:150,  
                    borderBottomLeftRadius:500, borderBottomRightRadius:500,  
                    backgroundColor:'#FB2343',shadowColor: "#000",
                      shadowOffset: {
                      width: 0,
                      height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.00,
                      elevation: 30, textAlign:'center',
                      textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                      alignSelf:'center',
                      fontSize:14, marginTop:-15}}                  
                  >
                    Surgelés
                  </Text>
                  <Image source={require('../assets/surgeles.jpg')} style={{width:177, height:152, marginTop:-46, marginLeft:-15, borderRadius:11}}/>

                </Card> 
                </TouchableOpacity>
               
                <Card containerStyle={{ width: 179,height:258, 
                  marginTop:23,
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,
                  borderColor:'transparent',
                }}>
                  <Text style={{height:50, width:177, borderTopLeftRadius:150,  borderTopRightRadius:150,  
                    borderBottomLeftRadius:500, borderBottomRightRadius:500,  
                    backgroundColor:'#FB2343',shadowColor: "#000",
                      shadowOffset: {
                      width: 0,
                      height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.00,
                      elevation: 30, textAlign:'center',
                      textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                      alignSelf:'center',
                      fontSize:14, marginTop:-16}}                  
                  >
                    Boissons
                  </Text>
                  <Image source={require('../assets/boisson.jpg')} style={{width:177, height:246, marginTop:-40, marginLeft:-15, borderRadius:11}}/>

                </Card> 
                <Card containerStyle={{ width: 179,height:198, 
              marginTop:23,
              marginBottom:10,
              shadowColor: "black",
              shadowOffset: {
              width: 0,
              height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.00,
              elevation: 30,   
              borderRadius:12,
              borderColor:'transparent',
            }}>
              <Text style={{height:50, width:177, borderTopLeftRadius:150,  borderTopRightRadius:150,  
                borderBottomLeftRadius:500, borderBottomRightRadius:500,  
                backgroundColor:'#FB2343',shadowColor: "#000",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30, textAlign:'center',
                  textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                  alignSelf:'center',
                  fontSize:14, marginTop:-16}}                  
              >
                Bio & Écologique
              </Text>
              <Image source={require('../assets/bio2.jpg')} style={{width:177, height:187, marginTop:-39, marginLeft:-15, borderRadius:11}}/>

            </Card> 
              </View>
              {/* 2- Colone de droite */}
              <View style={{ flexDirection:'column'}}>
          
                <Card 
                
                containerStyle={{ width: 179,height:200, 
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,
                  borderColor:'transparent'
                 
                }}>
                  <Text style={{height:50, width:177, borderTopLeftRadius:150,  borderTopRightRadius:150,  
                borderBottomLeftRadius:500, borderBottomRightRadius:500,   
                  backgroundColor:'#FB2343',shadowColor: "black",
                    shadowOffset: {
                    width: 0,
                    height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 20, textAlign:'center',
                    textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                    alignSelf:'center',
                    fontSize:14, marginTop: -16}}
                  >
                  Epicerie sucrées
                  </Text>
                  <Image source={require('../assets/cookie.jpg')} style={{width:177, height:198, marginTop:-49, marginLeft:-15, borderRadius:11}}/>

                </Card> 
                <Card containerStyle={{ width: 179,height:180, 
                  marginTop:23,
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,
                  borderColor:'transparent',
                  backgroundColor:'yellow'
                }}>
                  <Text style={{height:50, width:177, borderTopLeftRadius:150,  borderTopRightRadius:150,  
                borderBottomLeftRadius:500, borderBottomRightRadius:500,   
                  backgroundColor:'#FB2343',shadowColor: "black",
                    shadowOffset: {
                    width: 0,
                    height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 20, textAlign:'center',
                    textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                    alignSelf:'center',
                    fontSize:14, marginTop: -16}}
                  >
                    Pains & Pâtisseries
                  </Text>
                  <Image source={require('../assets/pain.jpg')} style={{width:177, height:178, marginTop:-49, marginLeft:-15, borderRadius:11}}/>

                </Card> 
                <Card containerStyle={{ width: 179,height:280, 
                  marginTop:23,
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,
                  borderColor:'transparent',
                }}>
                  <Text style={{height:50, width:177, borderTopLeftRadius:150,  borderTopRightRadius:150,  
                borderBottomLeftRadius:500, borderBottomRightRadius:500,   
                  backgroundColor:'#FB2343',shadowColor: "black",
                    shadowOffset: {
                    width: 0,
                    height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 20, textAlign:'center',
                    textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                    alignSelf:'center',
                    fontSize:14, marginTop: -16}}
                  >
                    Epicerie salée
                  </Text>
                  <Image source={require('../assets/epicerie-salee.jpg')} style={{width:177, height:279, marginTop:-49, marginLeft:-15.5, borderRadius:11}}/>

                </Card> 
                <Card containerStyle={{ width: 179,height:180, 
                  marginTop:23,
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,
                  borderColor:'transparent',
                }}>
                  <Text style={{height:50, width:177, borderTopLeftRadius:150,  borderTopRightRadius:150,  
                borderBottomLeftRadius:500, borderBottomRightRadius:500,   
                  backgroundColor:'#FB2343',shadowColor: "black",
                    shadowOffset: {
                    width: 0,
                    height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 20, textAlign:'center',
                    textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                    alignSelf:'center',
                    fontSize:14, marginTop: -16}}
                  >
                    Bébé
                  </Text>
                  <Image source={require('../assets/bebe.jpg')} style={{width:177, height:178, marginTop:-49, marginLeft:-15.5, borderRadius:11}}/>

                </Card> 
                <Card containerStyle={{ width: 179,height:223, 
                  marginTop:23,
                  shadowColor: "black",
                  shadowOffset: {
                  width: 0,
                  height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                  elevation: 30,   
                  borderRadius:12,
                  borderColor:'transparent',                 
                  marginBottom:10,
                  backgroundColor:'yellow',
                }}>
                  <Text style={{height:50, width:177, borderTopLeftRadius:150,  borderTopRightRadius:150,  
                borderBottomLeftRadius:500, borderBottomRightRadius:500,   
                  backgroundColor:'#FB2343',shadowColor: "black",
                    shadowOffset: {
                    width: 0,
                    height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 20, textAlign:'center',
                    textAlignVertical:'center', color:'white', fontFamily:'HindSiliguri_600SemiBold', 
                    alignSelf:'center',
                    fontSize:14, marginTop: -16}}
                  >
                    Produits du terroir
                  </Text>
                  <Image source={require('../assets/terroir.jpg')} style={{width:177, height:222, marginTop:-49, marginLeft:-15.5, borderRadius:11}}/>

                </Card> 
              </View>
            </View>
          
          </View>

      </ScrollView>
      
      
     
    );
  }
}

export default RayonScreen