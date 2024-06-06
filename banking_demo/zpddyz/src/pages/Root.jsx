import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import classes from './Root.module.css';
import back from '../assets/back.jpg'

const { Header } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  // backgroundColor: '#4096ff',
};

// import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  return (
    // <>
    <div className={classes.div}>
      {/* <Header style={headerStyle}>
        {'申し込みhome'}
      </Header> */}
      <main>
        <Outlet />
      </main>
    </div>
    // </>
  );
}

export default RootLayout;
