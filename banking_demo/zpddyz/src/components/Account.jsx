import React from 'react';
import { Input, Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../custom_hook/useLocalStorage';

function Account() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [zpddyz, setZpddyz] = useLocalStorage("zpddyz", null);
  const onChange = (_, allValues) => {
    setZpddyz((prev)=>{
      const updt={
        ...prev,
        ...allValues
      }
      return updt;
    });   };
  const onNext = async () => {
    try {
        await form.validateFields();
        // console.log('Success:', values);
        navigate('/ご入力情報をご確認');
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
    // navigate('/口座振替のご設定');
  };

  return (
    <div>
      <h2>口座振替のご設定</h2>
      <Form 
        form={form}
        initialValues={zpddyz}
        onValuesChange={onChange}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }} >
        <Form.Item name='account' label="口座番号"            
            rules={[
                {
                required: true,
                message: '口座番号を入力ください!',
                },
                {
                pattern: /6222\d{14}/,
                message: '口座番号を6222開始の18桁の数字入力ください!',
                },
            ]}
        >
          <Input />
        </Form.Item>
        <Button style={{width:'12rem',marginBottom:'1rem',marginLeft:'18rem'}} type="primary" danger  onClick={onNext}>
          次へ
        </Button>
      </Form>
    </div>
  );
}

export default Account;
