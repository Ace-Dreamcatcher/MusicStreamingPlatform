import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { View, Text } from '../components/Theme';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../AuthContext';


export default function EditUser() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);
    const [toggleLossless, setToggleLossless] = useState(false);
    const [toggleDolby, setToggleDolby] = useState(false);
    const [membership, setMembership] = useState(false);
    const { onRole } = useAuth();

    useEffect(() => {
        const loadToggleState = async () => {
            try {
                const storedLossLessState = await AsyncStorage.getItem('toggleLossless');
                const storedDolbyState = await AsyncStorage.getItem('toggleDolby');
                const storedMembershipState = await AsyncStorage.getItem('membership');

                if (storedLossLessState !== null) {
                    setToggleLossless(JSON.parse(storedLossLessState));
                }
                if (storedDolbyState !== null) {
                    setToggleDolby(JSON.parse(storedDolbyState));
                }
                if (storedMembershipState !== null) {
                    setMembership(JSON.parse(storedMembershipState));
                }
            } catch (error) {
                console.error('Error loading toggle state:', error);
            }
        };
        loadToggleState();
    }, []);

    const handleToggleLossless = async () => {
        const newToggleState = !toggleLossless;
        setToggleLossless(newToggleState);
        try {
            await AsyncStorage.removeItem('toggleLossLess');
            await AsyncStorage.setItem('toggleLossless', JSON.stringify(newToggleState));
        } catch (error) {
            console.error('Error saving lossless state:', error);
        }
    };

    const handleToggleDolby = async () => {
        const newToggleState = !toggleDolby;
        setToggleDolby(newToggleState);
        try {
            await AsyncStorage.removeItem('toggleDolby');
            await AsyncStorage.setItem('toggleDolby', JSON.stringify(newToggleState));
        } catch (error) {
            console.error('Error saving dolby state:', error);
        }
    };

    const handleMembership = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await onRole!(token);
        } catch (error) {
            
        }
    }
    
    return (
        <GestureRecognizer style={{flex: 1}} onSwipeDown={() => navigation.goBack()}>
            <View style={styles.container}>
                <View style={styles.userButtonContainer}>
                    <TouchableOpacity style={styles.userButton}>
                        <View style={styles.directionForUserButton}>
                            <FontAwesome name='user-circle-o' size={50} color='#19bfb7'/>
                            <View style={styles.userInfo}>
                                <Text style={styles.username}>Username</Text>
                                <Text style={styles.changeInfo}>Change Info</Text>
                            </View>
                        </View>
                        <FontAwesome name='angle-right' size={28} color='gray'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.losslessButtonContainer}>
                    <View style={styles.losslessButton}>
                        <View style={styles.directionForLossLessButton}>
                            <Text style={{fontSize: 19}}>Lossless Audio</Text>
                            <View style={styles.losslessIcon}>
                                <MaterialIcons name='multitrack-audio' size={20} color={colorScheme === 'light' ? 'black' : 'white'} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleToggleLossless}>
                            {toggleLossless ? <FontAwesome name='toggle-on' size={37} color='#19bfb7' />
                            : <FontAwesome name='toggle-off' size={37} color='#19bfb7' />}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.losslessText}>
                    <Text style={{fontSize: 11}}>High audio quality up to 24-bit/48kHz.</Text>
                    <Text style={{fontSize: 11}}>Turning this on will consume significally more data.</Text>
                </View>
                <View style={styles.dolbyAtmosButtonContainer}>
                    <View style={styles.dolbyAtmosButton}>
                        <View style={styles.directionForDolbyButton}>
                            <Text style={{fontSize: 19}}>Dolby Atmos</Text>
                            <View style={styles.dolbyIcon}>
                                <MaterialCommunityIcons name='dolby' size={20} color={colorScheme === 'light' ? 'black' : 'white'} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleToggleDolby}>
                            {toggleDolby ? <FontAwesome name='toggle-on' size={37} color='#19bfb7' />
                            : <FontAwesome name='toggle-off' size={37} color='#19bfb7' />}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dolbyText}>
                    <Text style={{fontSize: 11}}>Play supported songs in Dolby Atmos and other Dolby Audio formats.</Text>
                    <Text style={{fontSize: 11}}>Enables automatically Spatial Audio features.</Text>
                </View>
                <View style={styles.membershipContainer}>
                    <View style={styles.membership}>
                        <View style={styles.directionForMembership}>
                            <Text style={{fontSize: 19}}>Membership</Text>
                            <View style={styles.membershipIcon}>
                                <MaterialIcons name='card-membership' size={20} color={colorScheme === 'light' ? 'black' : 'white'} />
                            </View>
                        </View>
                        {membership ? <Text style={{fontSize: 18}}>Premium</Text>
                        : <Text style={{fontSize: 18}}>Free</Text>}
                    </View>
                </View>
                <View style={styles.membershipText}>
                    <Text style={{fontSize: 11}}>Just 6,99 € per month.</Text>
                    <TouchableOpacity onPress={handleMembership}>
                        {membership ? <Text style={{fontSize: 11, color: '#19bfb7'}}> Cancel</Text>
                        : <Text style={{fontSize: 11, color: '#19bfb7'}}> Get it now</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </GestureRecognizer>
    )
}

const getStyles = (colorScheme: string | null | undefined) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        userButtonContainer: {
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginVertical: 20,
            height: 90,
        },
        userButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 15,
            paddingHorizontal: 20,
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
            width: Dimensions.get('window').width - 30,
            height: '100%',
        },
        directionForUserButton: {
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        userInfo: {
            flexDirection: 'column',
            marginLeft: 10,
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        username: {
            paddingBottom: 1,
            fontSize: 20,
            fontWeight: 'bold',
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        changeInfo: {
            fontSize: 13,
            color: 'gray',
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        losslessButtonContainer: {
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 30,
            height: 60,
        },
        directionForLossLessButton: {
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        losslessButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 10,
            paddingHorizontal: 20,
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
            width: Dimensions.get('window').width - 30,
            height: '100%',
        },
        losslessIcon: {
            marginLeft: 3,
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        losslessText: {
            paddingHorizontal: 35,
        },
        dolbyAtmosButtonContainer: {
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 15,
            height: 60,
        },
        directionForDolbyButton: {
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        dolbyAtmosButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 10,
            paddingHorizontal: 20,
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
            width: Dimensions.get('window').width - 30,
            height: '100%',
        },
        dolbyIcon: {
            marginLeft: 3,
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        dolbyText: {
            paddingHorizontal: 35,
        },
        membershipContainer: {
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 15,
            height: 60,
        },
        membership: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 10,
            paddingHorizontal: 20,
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
            width: Dimensions.get('window').width - 30,
            height: '100%',
        },
        directionForMembership: {
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        membershipIcon: {
            marginLeft: 3,
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        membershipText: {
            flexDirection: 'row',
            paddingHorizontal: 35,
        },
        membeshipLabel: {

        },
        signOutButton: {

        },
    })
}
