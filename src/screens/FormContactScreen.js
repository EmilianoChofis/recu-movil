import {View, Text, StyleSheet, ScrollView} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import React, {useState} from "react";
import {Field, useFormik} from "formik";
import * as Yup from "yup";

import Toast from "react-native-toast-message";
import {getDatabase, ref, set, onValue, get, child} from "firebase/database";
import {writeUserData} from "../utils/newContact";

export const FormContactScreen = ({}) => {


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
                return cloudResp.url;
            } else {
                throw await resp.json();
            }
        } catch (error) {
            throw error;
        }
    };


    const formik = useFormik({
        initialValues: {
            nombre: '',
            telefono: '',
            colonia: '',
            calle: '',
            cp: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
            telefono: Yup.string().required('El telefono es obligatorio')
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await writeUserData(formData.nombre, formData.telefono, formData.colonia, formData.calle, formData.cp);
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
        <ScrollView>
            <View style={styles.viewForm}>
                <Input
                    placeholder='Nombre'
                    containerStyle={styles.input}

                    onChangeText={(text) => formik.setFieldValue('nombre', text)}
                    errorMessage={formik.errors.nombre}
                />
                <Input
                    placeholder='Telefono'
                    containerStyle={styles.input}
                    onChangeText={(number) => formik.setFieldValue('telefono', number)}
                    errorMessage={formik.errors.telefono}
                />
                <Input
                    placeholder='Colonia'
                    containerStyle={styles.input}
                    onChangeText={(text) => formik.setFieldValue('colonia', text)}
                    errorMessage={formik.errors.colonia}
                />
                <Input
                    placeholder='Calle'
                    containerStyle={styles.input}
                    onChangeText={(text) => formik.setFieldValue('calle', text)}
                    errorMessage={formik.errors.calle}
                />
                <Input
                    placeholder='Código postal'
                    containerStyle={styles.input}
                    onChangeText={(text) => formik.setFieldValue('cp', text)}
                    errorMessage={formik.errors.cp}
                />
                <Button
                    title='Registrar contacto'
                    containerStyle={styles.containerBtn}
                    buttonStyle={styles.btn}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
                />

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    viewForm: {
        marginVertical: 30,
        paddingHorizontal: 15,
        paddingTop: 40,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
    },
    input: {
        marginBottom: 15,
    },
    icon: {
        color: 'gray',
    },
    containerBtn: {
        width: '70%',
        alignSelf: 'center',
    },
    btn: {
        backgroundColor: 'green',
        borderRadius: 40,
        marginBottom: 20,
    },
});






