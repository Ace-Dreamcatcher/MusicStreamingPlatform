import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar, useColorScheme, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from './AuthContext';

import Home from './screens/Home';
import Search from './screens/Search';
import Library from './screens/Library';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Starting from './screens/Starting';
import Colors from './constants/Colors';
import EditUser from './screens/EditUser';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


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
            <Stack.Navigator>
                <Stack.Screen name='TabGroup' component={TabGroup} options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name='DrawerGroup' component={DrawerGroup}/>
            </Stack.Navigator>
        </>
    )
}


function UserButton() {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <FontAwesome name='user-circle-o' size={30} color='#19bfb7' />
            </TouchableOpacity>
        </View>
    )
}


function TabGroup() {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
    const statusBarStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
    const headerTitleColor = colorScheme === 'dark' ? 'white' : 'black';
    
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
                    headerRight: () => UserButton(),
                }}/>
                <Tab.Screen name='Search' component={Search} options={{
                    headerRight: () => UserButton(),
                }}/>
                <Tab.Screen name='Library' component={Library} options={{
                    headerRight: () => UserButton(),
                }}/>
            </Tab.Navigator>
        </>
    )
}


function DrawerGroup() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='EditUser' component={EditUser}/>
        </Drawer.Navigator>
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


const styles = StyleSheet.create({
    container: {
        marginRight: 26,
    },
})
