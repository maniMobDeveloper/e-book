import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, StatusBar, SafeAreaView, Image, Text, StyleSheet, FlatList } from 'react-native';
import { POSTS } from '../../constants/API_Constants';
import { BACKGROUND_COLOR } from '../../constants/Style_Contants';
import { FavouriteContext } from '../../store/context/favouritesContext';


function FavouritesScreen({navigation}) {
    const FavouriteCtx = useContext(FavouriteContext)
    const FavIds = FavouriteCtx.ids
    const [bookData, setBookData] = useState([])

    async function getDetails(){
        try {
            let sampleItems = []
            for(const i of FavIds){
                await fetch(POSTS  + `/${i}`)
                .then(response => response.json())
                .then(json => {
                    sampleItems.push(json)
                })
            }
            setBookData(sampleItems)
            console.log(sampleItems)
        } catch (error) {
            alert(error)
        }  
    }

    useEffect(()=> {
        getDetails()
    },[])

    const passDetails = (item) => {
        navigation.navigate('ListDetails',{bookId : item.id})
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
                
                <Image source={require('../../assets/images/user.png')} 
                style={{height:30,width:30,margin:10}}></Image>
                </View>
        </View>
        
        <SafeAreaView style={styles.container}>
        
            <FlatList 
            data = {bookData}
            keyExtractor={(item, index) => item.id}
            numColumns = {2}
            renderItem = {({item})=> (
                <>
                <TouchableOpacity onPress={()=>passDetails(item)}
                style={{flex:0.5,justifyContent:'center', alignItems:'center',borderColor:BACKGROUND_COLOR, borderWidth:0.5}}>
                    <Image source = {{uri:item.thumbnailUrl}} 
                    style={{height:150,width:150,margin:20}}/>
                    <Text numberOfLines={1} style={{marginBottom:10,width:'50%',fontWeight:'bold'}}>{item.title.toUpperCase()}</Text>
                </TouchableOpacity>
                </>
            )}
            />
        </SafeAreaView>
        </>
         
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
})

export default FavouritesScreen;