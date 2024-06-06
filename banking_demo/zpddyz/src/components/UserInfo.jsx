import React, { useEffect,useState } from "react";
import {
  useNavigate,
} from 'react-router-dom';
import {
  Button,Flex,
  Input,notification,Typography
} from 'antd';
import httpErrHandle from "../util/httpErrHandle";
import UserService from "../util/userService";

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

function UserInfo() {
  const navigate = useNavigate();
  const [user, setUser]=useState({
    name:'',
    email:'',
    password:''
  });
  useEffect( ()=>{
    const zpddyz = async ()=> {
        try{
          const res = await UserService.getCurrentUser();
          // console.log(res);
          setUser(()=>{
            const newUser= {
            name:res.data.name,
            email:res.data.email,
            password:res.data.password
            };
            return newUser;
        });
        } catch(err){
          console.log(err);
          httpErrHandle(err.response.status);
        }
    };
    zpddyz();
  },[]);


  return (
    <>
      <h2>お客様情報一覧</h2>
      <Flex vertical >
      <div style={{alignSelf:'center'}}>
        <Typography.Title level={5} style={{color:"yellow"}}>名前</Typography.Title>
        <Input value={user.name}
        />
      </div>
      <div style={{alignSelf:'center'}}>
        <Typography.Title level={5} style={{color:"yellow"}}>e-mail</Typography.Title>
        <Input  value={user.email}
        />
      </div>
      <div style={{alignSelf:'center'}}>
        <Typography.Title level={5} style={{color:"yellow"}}>パスワード</Typography.Title>
        <Input value={user.password}
        />
      </div>

      <Button style={{width:'12rem',marginTop:'3rem',marginBottom:'2rem',marginLeft:'18rem'}}  type="primary" danger onClick={()=>navigate('/')}>
        Ok
      </Button>
      </Flex>
    </>
  );
}

export default UserInfo;