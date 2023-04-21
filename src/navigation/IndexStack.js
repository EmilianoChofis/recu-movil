import { StyleSheet } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {IndexScreen} from "../screens/IndexScreen";
import {ContactScreen} from "../screens/ContactScreen";
import {FormContactScreen} from "../screens/FormContactScreen";
import {LoginScreen} from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";


const Stack = createNativeStackNavigator();
export default function IndexStack() {
  return (
   <Stack.Navigator>
       <Stack.Screen name={"indexS"} component={IndexScreen} options={{title:"Inicio"}}/>
       <Stack.Screen name={"loginS"} component={LoginScreen} options={{title:"Iniciar sesión"}}/>
       <Stack.Screen name={"registerS"} component={RegisterScreen} options={{title:"Registrarse"}}/>
       <Stack.Screen name={"contactS"} component={ContactScreen} options={{title: "Contacto"}}/>
       <Stack.Screen name={"formS"} component={FormContactScreen} options={{title: "debe ser dinamico"}}/>
   </Stack.Navigator>
  )
}
