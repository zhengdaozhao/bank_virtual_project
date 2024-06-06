import React from "react";
import { loginuser } from "../http/httpService";
import {
  useNavigate,
} from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  notification,
} from 'antd';
import ButtonZpd from "../util/buttonZpd";
import ButtonColor from "../util/colorButton";

const formItemLayout = {
  labelCol: {
    // xs: {
    //   span: 24,
    // },
    // sm: {
      span: 8,
    // },
  },
  wrapperCol: {
    // xs: {
    //   span: 24,
    // },
    // sm: {
      span: 16,
    // },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    // xs: {
    //   span: 24,
    //   offset: 0,
    // },
    // sm: {
      span: 16,
      offset: 8,
    // },
  },
};
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await loginuser({
        email:values.email,
        password:values.password,
      });
      openNotificationWithIcon('success','ログイン成功しました');
      form.resetFields();
      // console.log('the return value: ', res);
      localStorage.setItem('token', res.data.token);
      // localStorage.setItem('user', res.data.email);
      localStorage.setItem('role', res.data.role);  //2024/4/30
      localStorage.setItem('user',JSON.stringify(res.data.user));  //2024/5/9
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 30);
      localStorage.setItem('expiration', expiration);
      navigate('/');
    }catch(err){
      console.log(err);
      openNotificationWithIcon('error','エラー発生','ログイン失敗、emailまたはpasswordは不正です');
      return null;
      // console.log('err!',err);
    }
  };

  return (
    <>
    <h2>ログイン</h2>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      // initialValues={[]}
      style={{
        maxWidth: 600,
      }}
      // scrollToFirstError
    >

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        {/* <Button style={{width:'12rem',marginLeft:'4rem'}}  type="primary" danger htmlType="submit">
          Login
        </Button> */}
        <ButtonZpd zpddyz='Login' htmlType='submit' marginLeft='6rem' colorZpd={ButtonColor.colors3} />
      </Form.Item>
      <Form.Item  {...tailFormItemLayout}>
        <Button style={{color:"yellow",fontSize:24, width:'12rem',marginBottom:'1rem'}} type="link" htmlType="button" onClick={()=>navigate('/auth/register')}>
            会員ではない？ｻｲﾝｱｯﾌﾟはこちら
        </Button>
      </Form.Item>
    </Form>     
    </>
  );
}

export default Login;