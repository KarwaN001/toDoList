import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from "react";

export function Footer({focus ,setFocus , list})
 {

      const setColor=(getFocus)=> {
          return ({
                 color : focus === getFocus ? 'yellow' : 'white',
              });
      }

        const numberOfStatus = list.reduce((acc, curr) => {
            curr.isComplited ? acc.complete++ : acc.inProgress++;
            return acc ;
        },{
            // initail value for accumelator(acc) and at the end they return this
            all : list.length,
            inProgress : 0,
            complete : 0,
            })
         //test test
         //console.log(numberOfStatus);


     return (

         <View style={s.container}>
             <TouchableOpacity onPress={ () => setFocus("all") }>
                 <Text style={[s.txt , setColor("all")]}>ALL ({numberOfStatus.all})</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={ () => setFocus("inProgress") }>
                 <Text style={[s.txt , setColor("inProgress")]}>In Progress ({numberOfStatus.inProgress})</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={ () => setFocus("done") }>
                 <Text style={[s.txt , setColor("done")]}>Done ({numberOfStatus.complete})</Text>
             </TouchableOpacity>
         </View>

     );
 }

 const s = StyleSheet.create({
        container:{
            flex :1,
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center',
        },
        txt:{
            fontSize:17,
            padding:12
        }

 });