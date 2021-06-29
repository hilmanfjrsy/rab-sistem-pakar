import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { GlobalVar } from "./config/GlobalVar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({navigation,route}) {
    const { control, handleSubmit, formState: { errors } } = useForm();

    async function onSubmit(data) {
        await AsyncStorage.setItem('luasBangunan',JSON.stringify(data))
        await navigation.navigate('LuasJendela')
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Panjang Bangunan'
                            keyboardType='number-pad'
                            style={{ borderColor: errors.panjangBangunan ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                            onBlur={()=>onBlur}
                            onChangeText={value => {onChange(value)}}
                            value={value}
                        />
                    )}
                    name="panjangBangunan"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>m</Text>
            </View>
            {errors.panjangBangunan && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Lebar Bangunan'
                            keyboardType='number-pad'
                            style={{ borderColor: errors.lebarBangunan ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                            onBlur={onBlur}
                            onChangeText={value => {onChange(value)}}
                            value={value}
                        />
                    )}
                    name="lebarBangunan"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>m</Text>
            </View>
            {errors.lebarBangunan && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Tinggi Dinding'
                            keyboardType='number-pad'
                            style={{ borderColor: errors.tinggiDinding ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                            onBlur={onBlur}
                            onChangeText={value => {onChange(value)}}
                            value={value}
                        />
                    )}
                    name="tinggiDinding"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>m</Text>
            </View>
            {errors.tinggiDinding && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{ backgroundColor: GlobalVar.baseColor, height: 48, marginTop: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
            >
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 16, color: 'white' }}>Simpan & Lanjutkan</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
