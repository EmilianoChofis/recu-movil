import {Button, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {LoginScreen} from "./LoginScreen";
import {getAuth, onAuthStateChanged} from "firebase/auth";

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

    return session ? (
        <View>
            <Text>IndexScreen</Text>
            <Button title={"+"} Icon={"plus"} onPress={()=>navigate("formS", {screen: "formS"}) }></Button>
        </View>
    ) : <LoginScreen></LoginScreen>
}