import AuthStorage from '@/utils/authStorage';
import { createContext } from 'react';

const AuthStorageContext = createContext<AuthStorage | null>(null);

export default AuthStorageContext;