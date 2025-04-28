import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from './screens/GameScreen';
import TasksScreen from './screens/TasksScreen';
import {TaskProvider} from "./components/TaskProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
      <TaskProvider>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Game">
                  <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Clicker Game' }} />
                  <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: 'Tasks' }} />
              </Stack.Navigator>
          </NavigationContainer>
      </TaskProvider>
  );
}
