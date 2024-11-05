import {Image} from "react-native";
import {View, Text, StyleSheet} from 'react-native';

export function Title()
 {
     return(
            <View style={s.container}>
              <Text style={s.logo} >' To Do List '</Text>
            </View>

     );


 }

 const s = StyleSheet.create({
     container: {
         paddingTop: 30,
     },
     logo:{
         fontSize: 49,
         color: 'white',
         alignSelf: 'center',
     },
 });