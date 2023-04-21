import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from 'react-native-elements';
import React, {useEffect, useState} from 'react'
import IndexStack from "./IndexStack";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ProfileStack} from "./ProfileStack";


const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    const [session, setSession] = useState(null);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            setSession(!!user)
        })
        setSession(true)
    },[])

    return session ? (

        <>
            <Tab.Navigator screenOptions={({route}) => ({
                headerShown: false, tabBarActiveTintColor: "purple",
                tabBarInactiveTintColor: "black",
                tabBarIcon: ({color, size}) => showIcons(route, color, size)
            })}>
                <Tab.Screen name="index" component={IndexStack} options={{title: "Inicio"}}/>
                <Tab.Screen name="profile" component={ProfileStack} options={{title: "Perfil"}}/>
            </Tab.Navigator>
        </>


    ) :
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false, tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "black",
            tabBarIcon: ({color, size}) => showIcons(route, color, size)
        })}>
            <Tab.Screen name="index" component={IndexStack} options={{title: "Inicio"}} />
        </Tab.Navigator>

}

function showIcons(route, color, size) {
    let icon;
    if (route.name === "index") {
        icon = "home-circle"
    }
    if (route.name === "profile") {
        icon = "home-circle"
    }


    return (
        <Icon type='material-community' name={icon}
              color={color} size={size}/>
    )
}