import React, { useEffect,useState } from "react";
import {
  useNavigate,
} from 'react-router-dom';
import {
  Button,Table,
  Spin,Avatar
} from 'antd';
import httpErrHandle from "../util/httpErrHandle";
import CardService from "../util/cardService";

// const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
// 2024/5/15 toczpd the following object is a sample data from back end response
const zpddyz009={
  "id": 1,
  "cardno": "888889402242617113",
  "name": "田田",
  "email": "tln@gmail.com",
  "beginday": "2024-05-15",
  "endday": "2039-05-15",
  "consumptions": null,
  "cxddyz": {
      "id": 1,
      "email": "tln@gmail.com",
      "name": "田田",
      "gender": "女",
      "age": 48,
      "occupation": "woman",
      "earning": 100,
      "marital": "既婚",
      "account": 622233334444445555,
      "address": "https://tse4-mm.cn.bing.net/th/id/OIP-C.zWf-nFdicY7dHTjaXZ04SgHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      "phone": null,
      "requests": [],
      "cards": []
  }
}
const columns = [
  {
    title: '画像',
    dataIndex: ['cxddyz','address'],
    // key: 'cardno',
    render: (imgUrl) => <Avatar src={imgUrl} />,
  },
  {
    title: 'ｶｰﾄﾞ番号',
    dataIndex: 'cardno',
    // key: 'cardno',
    render: (text) => <span style={{color:'red'}}>{text}</span>,
  },
  {
    title: '持主',
    dataIndex: 'name',
  },
  {
    title: '性別',
    dataIndex: ['cxddyz','gender'],
  },
  {
    title: '年齢',
    dataIndex: ['cxddyz','age'],
  },
  {
    title: 'メール',
    dataIndex: 'email',
  },
  {
    title: '有効開始日',
    dataIndex: 'beginday',
  },
  {
    title: '無効日',
    dataIndex: 'endday',
  },

  // {
  //   title: 'アクション',
  //   key: 'action',
  //   render: () => (
  //     <>
  //       <a>修正</a>
  //     </>
  //   ),
  // },
];


function AllCards() {
  const navigate = useNavigate();
  const [user, setUser]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  useEffect( ()=>{
    const zpddyz = async ()=> {
        try{
          setIsLoading(true);
          const res = await CardService.getCards();
          // console.log(res.data);
          setUser(res.data);
          setIsLoading(false);
        } catch(err){
          setIsLoading(false);
          httpErrHandle(err.response);
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
            <h2>カードリスト取得中...</h2>
            <Spin style={{marginLeft:'23rem'}} size="large"/> 
          </>
          : 
          <>
            <h2>カードリスト</h2>
            <Table columns={columns} 
              dataSource={user} 
              rowClassName={getRowClassName}  
              rowKey={rec=>rec.cardno} 
              />
          </>
          }
      <Button style={{width:'12rem',marginTop:'1rem',marginBottom:'2rem',marginLeft:'18rem'}}  type="primary" danger onClick={()=>navigate('/')}>
        Ok
      </Button>
    </div>
  );
}

export default AllCards;