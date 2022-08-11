import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SubTitle } from '../../../../components/Typography';
import { theme } from '../../../../theme';

function SocialMediaLogin() {
    return (
        <View style={style.mainbody}>
            <TouchableOpacity style={style.maincontainet} >
                <FontAwesome name="google" color={theme.colors.appWhite[800]} size={30} style={style.vectoticons}/>
                <SubTitle style={style.innertext} >Continue With Google</SubTitle>
            </TouchableOpacity>


            <TouchableOpacity style={style.maincontainet} >
                <FontAwesome name="facebook-f" color={theme.colors.appWhite[800]} size={30} style={style.vectoticons}/>
                <SubTitle style={style.innertext} >Continue With Facebook</SubTitle>
            </TouchableOpacity>
        </View>


    )
}

export default SocialMediaLogin;
const style = StyleSheet.create({
    maincontainet: {
        borderWidth: 0.6,
        borderColor: theme.colors.appWhite[800],
        width: "80%",
        height: 50,
        borderRadius: 50,
        paddingStart: 15,
        flexDirection: "row",
        margin: 10,
        backgroundColor: theme.colors.gray[50],
        alignItems:"center",
    },
    innertext: {
        color: theme.colors.appWhite[800],
        fontSize: 17,
        textAlign: "center",
    },
    mainbody:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10

    },
    vectoticons:{
        paddingEnd:20
    }

})