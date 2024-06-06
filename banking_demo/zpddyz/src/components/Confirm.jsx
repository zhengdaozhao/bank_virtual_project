// import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { Form, Button, Input } from 'antd';  

const occZpd =[
    {
        type:'student',
        desc:'学生'
    },
    {
        type:'woman',
        desc:'専業主婦'
    },
    {
        type:'worker',
        desc:'サラリーマン'
    },
    {
        type:'manager',
        desc:'管理職'
    },
]
const maritalZpd =[
    {
        type:1,
        desc:'未婚'
    },
    {
        type:2,
        desc:'既婚'
    },
    {
        type:3,
        desc:'離婚'
    },
]
const cardZpd =[
    {
        type:1,
        desc:'VISAカード'
    },
    {
        type:2,
        desc:'ＪＣＢカード'
    },
    {
        type:3,
        desc:'銀聯カード'
    },
]

const Confirm = () => {  
  const navigate = useNavigate();
    // 从localStorage获取姓名值  
  const zpddyz = JSON.parse(localStorage.getItem('zpddyz'));   
  const handleNext = () => {  
    navigate('/本人確認手段を選択');  
  };  
  
  
  return (  
    <>  
      <h2>ご入力情報をご確認</h2>  
      <Form 
    //   disabled
      labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 12,
        }} 
      >  
        <Form.Item name='name' label="姓名" initialValue={zpddyz.name}>  
          <Input />  
        </Form.Item>  
        <Form.Item name='gender' label="性別" initialValue={zpddyz.gender==='male'?'男':'女'}>  
          <Input />  
        </Form.Item>  
        <Form.Item name='age' label="年齢" initialValue={zpddyz.age}>  
          <Input />  
        </Form.Item>  
        <Form.Item name='occupation' label="職業" initialValue={occZpd.filter((item)=>item.type===zpddyz.occupation)[0].desc}>  
          <Input />  
        </Form.Item>  
        <Form.Item name='earning' label="収入" initialValue={`${zpddyz.earning} 万円`}>  
          <Input />  
        </Form.Item>  
        <Form.Item name='marital' label="婚姻" initialValue={maritalZpd.filter((item)=>item.type===zpddyz.marital)[0].desc}>  
          <Input />  
        </Form.Item>  
        <Form.Item name='account' label="振込番号" initialValue={zpddyz.account}>  
          <Input />  
        </Form.Item>  
        <Form.Item name='cardtype' label="ご申請クレジットカードタイプ" initialValue={cardZpd.filter((item)=>item.type===zpddyz.cardtype)[0].desc}>  
          <Input />  
        </Form.Item>  
        <Button style={{width:'12rem',marginBottom:'1rem',marginLeft:'12rem'}} type="primary"  danger onClick={handleNext}>
          次へ
        </Button>
        <Button style={{width:'12rem',marginBottom:'1rem',marginLeft:'2rem'}} type="primary" danger onClick={()=>navigate('/')}>
          Homeへ戻り
        </Button>
      </Form>  
    </>  
  );  
};  
  
export default Confirm;