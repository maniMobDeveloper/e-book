import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';

import { POSTS } from '../../constants/API_Constants';
import { BACKGROUND_COLOR } from '../../constants/Style_Contants';
import { FavouriteContext } from '../../store/context/favouritesContext';


function ListDetailsScreen({navigation, route}) {
    const FavouriteCtx = useContext(FavouriteContext)
    const bookId = route.params.bookId
    const [bookData, setBookData] = useState({})
    const is_FavId = FavouriteCtx.ids.includes(bookId)

    async function getDetails(){
        try {
            await fetch(POSTS  + `/${bookId}`)
            .then(response => response.json())
            .then(json => {
                setBookData(json)
            })
        } catch (error) {
            alert(error)
        }  
    }

    useEffect(()=>{
        getDetails()
    },[])

    function changeFavourite(){
        if(is_FavId){
            FavouriteCtx.removeFavourite(bookId)
        } else {
            FavouriteCtx.addFavourite(bookId)
        }
    }

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

                {is_FavId ?
                <TouchableOpacity onPress={()=>changeFavourite()}>
                <Image source={require('../../assets/images/aftrFav.png')} 
                style={{height:30,width:30,margin:10}}></Image>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>changeFavourite()}>
                <Image source={require('../../assets/images/befFav.png')} 
                style={{height:30,width:30,margin:10}}></Image>
                </TouchableOpacity>
                }
               
                <Image source={require('../../assets/images/user.png')} 
                style={{height:30,width:30,margin:10}}></Image>
                </View>
        </View>
        <SafeAreaView>
            <Text>{bookData.id}</Text>
            <Text>{bookData.title}</Text>
            <Image source={{uri:bookData.thumbnailUrl}} 
            style={{height:100,width:100}}/>
        </SafeAreaView>
        </>
    );
}

export default ListDetailsScreen;