import React from 'react';
import { Input, InputNumber, Button, Form, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../custom_hook/useLocalStorage';

function Persona_1() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [zpddyz, setZpddyz] = useLocalStorage("zpddyz", null);

  const onNext = async () => {
    try {
        await form.validateFields();
        navigate('/ご本人様の情報を入力2');
      } catch (errorInfo) {
        // console.log('Failed:', errorInfo);
      }
  };
const onChange = (_, allValues) => {
    // setPersona(allValues);
    setZpddyz((prev)=>{
      const updt={
        ...prev,
        ...allValues
      }
      return updt;
    });    
  };
  return (
    <div>
      <h2>ご本人様の情報を入力</h2>
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
        <Form.Item name='name' label="姓名" 
            rules={[
                {
                required: true,
                message: '姓名を入力ください!',
                },
            ]}
        >
          <Input />
        </Form.Item>
        <Form.Item  name='gender' label="性別"
            rules={[
                {
                required: true,
                message: '性別を選んでください!',
                },
            ]}
        >
          <Radio.Group >
            <Radio style={{color:'yellow'}} value="male"> 男 </Radio>
            <Radio style={{color:'yellow'}} value="female"> 女 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item  name='age' label="年齢"
            rules={[
                {
                required: true,
                message: '年齢を入力ください!',
                },
            ]}
        >
            <InputNumber />
        </Form.Item>
        <Button style={{width:'12rem',marginBottom:'1rem',marginLeft:'18rem'}} type="primary"  danger onClick={onNext}>
          次へ
        </Button>
      </Form>
    </div>
  );
}

export default Persona_1;
