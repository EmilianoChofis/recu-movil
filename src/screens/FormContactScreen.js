import {View, Text, StyleSheet} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";

import Toast from "react-native-toast-message";
import {getDatabase, ref, set, onValue, get, child} from "firebase/database";

export const FormContactScreen = () => {
    const dbRef = ref(getDatabase());
/*
    get(child(dbRef, `contactos/`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            // Obtener el número de elementos en el objeto
            const conteo = Object.keys(data).length;
            numId = conteo +1;
            console.log(`Número de elementos: ${conteo}`);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
*/


    function writeUserData(id,nombre) {
        let numId = 1;
        get(child(dbRef, `contactos/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Obtener el número de elementos en el objeto
                const conteo = Object.keys(data).length;
                numId = conteo +1;
                const db = getDatabase();
                set(ref(db, 'contactos/'+numId), {
                    id: id,
                    nombre: nombre
                });
            } else {
                numId = 1;
                const db = getDatabase();
                set(ref(db, 'contactos/'+numId), {
                    id: id,
                    nombre: nombre
                });
            }
        }).catch((error) => {
            console.error(error);
        });


    }

    const formik = useFormik({
        initialValues: {
            nombre: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                writeUserData(1,formData.nombre)
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al registrar',
                    text2: error.message,
                });
                console.log(error);
            }
        },
    });
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder='Nombre'
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                        iconStyle={styles.icon}
                    />
                }
                onChangeText={(text) => formik.setFieldValue('nombre', text)}
                errorMessage={formik.errors.nombre}
            />
            <Button
                title='Registrar contacto'
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    viewForm: {
        marginTop: 30,

    },
    containerBtn: {
        width: "95%",
        marginTop: 20,

    },
    btn: {
        backgroundColor: "green"
    }
})