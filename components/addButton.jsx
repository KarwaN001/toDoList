import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export const AddButton = ({createDialog}) => {

    return(
            <TouchableOpacity onPress={createDialog} style={s.container}>
                <Text style={s.txt}>  + Add card </Text>
            </TouchableOpacity>
    );
}

const s = StyleSheet.create({

    container: {

        position: "absolute",
        bottom: 100,
        right: 25,
        justifyContent: 'center',
        backgroundColor :"rgb(206,243,237)",
        width:150,
        height:50,
        borderRadius :15,

    },

    txt:{

        textAlign: "center",
        color:'#000000',
        fontSize:22,

    }
});