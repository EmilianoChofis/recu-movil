import {Button, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {LoginScreen} from "./LoginScreen";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {child, get, getDatabase, onValue} from "firebase/database";
import {ref} from "firebase/storage";


export const IndexScreen = (props) => {
    const {navigation} = props;
    const {navigate} = navigation;
    const [session, setSession] = useState(null);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            setSession(!!user)
        })
        setSession(true)
    },[])


    return session ? (
        <View>

            <Button style={styles.agrgear}title={"+"} Icon={"plus"} onPress={()=>navigate("formS", {screen: "formS"}) }></Button>
        </View>
    ) : <LoginScreen></LoginScreen>
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#7f55d0",
        borderRadius:100,
    },
    agregar:{
        backgroundColor: "#7f55d0",
        borderRadius:100,
        width: 50
    }
});