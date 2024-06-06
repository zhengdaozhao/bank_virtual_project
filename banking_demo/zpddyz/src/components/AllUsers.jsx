import React, { useEffect,useState } from "react";
import {
  useNavigate,
} from 'react-router-dom';
import {
  Button,Table,
  Spin
} from 'antd';
import httpErrHandle from "../util/httpErrHandle";
import UserService from "../util/userService";

// const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

const columns = [
  {
    title: '姓',
    dataIndex: 'firstname',
    key: 'firstname',
    render: (text) => <span style={{color:'red'}}>{text}</span>,
  },
  {
    title: '名',
    dataIndex: 'lastname',
    key: 'lastname',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'メールアドレス',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'アクション',
    key: 'action',
    render: () => (
      <>
        <a>修正</a>
      </>
    ),
  },
];


function AllUsers() {
  const navigate = useNavigate();
  const [user, setUser]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  useEffect( ()=>{
    const zpddyz = async ()=> {
        try{
          setIsLoading(true);
          const res = await UserService.getAllUsers();
          // console.log(res.data);
          setUser(res.data);
          setIsLoading(false);
        } catch(err){
          setIsLoading(false);
          httpErrHandle(err.response.status);
          // setIsLoading(true);
          // console.log(err);
        }
    };
    zpddyz();
  },[]);

const getRowClassName = (_, index) => {
    let className = ''
    // oddRow 和 evenRow为我们css文件中的样式名称
    className = index % 2 === 0 ? "oddRow" : "evenRow"
    return className
  }

  return (
    <div style={{background:'white'}}>
          {isLoading ?
          <>
            <h2>お客様リスト取得中...</h2>
            <Spin style={{marginLeft:'23rem'}} size="large"/> 
          </>
          : 
          <>
            <h2>お客様リスト</h2>
            <Table columns={columns} 
              dataSource={user} 
              rowClassName={getRowClassName}  
              rowKey={rec=>rec.email} 
              />
          </>
          }
      <Button style={{width:'12rem',marginTop:'1rem',marginBottom:'2rem',marginLeft:'18rem'}}  type="primary" danger onClick={()=>navigate('/')}>
        Ok
      </Button>
    </div>
  );
}

export default AllUsers;