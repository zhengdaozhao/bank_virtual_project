import { useNavigate } from "react-router-dom";
import { useEffect ,useState} from "react";
import httpErrHandle from "../util/httpErrHandle";
import CardService from "../util/cardService";
import {
  Button,Table,
  Spin,Avatar
} from 'antd';
import {CloseCircleTwoTone,CheckCircleTwoTone} from '@ant-design/icons';
// 2024/5/22 toczpd the following object is a sample data from back end response
const zpddyz009={
  "id": "083a6ffe-6b08-4574-bf97-012e058f8e5a",
  "name": "静静",
  "email": "zj@gmail.com",
  "applyDate": "2024-05-15 10:24:50",
  "type": "VISA",
  "status": "Accept",
  "cxddyz": {
      "id": 5,
      "email": "zj@gmail.com",
      "name": "静静",
      "gender": "女",
      "age": 40,
      "occupation": "worker",
      "earning": 400,
      "marital": "離婚",
      "account": 622288888888888888,
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
    title: '申請者',
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
    title: '申請日',
    dataIndex: 'applyDate',
  },
  {
    title: '審査結果',
    dataIndex: 'status',
    render: text => text === 'Accept'? <span style={{color: '#177245'}}><CheckCircleTwoTone /> 通過</span>:
    <span style={{color: 'red'}}><CloseCircleTwoTone />  拒絶</span>
  },
]
export default function ReviewAll() {
  const navigate = useNavigate();
  const [user, setUser]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  useEffect( ()=>{
    const zpddyz = async ()=> {
        try{
          setIsLoading(true);
          const res = await CardService.getRequestsAll();
          setUser(res);
          setIsLoading(false);
        } catch(err){
          console.log(err);
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
            <h2>カード申請結果リスト取得中...</h2>
            <Spin style={{marginLeft:'23rem'}} size="large"/> 
          </>
          : 
          <>
            <h2>カード申請結果リスト</h2>
            <Table columns={columns} 
              dataSource={user} 
              rowClassName={getRowClassName}  
              rowKey={rec=>rec.id} 
              />
          </>
          }
      <Button style={{width:'12rem',marginTop:'1rem',marginBottom:'2rem',marginLeft:'18rem'}}  type="primary" danger onClick={()=>navigate('/')}>
        Ok
      </Button>
    </div>
  );
}