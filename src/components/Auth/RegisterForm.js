import {Button, Icon, Input} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";

export const RegisterForm = (props) => {

    const [password, setPassword] = useState(false);
    const [reapeatPassword, setReapeatPassword] = useState(false);

    const showPass = () => setPassword(!password);

    const showReapeatPass = () => setReapeatPassword(!reapeatPassword);

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Formato de email no valido')
                .required('Email es obligatorio'),
            password: Yup.string().required('Contraseña obligatoria'),
            repeatPassword: Yup.string()
                .required('Contraseña obligatoria')
                .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );
                navigation.navigate('indexS');
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


    return(
        <View style={styles.viewForm}>
            <Input
                placeholder='Correo Electrónico'
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                        iconStyle={styles.icon}
                    />
                }
                onChangeText={(text) => formik.setFieldValue('email', text)}
                errorMessage={formik.errors.email}
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={password ? false : true}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={password ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.icon}
                        onPress={showPass}
                    />
                }
                onChangeText={(text) => formik.setFieldValue('password', text)}
                errorMessage={formik.errors.password}
            />
            <Input
                placeholder='Repetir contraseña'
                containerStyle={styles.input}
                secureTextEntry={reapeatPassword ? false : true}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={
                            reapeatPassword ? 'eye-off-outline' : 'eye-outline'
                        }
                        iconStyle={styles.icon}
                        onPress={showReapeatPass}
                    />
                }
                onChangeText={(text) =>
                    formik.setFieldValue('repeatPassword', text)
                }
                errorMessage={formik.errors.repeatPassword}
            />
            <Button
                title='Registrar'
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