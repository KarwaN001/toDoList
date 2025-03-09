import {StyleSheet, Text, TouchableOpacity} from "react-native";

//test
export function Cards({info, changeState, longPress}) {

    return (<TouchableOpacity onLongPress={() => longPress(info)} onPress={() => changeState(info)} style={s.container}>
            <Text
                style={[s.txt, info.isComplited && {textDecorationLine: "line-through"}]}>
                {info.txt}
            </Text>
        </TouchableOpacity>);
}

const s = StyleSheet.create({

    container: {

        backgroundColor: "white",
        justifyContent: 'center',
        minHeight: 100,
        height: "auto",
        width: '90%',
        borderRadius: 15,
        marginVertical: 11,

    },

    txt: {

    marginHorizontal: 10, paddingVertical: 10, fontSize: 20,

    }


});