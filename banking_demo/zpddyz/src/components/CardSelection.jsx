import React from 'react';
import { Radio, Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../custom_hook/useLocalStorage';

function CardSelection() {
    // const [cardtype, setCardtype] = useLocalStorage("cardtype", null);
    const [zpddyz, setZpddyz] = useLocalStorage("zpddyz", null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onChange = (_, allValues) => {
        // setCardtype(allValues);
        setZpddyz((prev)=>{
          const updt={
            ...prev,
            ...allValues
          }
          return updt;
        });
      };
    const onNext = async () => {
        try {
            const values = await form.validateFields();
            navigate('/ご本人様の情報を入力');
            } catch (errorInfo) {
            // console.log('Failed:', errorInfo);
            }
    };

    return (
    <>
      <h2>カード基本属性選択</h2>
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
        <Form.Item  name='cardtype' label='カード種類:'
            rules={[
                {
                required: true,
                message: 'カード種類を一つ選んでください!',
                },
            ]}
        >
            <Radio.Group >
                <Radio style={{color:'yellow',marginLeft:'1rem'}} value={1}>VISAカード</Radio>
                <Radio style={{color:'yellow'}} value={2}>ＪＣＢカード</Radio>
                <Radio style={{color:'yellow'}} value={3}>銀聯カード</Radio>
            </Radio.Group>
        </Form.Item>
        <Button style={{width:'12rem',marginBottom:'2rem',marginLeft:'18rem'}} type="primary" danger onClick={onNext}>
            次へ
        </Button>
    </Form>
    </>
  );
}
export default CardSelection;