import React from 'react';
import { InputNumber, Button, Form, Radio, Select} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../custom_hook/useLocalStorage';

function Persona_2() {
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
        const values = await form.validateFields();
        // console.log('Success:', values);
        navigate('/口座振替のご設定');
      } catch (errorInfo) {
        // console.log('Failed:', errorInfo);
      }
    // navigate('/口座振替のご設定');
  };

  return (
    <div>
      <h2>ご本人様の情報を入力-続き</h2>
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
        <Form.Item
            name="occupation"
            label="職業"
            // hasFeedback
            rules={[
                {
                required: true,
                message: '職業を一つ選んでください!',
                },
            ]}
        >
            <Select placeholder="Please select a occupation">
                <Select.Option value="student">学生</Select.Option>
                <Select.Option value="woman">専業主婦</Select.Option>
                <Select.Option value="worker">サラリーマン</Select.Option>
                <Select.Option value="manager">管理職</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item  name='earning' label="年収(万円)">
            <InputNumber />
        </Form.Item>
        <Form.Item  name='marital' label="婚姻"
            rules={[
                {
                required: true,
                message: '婚姻状況を一つ選んでください!',
                },
            ]}
        >
          <Radio.Group >
            <Radio style={{color:'yellow'}} value={1}> 未婚 </Radio>
            <Radio style={{color:'yellow'}} value={2}> 既婚 </Radio>
            <Radio style={{color:'yellow'}} value={3}> 離婚 </Radio>
          </Radio.Group>
        </Form.Item>
        <Button style={{width:'12rem',marginBottom:'1rem',marginLeft:'12rem'}} type="primary"  danger onClick={onNext}>
          次へ
        </Button>
        <Button style={{width:'12rem',marginBottom:'1rem',marginLeft:'2rem'}} type="primary" danger onClick={()=>navigate('/')}>
          Homeへ戻り
        </Button>
      </Form>
    </div>
  );
}

export default Persona_2;
