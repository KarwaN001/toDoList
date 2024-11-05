import {StyleSheet} from "react-native";

export const s = StyleSheet.create({



    container: {
        flex: 1,
        backgroundColor : '#717171',
    },
    header:{
        flex:1.1,
    },
    body:{
        flex:7 ,
        
    },
    cardItem:{

        alignItems: 'center',
        minHeight : 100,
        height:"auto",
        width:'100%',
        borderRadius :15,

    },

    footer:{
        flex:.6,
        backgroundColor :"#3e3e3e",
        borderTopStartRadius :4,
        borderTopEndRadius :4,
        elevation :10,

    },


});