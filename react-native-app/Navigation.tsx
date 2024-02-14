import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Button, StatusBar, useColorScheme } from 'react-native';
import { useAuth } from './AuthContext';

import Home from './screens/Home';
import Search from './screens/Search';
import Library from './screens/Library';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Starting from './screens/Starting';
import Colors from './constants/Colors';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StartScreens() {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
    const statusBarStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

    return (
        <>
            <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
            <Stack.Navigator screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'vertical',
                headerTintColor: colorScheme === 'light' ? 'black' : 'white',
                headerStyle: {backgroundColor: Colors[colorScheme ?? 'light'].tint},
            }}>
                <Stack.Screen name='AudioAlcove' component={Starting} options={{
                headerShown: false,
                }}/>
                <Stack.Screen name='Sign In' component={SignIn} options={{presentation: 'modal', headerLeft: () => null}} />
                <Stack.Screen name='Sign Up' component={SignUp} options={{presentation: 'modal', headerLeft: () => null}} />
            </Stack.Navigator>
        </>
    )
}

function TabScreens() {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
    const statusBarStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

    return (
        <>
            <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
            <Stack.Navigator screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'vertical',
                headerTintColor: colorScheme === 'light' ? 'black' : 'white',
                headerStyle: {backgroundColor: Colors[colorScheme ?? 'light'].tint},
            }}>
                <Stack.Screen name='TabGroup' component={TabGroup} options={{
                    headerShown: false,
                }}/>
            </Stack.Navigator>
        </>
    )
}


function TabGroup() {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
    const statusBarStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
    const headerTitleColor = colorScheme === 'dark' ? 'white' : 'black';
    const { onSignOut } = useAuth();
    
    return (
        <>
            <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
            <Tab.Navigator screenOptions={({route}) => ({
                headerStyle: {
                    backgroundColor: backgroundColor,
                    shadowColor: 'transparent',
                },
                tabBarStyle: {
                    backgroundColor: backgroundColor,
                    borderTopWidth: 0,
                },
                headerTintColor: headerTitleColor,
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
                tabBarActiveTintColor: '#19bfb7',
                tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name='Home' component={Home} options={{
                    headerRight: () => <Button onPress={onSignOut} title='Sign Out' />,
                }} />
                <Tab.Screen name='Search' component={Search} options={{
                    headerRight: () => <Button onPress={onSignOut} title='Sign Out' />,
                }} />
                <Tab.Screen name='Library' component={Library} options={{
                    headerRight: () => <Button onPress={onSignOut} title='Sign Out' />,
                }} />
            </Tab.Navigator>
        </>
    )
}


export default function Navigation() {
    const { authState } = useAuth();

    return (
        <NavigationContainer>
            { authState?.isAuthenticated ? <TabScreens /> : <StartScreens /> }
        </NavigationContainer>
    );
}
