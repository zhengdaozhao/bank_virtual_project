import React from 'react';
import { Radio, Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Verify(){
    const navigate = useNavigate();
    const [form] = Form.useForm();
    let vertype=0;
    const onChange = (changedValue, allValues) => {
        // console.log('changedValue:',changedValue);
        // console.log('allValues:',allValues);
        vertype=allValues.vertype;
      };

    const onNext =async () => {
        try {
            await form.validateFields();
            // console.log(vertype);
            navigate(`/本人確認手段を選択/${vertype}`);
        } catch (errorInfo) {
            // console.log('Failed:', errorInfo);
        }
    };

    return (
    <>
      <h2>本人確認手段を選択</h2>
      <Form 
        form={form}
        // initialValues={zpddyz}
        onValuesChange={onChange}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }} >
        <Form.Item  name='vertype' label='確認手段:'
            rules={[
                {
                required: true,
                message: '確認手段をを一つ選んでください!',
                },
            ]}
        >
            <Radio.Group >
                <Radio style={{color:'yellow',marginLeft:'1rem'}} value={1}>マイナマ(e-KYC)</Radio>
                <Radio style={{color:'yellow'}} value={2}>免許書(e-KYC)</Radio>
                <Radio style={{color:'yellow'}} value={3}>口座振込</Radio>
                <Radio style={{color:'yellow'}} value={4}>ご本人郵便</Radio>
            </Radio.Group>
        </Form.Item>
        <Button style={{width:'12rem',marginBottom:'2rem',marginLeft:'18rem'}} type="primary" danger onClick={onNext}>
            次へ
        </Button>
    </Form>
    </>
  );}
