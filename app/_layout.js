import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#000000',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: 'Productos',
        }}
      />
    </Stack>
  );
}