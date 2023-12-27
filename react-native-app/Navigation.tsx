import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import Home from './screens/Home';
import Search from './screens/Search';
import Library from './screens/Library';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Starting from './screens/Starting';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StartScreenStackGroup() {
    return (
        <Stack.Navigator screenOptions={{gestureEnabled: true, gestureDirection: 'vertical'}}>
            <Stack.Screen name='AudioAlcove' component={Starting} />
            <Stack.Screen name='Sign In' component={SignIn} options={{presentation: 'modal'}} />
            <Stack.Screen name='Sign Up' component={SignUp} options={{presentation: 'modal'}} />
            <Stack.Screen name='TabGroup' component={TabGroup} options={{
                headerShown: true,
            }}/>
        </Stack.Navigator>
    )
}

function TabGroup() {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({ color, focused, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? 'ios-home' : 'ios-home-outline';
                } else if (route.name === 'Search') {
                    iconName = focused ? 'ios-search' : 'ios-search-outline';
                } else if (route.name === 'Library') {
                    iconName = focused ? 'ios-musical-notes' : 'ios-musical-notes-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#1DA1F2",
            tabBarInactiveTintColor: "gray",
        })}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Search' component={Search} />
            <Tab.Screen name='Library' component={Library} />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    //const currentTheme = useColorScheme();
    //theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}

    return (
        <NavigationContainer>
            <StartScreenStackGroup />
            <StatusBar style='auto' />
        </NavigationContainer>
    );
}
