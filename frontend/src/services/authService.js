import api from './api';
import { setToken, setUserData, removeToken, removeUserData } from '../utils/localStorage';

export const loginUser = async (credentials) => {
  // Dummy authentication
  const dummyUser = {
    id: 1,
    name: 'Test User',
    role: credentials.role || 'user',
    token: 'dummy-jwt-token-123'
  };
  
  setToken(dummyUser.token);
  setUserData(dummyUser);
  
  return dummyUser;
};

export const logoutUser = () => {
  removeToken();
  removeUserData();
};