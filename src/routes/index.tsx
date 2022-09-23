import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Add from '../pages/Add';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Done from '../pages/Done';
import Tracking from '../pages/Tracking';

const Tab = createBottomTabNavigator();

const Routes = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="Adicionar"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName: string;

          switch (route.name) {
            case 'Novo Rastreio':
              iconName = 'add';
              break;
            case 'Concluidos':
              iconName = 'done';
              break;
            case 'Em curso':
              iconName = 'local-shipping';
              break;
            default:
              iconName = '';
          }

          return <Icon name={iconName} color={color} size={30} />;
        },
        tabBarActiveTintColor: '#1054DC',
        tabBarInactiveTintColor: '#6d7ea3',
        tabBarHideOnKeyboard: true,

        tabBarStyle: { backgroundColor: '#ffed24' },
      })}>
      <Tab.Screen name="Novo Rastreio" component={Add} />
      <Tab.Screen name="Em curso" component={Tracking} />
      <Tab.Screen name="Concluidos" component={Done} />
    </Tab.Navigator>
  );
};

export default Routes;
