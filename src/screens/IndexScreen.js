import {Button, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {LoginScreen} from "./LoginScreen";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getAll} from "../utils/getAll";

export const IndexScreen = (props) => {
    const {navigation} = props
    const {navigate} = navigation
    const [session, setSession] = useState(null);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            setSession(!!user)
        })
        setSession(true)
    },[])

    useEffect(()=>{
        if(session){
            getAll().then(r => console.log(r))
        }
    },[session])

    return session ? (
        <View>

            <Button title={"+"} Icon={"plus"} onPress={()=>navigate("formS", {screen: "formS"}) }></Button>
        </View>
    ) : <LoginScreen></LoginScreen>
}