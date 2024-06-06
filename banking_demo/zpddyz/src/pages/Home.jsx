import { useNavigate } from 'react-router-dom';
import { Button , Flex} from 'antd';
import { getAuthToken } from '../util/auth';
import ButtonColor from '../util/colorButton';
import ButtonZpd from '../util/buttonZpd';

// const { Content } = Layout;
// const contentStyle = {
//   display:'flex',
//   flexDirection:'column',
//   justifyContent:'center',
//   alignItems:'center',
//   textAlign: 'center',
//   minHeight: 120,
//   lineHeight: '60px',
//   color: '#fff',
//   backgroundColor: '#0958d9',
// };

function HomePage() {
  const navigate = useNavigate();
  const token=getAuthToken();
  const role=localStorage.getItem('role');
  const user=localStorage.getItem('user');
  let name=null;
  if(user){
    name=JSON.parse(user).name;
  }

  const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('zpddyz');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('mjddyz');
    navigate('/')
  }
  let zpdbyz='PAN照会' + (role==='ADMIN' ? '' : '(My Card)');


  return (
    // <>
    <Flex
      vertical
      gap="small"
      style={{
        width: '100%',
        alignItems:'center',
      }}
    >
      {/* <Content style={contentStyle}> */}
        {/* <> */}
        <h2>申し込みアプリＨＯＭＥ</h2>
          {token && role==='USER' &&
          <>
            <h3>
              ようこそ <span style={{color:'pink',fontSize:'28px'}}>{name}</span> 様。ご利用いただける機能は下記になります。
            </h3>
            {/* handleCancelClick,zpddyz,htmlType,marginLeft,colorZpd */}
            <ButtonZpd handleCancelClick={() => navigate('/利用規約')} zpddyz='カード申し込み' colorZpd={ButtonColor.colors4}/>
             {/* <Button style={{width:'9rem',marginTop:'2rem'}} type="primary" danger onClick={() => navigate('/利用規約')}>カード申し込み</Button> */}
            {/* <Button style={{width:'9rem',marginTop:'2rem'}} type="primary" danger onClick={() => navigate('/messages')}>通知一覧</Button> */}
          </>
          }
          {token && role==='ADMIN' &&
          <>
            <h3>
              銀行社員利用のページです。機能一覧は下記になります。
            </h3>
            <ButtonZpd handleCancelClick={() => navigate('/messages')} zpddyz='通知一覧' colorZpd={ButtonColor.colors5}/>
            <ButtonZpd handleCancelClick={() => navigate('/user/all')} zpddyz='顧客一覧' colorZpd={ButtonColor.colors5}/>
            <ButtonZpd handleCancelClick={() => navigate('/review')} zpddyz='受付審査' colorZpd={ButtonColor.colors5}/>
            <ButtonZpd handleCancelClick={() => navigate('/review/all')} zpddyz='受付結果' colorZpd={ButtonColor.colors5}/>
            {/* <Button style={{width:'9rem',marginTop:'2rem'}} type="primary" danger onClick={() => navigate('/user/all')}>顧客一覧</Button>
            <Button style={{width:'9rem',marginTop:'2rem'}} type="primary" danger onClick={() => navigate('/review')}>受付審査</Button> */}
          </>
          }
          {token && <>
          <ButtonZpd handleCancelClick={() => navigate('/card/all')} zpddyz={zpdbyz} colorZpd={ButtonColor.colors4}/>
          <ButtonZpd handleCancelClick={() => navigate('/user/one')} zpddyz='ご自身情報一覧' colorZpd={ButtonColor.colors4}/>
          <ButtonZpd handleCancelClick={logout} zpddyz='ログアウト' colorZpd={ButtonColor.colors3}/>
          {/* <Button style={{width:'9rem',marginTop:'2rem'}} type="primary" danger onClick={() => navigate('/card/all')}>PAN照会{role==='ADMIN' ?'':'(My Card)'}</Button> */}
          {/* <Button style={{width:'9rem',marginTop:'2rem'}} type="primary" danger onClick={() => navigate('/user/one')}>ご自身情報一覧</Button> */}
          {/* <Button style={{width:'9rem',marginTop:'2rem',marginBottom:'2rem'}} type="primary" danger onClick={logout}>ログアウト</Button> */}
          </>}

          {/* <Button style={{width:'9rem',marginBottom:'2rem'}} type="primary" danger onClick={() => navigate('/ログイン')}>ログイン</Button> */}
          {!token && 
          <Button style={{width:'9rem',marginBottom:'2rem'}} type="primary" danger onClick={() => navigate('/auth/login')}>ログイン</Button>
          }
        {/* </> */}
      {/* </Content> */}
    </Flex>
    // </>
  );
}

export default HomePage;
