import {Alert, SafeAreaView, ScrollView, View} from "react-native";
import {s} from "./App.style";
import {Title} from "./components/Title";
import {Cards} from "./components/cards";
import {useEffect, useState} from "react";
import {Footer} from "./components/footer";
import DialogContainer from "react-native-dialog/lib/Container";
import DialogTitle from "react-native-dialog/lib/Title";
import {AddButton} from "./components/addButton";
import DialogInput from "react-native-dialog/lib/Input";
import DialogButton from "react-native-dialog/lib/Button";
import uuid from "react-native-uuid"
import AsyncStorage from '@react-native-async-storage/async-storage';


let isFirstRender = true;
let isFirstLoadData = false;
const App = () => {

    const [list, setList] = useState([]);


    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!isFirstRender) {
            if (!isFirstLoadData) {
                saveData(list);
            } else {
                isFirstLoadData = false;
            }
        } else {
            isFirstRender = false;
        }

    }, [list]);

    async function saveData(value) {
        try {
            //test test
            //console.log("save ",...value);
            console.log("save ");
            await AsyncStorage.setItem("@toDoList", JSON.stringify(value));
        } catch (error) {
            console.error(error)
        }
    }

    const loadData = async () => {
        try {
            console.log("load");

            const loadList = await AsyncStorage.getItem("@toDoList");
            if (loadList !== null) {
                const parsedList = JSON.parse(loadList);
                isFirstLoadData = true;
                setList(parsedList || []);
            } else {

            }

        } catch (error) {
            console.error(error)
        }
    }


    const [focus, setFocus] = useState("all");
    const [visible, setVisible] = useState(false);
    const [textInput, setTextInput] = useState("");

    const updateList = () => {
        if (focus === "all") {
            return list;


        } else if (focus === "inProgress") {
            return list.filter((item) => {
                return !item.isComplited;
            });
        } else if (focus === "done") {
            return list.filter((item) => {
                return item.isComplited;
            });
        }
    }
    //console.log(updateList);


    const longPress = (card) => {
        Alert.alert("Delete card", "Are you sure you want to delete?", [
            {
                text: "Cancel",
                style: "cancel",
                onPress: () => {
                    console.log("cancel is done")
                }
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setList(list.filter((allList) => {
                        return allList.id !== card.id;
                    }));
                    console.log(card, " deleted !!");
                }
            }
        ]);

    }


    function renderList() {
        return updateList().map((item) => (<View key={item.id} style={s.cardItem}>
            <Cards changeState={ChangeState} info={item} longPress={longPress}/>
        </View>));
    }

    function ChangeState(info) {

        //just return oneline with defrence isComplited
        const updateJustOneLine = {
            ...info,
            isComplited: !info.isComplited,
        }
        //console.log(updatejustOneLine);

        const updateToDoList = [...list];
        const indexToUpdate = updateToDoList.findIndex((t) => t.id === updateJustOneLine.id);
        updateToDoList[indexToUpdate] = updateJustOneLine;
        setList(updateToDoList);
    }

    const addToDo = () => {
        const addLine = {
            id: uuid.v4(),
            txt: textInput,
            isComplited: false
        };
        setList([
            addLine,
            ...list
        ]);
        setTextInput("");
        setVisible(false);
        console.log(addLine);
    }

    const DialogFunction = () => {
        return (<DialogContainer visible={visible} onBackdropPress={() => {
            setVisible(false)
        }}>
            <DialogTitle> Create Card :</DialogTitle>
            <DialogInput placeholder={"ex : Go to study"} onChangeText={(text) => {
                setTextInput(text)
            }}/>
            <DialogButton color={"gray"} label={"Cancel"} onPress={() => setVisible(false)}/>
            <DialogButton label={"Save"} onPress={addToDo} disabled={textInput.length === 0}/>
        </DialogContainer>);
    }

    return (<SafeAreaView style={s.container}>


            <View style={s.header}>
                <Title/>
            </View>

            <View style={s.body}>
                <ScrollView>
                    {renderList()}
                </ScrollView>
            </View>


            <View style={s.footer}>
                <Footer focus={focus} setFocus={setFocus} list={list}/>
            </View>

            <AddButton createDialog={() => {
                setVisible(true);
            }}/>

            {DialogFunction()}


        </SafeAreaView>


    );
}

export default App;


