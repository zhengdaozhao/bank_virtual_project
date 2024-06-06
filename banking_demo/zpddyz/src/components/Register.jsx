import React, { useState } from "react";
import { createuser } from "../http/httpService";
import {
  useNavigate,
} from 'react-router-dom';
import {
  Button,
  Form,
  Input,notification,Space
} from 'antd';
import httpErrHandle from "../util/httpErrHandle";
import ButtonZpd from "../util/buttonZpd";
import ButtonColor from "../util/colorButton";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [back, setback] = useState("");
  // const [form] = Form.useForm();
  // const [isFetching,setFetch]=useState(false);
  // const [disabledInput, setDisabledInput] = useState(false);
  const onFinish = async (values) => {
    try {

      // const res = await createuser(user);
      const res = await createuser({
        firstname: values.firstname,
        lastname: values.lastname,
        email:values.email,
        password:values.password,
      });
      // const rtn = await res.data;
      form.resetFields();
      openNotificationWithIcon('success','登録成功!','')
      navigate('/auth/login');
      // console.log('the return value: ', res);
    }catch(err){
      httpErrHandle(err.response.status);
      // console.log('err!',err);
    }
  };

  const handleClick = async () => {
    try
    {
        // setFetch(true);
        // setDisabledInput(true)
        // const res = await api.get(`/api/goals/trans/${zparam}`);
        const res = await listusers();
        setUserId(res.data.email);
        setPassword(res.data.password);
        // setFetch(false)
        // setDisabledInput(false)
    } 
    catch(err)
    {
        // setFetch(false)
        // setDisabledInput(false)
        // console.log('err!',err);
    };
  }

  return (
    <>
    <h2>新規ユーザ登録</h2>
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
        name="firstname"
        label="first name"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    <Form.Item
        name="lastname"
        label="last name"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

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

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item {...tailFormItemLayout}>
      <Space>
        {/* <Button style={{width:'12rem',marginBottom:'1rem'}}  type="primary"  htmlType="submit">
          Register
        </Button> */}
        <ButtonZpd  zpddyz='Register' htmlType='submit' colorZpd={ButtonColor.colors3} />
        {/* <ButtonZpd handleCancelClick={()=>navigate('/auth/login')} zpddyz='キャンセル' /> */}
        <Button style={{width:'12rem',marginBottom:'1rem',marginLeft:'5px'}}  type="primary" danger onClick={()=>navigate('/auth/login')}>
          キャンセル
        </Button>
      </Space>
      </Form.Item>
    </Form>     
    </>
  );
}

export default Register;