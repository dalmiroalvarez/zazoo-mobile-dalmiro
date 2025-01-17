import { Stack } from 'expo-router';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#282c34',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: '600',
            letterSpacing: 0.5,
          },
          headerTintColor: '#FFFFFF',
          headerShadowVisible: false,
          headerBlurEffect: 'dark',
          contentStyle: {
            backgroundColor: '#F5F5F7',
          },
          headerTitleAlign: 'center',
          ...Platform.select({
            ios: {
              headerLargeTitle: true,
              headerLargeTitleStyle: {
                color: '#FFFFFF',
                fontSize: 26,
                fontWeight: 'bold',
              },
            },
            android: {
              statusBarColor: '#282c34',
              statusBarStyle: 'light',
            },
          }),
        }}
      >
        <Stack.Screen 
          name="index"
          options={{
            title: 'The Zazoo Mobile App',
            headerLeft: () => null,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}