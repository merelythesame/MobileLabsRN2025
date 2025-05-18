import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from 'context/AuthContext';
import AppStack from 'navigation/AppStack';
import GuestStack from 'navigation/GuestStack';

export default function App() {
  return (
      <AuthProvider>
        <Navigation />
      </AuthProvider>
  );
}

const Navigation = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
      <NavigationContainer>
        {user ? <AppStack /> : <GuestStack />}
      </NavigationContainer>
  );
};
