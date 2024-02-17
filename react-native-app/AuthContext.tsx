import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


interface AuthProps {
    authState?: { accessToken: string | null; isAuthenticated: boolean | null };
    loadingState?: { isLoading: boolean };
    onSignUp?: (email: string, username: string, password: string) => Promise<any>;
    onSignIn?: (email: string, password: string) => Promise<any>;
    onSignOut?: () => Promise<any>;
    onRole?: (token: string) => Promise<any>;
    getRole?: () => Promise<any>;
    getUsername?: () => Promise<any>;
}

export const URL_AUTH = 'http://192.168.1.5:3000/auth/';
export const URL_USER = 'http://192.168.1.5:3000/user/me/';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        accessToken: string | null;
        isAuthenticated: boolean | null;
    }>({
        accessToken: null,
        isAuthenticated: false,
    })
    const [loadingState, setLoadingState] = useState<{
        isLoading: boolean;
    }>({
        isLoading: false,
    })

    useEffect(() => {
        const loadToken = async () => {
            setLoadingState({
                isLoading: true,
            });

            const token = await AsyncStorage.getItem('accessToken');

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    accessToken: token,
                    isAuthenticated: true,
                });
            }

            setLoadingState({
                isLoading: false,
            });
        };

        loadToken();
    }, []);

    const signup = async (email: string, username: string, password: string) => {
        try {
            setLoadingState({
                isLoading: true,
            });

            const result = await axios.post(`${URL_AUTH}signup`, { email, username, password });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

            setAuthState({
                accessToken: result.data.accessToken,
                isAuthenticated: true,
            });
            
            await AsyncStorage.setItem('accessToken', result.data.accessToken);

            setLoadingState({
                isLoading: false,
            });

            return result;
        } catch (error) {
            setLoadingState({
                isLoading: false,
            });

            return { error: true, message: (error as any).response.data.message, statusCode: (error as any).response.data.statusCode}
        }
    };

    const signin = async (email: string, password: string) => {
        try {
            setLoadingState({
                isLoading: true,
            });

            const result = await axios.post(`${URL_AUTH}signin`, { email, password });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

            setAuthState({
                accessToken: result.data.accessToken,
                isAuthenticated: true,
            });

            await AsyncStorage.setItem('accessToken', result.data.accessToken);

            setLoadingState({
                isLoading: false,
            });

            return result;
        } catch (error) {
            setLoadingState({
                isLoading: false,
            });

            return { error: true, message: (error as any).response.data.message, statusCode: (error as any).response.data.statusCode };
        }
    };

    const signout = async () => {
        setLoadingState({
            isLoading: true,
        });

        await AsyncStorage.removeItem('accessToken');

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            accessToken: null,
            isAuthenticated: false,
        });

        setLoadingState({
            isLoading: false,
        });
    };

    const Role = async (token: string) => {
        try {
            setLoadingState({
                isLoading: true,
            });

            const result = await axios.post(`${URL_AUTH}role`, { token });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

            setAuthState({
                accessToken: result.data.accessToken,
                isAuthenticated: true,
            });

            await AsyncStorage.setItem('accessToken', result.data.accessToken);

            setLoadingState({
                isLoading: false,
            });

            return result;
        } catch (error) {
            return { error: true, message: (error as any).response.data.message, statusCode: (error as any).response.data.statusCode };
        }
    };

    const role = async () => {
        try {
            const result = await axios.get(`${URL_USER}`);

            return result;
        } catch (error) {
            return { error: true, message: (error as any).response.data.message, statusCode: (error as any).response.data.statusCode };
        }
    };

    const username = async () => {
        try {
            const result = await axios.get(`${URL_USER}`);

            return result;
        } catch (error) {
            return { error: true, message: (error as any).response.data.message, statusCode: (error as any).response.data.statusCode };
        }
    };

    const value = {
        onSignUp: signup,
        onSignIn: signin,
        onSignOut: signout,
        onRole: Role,
        getRole: role,
        getUsername: username,
        authState,
        loadingState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}