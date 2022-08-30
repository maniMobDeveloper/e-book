import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, 
    Image, ActivityIndicator, StatusBar, Platform,View } from 'react-native';
import { USERS } from '../../constants/API_Constants';
import { BACKGROUND_COLOR } from '../../constants/Style_Contants';

function LoginScreen({navigation}) {

    const [uname, setUname] = useState('Bret');
    const [password, setpassword] = useState('mani');
    const [showIndicator, setIndicator] = useState(false);

    async function validation(){
        if (uname && password) {
            try {
                setIndicator(true)
                let uname_exist = await fetch(USERS)
                .then(response => response.json())
                .then(json => json.some(x => x.username === uname))
                if(uname_exist){
                    setIndicator(false)
                    navigation.navigate('Home')
                } else{
                    alert('Invalid credentials')
                }
            } catch (error) {
                alert(error)
            } finally {
                    setIndicator(false)           
            }

        } else {
            alert('Enter valid credentials')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} 
            style = {styles.logoStyle}
            />
            <TextInput
             onChangeText={text => setUname(text)}
             value = {uname}
             style = {styles.inputBox}
             placeholder = 'Enter username'
             placeholderTextColor={'#cccccc'}
            />
            <TextInput
             onChangeText={text => setpassword(text)}
             value = {password}
             style = {styles.inputBox}
             secureTextEntry = {true}
             placeholder = 'Enter password'
             placeholderTextColor={'#cccccc'}
            />
            <TouchableOpacity style={styles.buttonContainer}
            onPress = {()=>validation()}>
                <Text style={{color:'#fff'}}>SUBMIT</Text>
            </TouchableOpacity>
            {/* <ActivityIndicator size={'large'} color='#fff' 
            animating = {showIndicator} style={styles.loading}/> */}
        </SafeAreaView>
    );
    // return(
    //     <View style = {{flex:1,justifyContent:'center', alignItems:'center'}}>
    //                 <TouchableOpacity style={styles.buttonContainer}
    //         onPress = {()=> alert('hi')}>
    //             <Text>SUBMIT</Text>
    //         </TouchableOpacity>
    //         </View>
    // )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BACKGROUND_COLOR,
        alignItems:'center',
        justifyContent:'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    inputBox:{
        height: 40,
        width:'70%',
        marginBottom: 20,
        borderColor: '#fff',
        borderWidth: 1,
        paddingLeft: 10,
        alignSelf:'center',
        color:'#fff'
    },
    buttonContainer:{
        height: 40,
        width:'70%',
        backgroundColor:'#EF3054',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        shadowColor:'#000',
        shadowOpacity:0.5,
        shadowRadius:2,
        shadowOffset:{
            height:2,
            width:0
        },
        elevation:5,
    },
    logoStyle:{
        height:200,
        width:200,
        alignSelf:'center'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

export default LoginScreen;