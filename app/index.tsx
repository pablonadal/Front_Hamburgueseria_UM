import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContext, { AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import ModifyBurgerScreen from './screens/ModifyBurgerScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Hamburguesas" component={HomeScreen} /> 
          <Stack.Screen name="ModificarHamburguesa" component={ModifyBurgerScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

const MainApp: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <App />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default MainApp;
