// _layout.tsx under app

import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="membership" 
        options={{ 
          headerTitle: 'Membership Tiers',
          headerStyle: {
            backgroundColor: '#0055A5',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen 
        name="my_booking" 
        options={{ 
          headerTitle: 'My Watch List',
          headerStyle: {
            backgroundColor: '#0055A5',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
}