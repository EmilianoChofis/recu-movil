import {View, Text, StyleSheet} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import React from "react";
import {Field, useFormik} from "formik";
import * as Yup from "yup";

import Toast from "react-native-toast-message";
import {getDatabase, ref, set, onValue, get, child} from "firebase/database";
import {UploadImage} from "../components/UploadImage";

export const FormContactScreen = () => {
    const dbRef = ref(getDatabase());
    /*function writeUserData( nombre, imagen) {


        let numId = 1;
        get(child(dbRef, `lugares/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Obtener el número de elementos en el objeto
                const conteo = Object.keys(data).length;
                numId = conteo + 1;
                const db = getDatabase();
                set(ref(db, 'lugares/' + numId), {
                    id: numId,
                    nombre: nombre,
                    imagen: imagen,
                });
            } else {
                numId = 1;
                const db = getDatabase();
                set(ref(db, 'lugares/' + numId), {
                    id: numId,
                    nombre: nombre,
                    imagen: imagen,
                });
            }
        }).catch((error) => {
            console.error(error);
        });


    }*/
    const fileUpload = async (file) => {
        const cloudUrl = 'https://api.cloudinary.com/v1_1/josamv/upload';

        const formData = new FormData();
        formData.append('upload_preset', 'journal-app');
        formData.append('file', file);
        formData.append('folder', 'journal-app');

        try {
            const resp = await fetch(cloudUrl, {
                method: 'POST',
                body: formData,
            });
            if (resp.ok) {
                const cloudResp = await resp.json();
                return cloudResp.secure_url;
            } else {
                throw await resp.json();
            }
        } catch (error) {
            throw error;
        }
    };

    async function writeUserData(nombre, imagen) {

        try {
            const fileUrl = await fileUpload(imagen);
            console.log(fileUrl.imagen);
        }catch (e) {
            console.log(e);
        }

        /*const imageUrl = response.data.secure_url;*/ // Obtiene la URL de la imagen subida

    }

    const formik = useFormik({
        initialValues: {
            nombre: '',
            imagen: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                writeUserData(formData.nombre, formData.telefono, formData.direccion, formData.imagen);
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
            <UploadImage/>
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