import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button, Alert, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { GlobalVar } from "./config/GlobalVar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ navigation, route }) {
    const { control, handleSubmit, formState: { errors } } = useForm();

    async function onSubmit(data) {
        await AsyncStorage.setItem('luasPintu', JSON.stringify(data))
        await navigation.navigate('DetailRAB')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder='Lebar Kusen Pintu'
                                keyboardType='number-pad'
                                style={{ borderColor: errors.lebarPintu ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                                onBlur={onBlur}
                                onChangeText={value => { onChange(value) }}
                                value={value}
                            />
                        )}
                        name="lebarPintu"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>cm</Text>
                </View>
                {errors.lebarPintu && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder='Tinggi Kusen Pintu'
                                keyboardType='number-pad'
                                style={{ borderColor: errors.tinggiPintu ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                                onBlur={onBlur}
                                onChangeText={value => { onChange(value) }}
                                value={value}
                            />
                        )}
                        name="tinggiPintu"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>cm</Text>
                </View>
                {errors.tinggiPintu && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder='Jumlah Pintu'
                                keyboardType='number-pad'
                                style={{ borderColor: errors.jumlahPintu ? 'firebrick' : GlobalVar.greyColor, borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 15, textAlign: 'center', flex: 1 }}
                                onBlur={onBlur}
                                onChangeText={value => { onChange(value) }}
                                value={value}
                            />
                        )}
                        name="jumlahPintu"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 20, marginLeft: 15 }}>unit</Text>
                </View>
                {errors.jumlahPintu && <Text style={{ color: 'firebrick' }}>Harap isi form ini.</Text>}

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={{ backgroundColor: GlobalVar.baseColor, height: 48, marginTop: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                >
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 16, color: 'white' }}>Simpan & Lanjutkan</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
}
