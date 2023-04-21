import {Button, StyleSheet, Text, View, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {LoginScreen} from "./LoginScreen";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {Card} from "react-native-elements";
import {getAll} from "./functions/getAll";

export const IndexScreen = (props) => {
    const {navigation} = props
    const {navigate} = navigation
    const [session, setSession] = useState(null);
    const users = [
        {
            name: 'brynn',
            avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
        },
        {
            name: 'thot leader',
            avatar:
                'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
        },
        {
            name: 'jsa',
            avatar: 'https://uifaces.co/our-content/donated/bUkmHPKs.jpg',
        },
        {
            name: 'talhaconcepts',
            avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        {
            name: 'andy vitale',
            avatar: 'https://uifaces.co/our-content/donated/NY9hnAbp.jpg',
        },
        ]
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
            <Card>
                <Card.Title>CARD WITH DIVIDER</Card.Title>
                <Card.Divider />
                {users.map((u, i) => {
                    return (
                        <View key={i} style={styles.user}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: u.avatar }}
                            />
                            <Text style={styles.name}>{u.name}</Text>
                        </View>
                    );
                })}
            </Card>
            <Button title={"+"} Icon={"plus"} onPress={()=>navigate("formS", {screen: "formS"}) }></Button>
        </View>
    ) : <LoginScreen></LoginScreen>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
});