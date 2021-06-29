import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './'
import LuasBangunan from './LuasBangunan'
import LuasJendela from './LuasJendela'
import LuasPintu from './LuasPintu'
import DetailRAB from './DetailRAB'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor='white' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Welcome',
              headerShown: false
            }}
          />
          <Stack.Screen
            name="LuasBangunan"
            component={LuasBangunan}
            options={{
              title: 'Luas Bangunan',
              headerShown: true
            }}
          />
          <Stack.Screen
            name="LuasJendela"
            component={LuasJendela}
            options={{
              title: 'Luas Jendela',
              headerShown: true
            }}
          />
          <Stack.Screen
            name="LuasPintu"
            component={LuasPintu}
            options={{
              title: 'Luas Pintu',
              headerShown: true
            }}
          />
          <Stack.Screen
            name="DetailRAB"
            component={DetailRAB}
            options={{
              title: 'Rencana Anggaran Biaya',
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;