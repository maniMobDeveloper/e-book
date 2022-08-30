import React, { useContext } from 'react';
import { View, TouchableOpacity, StatusBar, SafeAreaView, Image, Text } from 'react-native';
import { BACKGROUND_COLOR } from '../../constants/Style_Contants';
import { FavouriteContext } from '../../store/context/favouritesContext';


function FavouritesScreen({navigation}) {
    const FavouriteCtx = useContext(FavouriteContext)
    const FavIds = FavouriteCtx.ids
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor={BACKGROUND_COLOR}/>
        
        <SafeAreaView style={{flex:0,backgroundColor:BACKGROUND_COLOR}}/>
        <View style={{
            flexDirection:'row',
            height:50,
            width:'100%',
            backgroundColor:BACKGROUND_COLOR
            }}>

                <TouchableOpacity onPress={()=>navigation.navigate('Home')}
                style={{height:40,width:'50%'}}>
                <Image source={require('../../assets/images/header.png')} 
                style={{height:40,width:'100%'}}></Image>
                </TouchableOpacity>

                <View style={{flexDirection:'row', alignItems:'flex-end',
                width:'50%',justifyContent:'flex-end'}}>
       
                <Image source={require('../../assets/images/user.png')} 
                style={{height:30,width:30,margin:10}}></Image>
                </View>
        </View>
        <SafeAreaView>
            <Text>Fav Ids : {FavIds}</Text>
        </SafeAreaView>
        </>
         
    );
}

export default FavouritesScreen;