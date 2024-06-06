import { redirect, Navigate} from 'react-router-dom';
import {action as LogoutAction} from '../pages/Logout';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('zpddyz');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('mjddyz');
  
    // return 'EXPIRED';
    return null;
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth/login');
    // return Navigate('/auth/login');
  }
}
