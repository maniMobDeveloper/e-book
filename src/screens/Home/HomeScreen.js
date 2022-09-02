import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View ,FlatList, SafeAreaView, StyleSheet, Text, ActivityIndicator, StatusBar, Image, TouchableOpacity } from 'react-native';
import { POSTS } from '../../constants/API_Constants';
import { BACKGROUND_COLOR } from '../../constants/Style_Contants';

function HomeScreen({navigation}) {
    const [postsData, setPostsData] = useState([])

    async function getData(){
        try {
            await fetch(POSTS)
            .then(response => response.json())
            .then(json => {
                setPostsData(json)
            })
        } catch (error) {
            alert(error)
        }   
    }

    useLayoutEffect(()=> {
        getData()
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
                style={{height:40,width:'50%',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../../assets/images/header.png')} 
                style={{height:30,width:'100%',marginLeft:10}}></Image>
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'flex-end',
                width:'50%',justifyContent:'flex-end'}}>

                <TouchableOpacity onPress={()=>navigation.navigate('Favourites')}
                style = {{alignItems:'center',justifyContent:'center',height:50,width:'25%'}}>
                <Image source={require('../../assets/images/fav.png')} 
                style={{height:25,width:25}}></Image>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style = {{alignItems:'center',justifyContent:'center',height:50,width:'25%'}}>
                <Image source={require('../../assets/images/user.png')} 
                style={{height:25,width:25}}></Image>
                </TouchableOpacity>
                
                </View>
        </View>
        
        <SafeAreaView style={styles.container}>
        
            <FlatList 
            data = {postsData}
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

export default HomeScreen;