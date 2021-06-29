import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState, useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { GlobalVar } from './config/GlobalVar';

export default function App({ navigation, route }) {
    const [data, setData] = useState({
        TotalHarga: 0,
        LuasPasangan: 0,
        BataMerah: 0,
        Semen: 0,
        Pasir: 0,
        Pekerja: 0,
        Tukang: 0,
        HargaBata: 0,
        HargaTukang: 0,
        HargaPasir: 0,
        HargaPekerja: 0,
        HargaSemen: 0,
    })

    //harga satuan
    const hargBataMerah = 900
    const hargaSemen = 1500
    const hargaPasir = 200000
    const hargaPekerja = 70000
    const hargaTukang = 90000

    //kebutuhan 1m2
    const bataMerah = 70
    const semen = 14.37
    const pasir = 0.04
    const pekerja = 0.32
    const tukang = 0.1

    async function hitungData() {
        //get data dari inputan
        let luasBangunan = JSON.parse(await AsyncStorage.getItem('luasBangunan'))
        let luasJendela = JSON.parse(await AsyncStorage.getItem('luasJendela'))
        let luasPintu = JSON.parse(await AsyncStorage.getItem('luasPintu'))

        //hitung data
        let keliling = 2 * (parseInt(luasBangunan.panjangBangunan) + parseInt(luasBangunan.lebarBangunan))
        let tiangKolom = parseFloat(4 * 0.4 * parseInt(luasBangunan.tinggiDinding))
        let betonAtas = parseFloat(keliling * 0.2)

        let luasKusenPintu = parseFloat(parseInt(luasPintu.jumlahPintu) * (parseInt(luasPintu.lebarPintu) / 100) * (parseInt(luasPintu.tinggiPintu) / 100))
        let luasKusenJendela = parseFloat(parseInt(luasJendela.jumlahJendela) * (parseInt(luasJendela.lebarJendela) / 100) * (parseInt(luasJendela.tinggiJendela) / 100))

        let luas = parseFloat(((keliling * parseInt(luasBangunan.tinggiDinding)) - (tiangKolom + betonAtas + luasKusenJendela + luasKusenPintu)).toFixed(1))

        //menghitung kebutuhan
        let kBata = parseFloat(luas * bataMerah)
        let kSemen = parseFloat(luas * semen)
        let kPasir = parseFloat(luas * pasir)
        let kPekerja = parseFloat(luas * pekerja)
        let kTukang = parseFloat(luas * tukang)

        //hitung harga
        let hBata = parseInt(kBata * hargBataMerah)
        let hSemen = parseInt(kSemen * hargaSemen)
        let hPasir = parseInt(kPasir * hargaPasir)
        let hPekerja = parseInt(kPekerja * hargaPekerja)
        let hTukang = parseInt(kTukang * hargaTukang)
        let total = hBata + hSemen + hPasir + hPekerja + hTukang

        //set data
        setData({
            TotalHarga: total,
            LuasPasangan: luas,
            BataMerah: kBata,
            Semen: kSemen,
            Pasir: kPasir,
            Pekerja: kPekerja,
            Tukang: kTukang,
            HargaBata: hBata,
            HargaTukang: hTukang,
            HargaPasir: hPasir,
            HargaPekerja: hPekerja,
            HargaSemen: hSemen,
        })
    }

    function formatRupiah(angka) {
        angka = String(angka)
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        let separator = null
        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return 'Rp. ' + rupiah
    }

    useEffect(() => {
        hitungData()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{}}>Luas Dinding </Text>
                        <Text style={{}}>{data.LuasPasangan}m&#178;</Text>
                    </View>
                    <HargaSatuan />
                    <DetailKebutuhan />
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, borderTopWidth: 0.5, borderColor: 'grey' }}>
                <View>
                    <Text style={{ color:'grey' }}>Total Harga</Text>
                    <Text style={{ fontSize: 20, fontFamily: 'Ubuntu-Bold', marginVertical: 0 }}>{formatRupiah(data.TotalHarga)}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.reset(
                        {
                            index: 0,
                            routes: [
                                { name: 'Home' },
                            ]
                        })}
                    style={{ backgroundColor: GlobalVar.baseColor, height: 48, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                >
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 16, color: 'white' }}>Selesai</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

    function HargaSatuan() {
        return (
            <View>
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 18, marginTop: 20 }}>Harga Satuan : </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10 }}>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; 1 bh Bata Merah uk 10 x 20 x 5 cm</Text>
                    <Text style={{}}>{formatRupiah(hargBataMerah)} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10 }}>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; 1 kg Semen</Text>
                    <Text style={{}}>{formatRupiah(hargaSemen)} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10 }}>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; 1 m&#179; Pasir Pasang </Text>
                    <Text style={{}}>{formatRupiah(hargaPasir)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10 }}>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; 1 OH Pekerja</Text>
                    <Text style={{}}>{formatRupiah(hargaPekerja)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10 }}>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; 1 OH Tukang Batu </Text>
                    <Text style={{}}>{formatRupiah(hargaTukang)} </Text>
                </View>
            </View>
        )
    }

    function DetailKebutuhan() {
        return (
            <View>
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 18, marginTop: 20 }}>Detail Kebutuhan : </Text>
                <Text style={{}}>1 m&#178; pasangan bata merah 20 x 10 x 5 cm dengan adukan 1 semen : 5 pasir membutuhkan :</Text>
                <View style={{ paddingLeft: 10 }}>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; {bataMerah} bh Bata Merah</Text>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; {semen} kg Semen</Text>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; {pasir} m&#179; Pasir Pasang </Text>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; {pekerja} OH Pekerja</Text>
                    <Text style={{ color: GlobalVar.greyColor }}>&#8226; {tukang} OH Tukang Batu </Text>
                </View>
                <RenderMaterial />
            </View>
        )
    }

    function RenderMaterial() {
        return (
            <View>
                <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 16, marginTop: 20 }}>Harga Material : </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ paddingLeft: 10 }}>
                        <Text>&#8226; Bata Merah</Text>
                        <Text style={{ color: GlobalVar.greyColor }} >{data.BataMerah} bh x {formatRupiah(hargBataMerah)}</Text>
                    </View>
                    <Text>{formatRupiah(data.HargaBata)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{}}>&#8226; Semen</Text>
                        <Text style={{ color: GlobalVar.greyColor }}>{data.Semen.toFixed(0)} kg x {formatRupiah(hargaSemen)}</Text>
                    </View>
                    <Text>{formatRupiah(data.HargaSemen)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{}}>&#8226; Pasir Pasang</Text>
                        <Text style={{ color: GlobalVar.greyColor }}>{data.Pasir.toFixed(2)} m&#179; x {formatRupiah(hargaPasir)}</Text>
                    </View>
                    <Text>{formatRupiah(data.HargaPasir)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{}}>&#8226; Pekerja</Text>
                        <Text style={{ color: GlobalVar.greyColor }}>{data.Pekerja.toFixed(2)} OH x {formatRupiah(hargaPekerja)}</Text>
                    </View>
                    <Text>{formatRupiah(data.HargaPekerja)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{}}>&#8226; Tukang Batu</Text>
                        <Text style={{ color: GlobalVar.greyColor }}>{data.Tukang.toFixed(2)} OH x {formatRupiah(hargaTukang)}</Text>
                    </View>
                    <Text>{formatRupiah(data.HargaTukang)}</Text>
                </View>
            </View>
        )
    }
}