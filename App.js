import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';

// importa las nuevas pantallas de Onboarding
import OnboardingWelcome from './src/screens/Onboarding/OnboardingWelcome';
import OnboardingBenefits from './src/screens/Onboarding/OnboardingBenefits';
import OnboardingPermissions from './src/screens/Onboarding/OnboardingPermissions';
import OnboardingUserLogin from './src/screens/Onboarding/OnboardingUserLogin';

// importa las nuevas pantallas funcionales
import CameraScreen from './src/screens/CameraScreen';
import LocationScreen from './src/screens/LocationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingWelcome">
        {/* Flujo de Onboarding */}
        <Stack.Screen
          name="OnboardingWelcome"
          component={OnboardingWelcome}
          options={{ title: 'Bienvenida' }}
        />
        <Stack.Screen
          name="OnboardingBenefits"
          component={OnboardingBenefits}
          options={{ title: 'Beneficios' }}
        />
        <Stack.Screen
          name="OnboardingPermissions"
          component={OnboardingPermissions}
          options={{ title: 'Permisos' }}
        />

        {/* Flujo de autenticación */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Inicio de Sesión' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registro de Usuario' }}
        />
        <Stack.Screen
          name="OnboardingUserLogin"
          component={OnboardingUserLogin}
          options={{ title: 'Bienvenida Usuario' }}
        />

        {/* Flujo principal */}
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Panel Privado' }}
        />

        {/* Funcionalidades nativas */}
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: 'Cámara' }}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{ title: 'Ubicación' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
