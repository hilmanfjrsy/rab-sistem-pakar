import React, { Component, useState } from 'react';
import { Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { GlobalVar } from './config/GlobalVar'

const { width } = Dimensions.get('screen')
export default function App({ navigation }) {
    const [status, setStatus] = useState(false)
    if (status) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 20, justifyContent: 'center', }}>
                <Image source={require('./assets/Logo-ars.png')} style={{ height: width - 200, resizeMode: 'contain', alignSelf: 'center',marginBottom:20 }} />
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 22, marginVertical: 20 }}>17.6B.33</Text>
                <Text style={{ fontSize: 16, color: GlobalVar.greyColor }}>&#8226; 17180015 - Ihwan Alidrus</Text>
                <Text style={{ fontSize: 16, color: GlobalVar.greyColor }}>&#8226; 17180016 - Indra Firmansyah</Text>
                <Text style={{ fontSize: 16, color: GlobalVar.greyColor }}>&#8226; 17180022 - Nanang Mashadi</Text>
                <Text style={{ fontSize: 16, color: GlobalVar.greyColor }}>&#8226; 17180041 - Hilman Fajri Fahriansyah</Text>
                <TouchableOpacity
                    onPress={() => setStatus(false)}
                    style={{ backgroundColor: GlobalVar.baseColor, height: 48, marginTop: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                >
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 16, color: 'white' }}>Kembali</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 20, justifyContent: 'center', }}>
                <Image source={require('./assets/Construction.png')} style={{ height: width - 100, resizeMode: 'contain', alignSelf: 'center' }} />
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, marginVertical: 20 }}>Selamat Datang!</Text>
                <Text style={{ fontSize: 16, color: GlobalVar.greyColor }}>Halo! Kami adalah mahasiswa dari Universitas ARS jurusan Teknik Informatika, ini adalah aplikasi Sistem Pakar yang kita buat untuk Menganalisis Rencana Anggaran Biaya Pemasangan Dinding. </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LuasBangunan')}
                    style={{ backgroundColor: GlobalVar.baseColor, height: 48, marginTop: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                >
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 16, color: 'white' }}>Mulai!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setStatus(true)}
                    style={{ height: 48, marginTop: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                >
                    <Text style={{ fontFamily: 'Ubuntu-Bold', color: GlobalVar.baseColor, fontSize: 14 }}>Profil Kelompok</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}