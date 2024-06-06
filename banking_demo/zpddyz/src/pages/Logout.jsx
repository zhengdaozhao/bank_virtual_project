import { redirect } from 'react-router-dom';

// export default function Logout() {
//   return(
//     <></>
//   )
// }

export function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('zpddyz');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  localStorage.removeItem('mjddyz');
  return redirect('/');
}