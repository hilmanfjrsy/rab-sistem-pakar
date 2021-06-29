import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { GlobalVar } from "./config/GlobalVar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ navigation, route }) {
    const { control, handleSubmit, formState: { errors } } = useForm();

    async function onSubmit(data) {
        await AsyncStorage.setItem('luasJendela', JSON.stringify(data))
        await navigation.navigate('LuasPintu')
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Lebar Kusen Jendela'
                            keyboardType='number-pad'
                            style={{ borderColor: errors.lebarJendela ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value) }}
                            value={value}
                        />
                    )}
                    name="lebarJendela"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>cm</Text>
            </View>
            {errors.lebarJendela && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Tinggi Kusen Jendela'
                            keyboardType='number-pad'
                            style={{ borderColor: errors.tinggiJendela ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value) }}
                            value={value}
                        />
                    )}
                    name="tinggiJendela"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>cm</Text>
            </View>
            {errors.tinggiJendela && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Jumlah Jendela'
                            keyboardType='number-pad'
                            style={{ borderColor: errors.jumlahJendela ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                            onBlur={onBlur}
                            onChangeText={value => { onChange(value) }}
                            value={value}
                        />
                    )}
                    name="jumlahJendela"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>unit</Text>
            </View>
            {errors.jumlahJendela && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{ backgroundColor: GlobalVar.baseColor, height: 48, marginTop: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
            >
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 16, color: 'white' }}>Simpan & Lanjutkan</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
