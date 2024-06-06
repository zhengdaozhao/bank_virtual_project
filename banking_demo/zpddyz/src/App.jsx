import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import CardApplication from "./components/CardApplication";
import Login from "./components/Login";
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import CardSelection from "./components/CardSelection";
import Persona_1 from "./components/Persona_1";
import Persona_2 from "./components/Persona_2";
import Account from "./components/Account";
import Confirm from "./components/Confirm";
import Verify from "./components/Verify";
import Subverify from "./components/Subverify";
import { action as logoutAction } from './pages/Logout';
import { tokenLoader } from "./util/auth";
import Register from "./components/Register";
import UserInfo from "./components/UserInfo";
import KafkaMonitor from "./components/KafkaMonitor";
import Review,{ loader as reviewLoader, action as reviewAction, } from "./lmj_admin/Review";
import Contact,{ loader as contactLoader} from "./lmj_admin/Contact";
import EditContact,{action as editAction} from "./lmj_admin/edit";
import { action as delAction } from "./lmj_admin/destroy";
import AllUsers from "./components/AllUsers";
import AllCards from "./components/AllCards";
import ReviewAll from "./lmj_admin/ReviewAll";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      // { path: '/', element: <HomePage /> },
      { index: true, element: <HomePage /> },
      { path: '/利用規約', element: <CardApplication /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/user/one', element: <UserInfo /> },
      { path: '/user/all', element: <AllUsers /> },
      { path: '/card/all', element: <AllCards /> },
      { path: '/カード基本属性選択', element: <CardSelection /> },
      { path: '/ご本人様の情報を入力', element: <Persona_1 /> },
      { path: '/ご本人様の情報を入力2', element: <Persona_2 /> },
      { path: '/口座振替のご設定', element: <Account /> },
      { path: '/ご入力情報をご確認', element: <Confirm /> },
      { path: '/本人確認手段を選択', element: <Verify /> },
      { path: '/本人確認手段を選択/:verId', element: <Subverify /> },
      { path: '/messages', element: <KafkaMonitor /> },
      { path: '/review/all',
          element: <ReviewAll />,
          // loader:reviewAllLoader
      },
      { path: '/review', 
          element: <Review />,
          loader:reviewLoader,
          action:reviewAction,
          children:[
        {
          path: "contacts/:contactId",
          element: <Contact />,
          loader: contactLoader,
        },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact/>,
          action: editAction,
          loader: contactLoader,
        },
        {
          path: "contacts/:contactId/destroy",
          action: delAction,
          // loader: contactLoader,
        },
      ] },
      {
        path: 'logout',
        // element: <Logout />,
        action: logoutAction,
      },
     ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
