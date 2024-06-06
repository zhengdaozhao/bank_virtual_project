import { useParams } from 'react-router-dom';
import zpd from '../assets/verify.jpg';
import { Form, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import KafkaService from '../util/kafkaService';
import UserService from '../util/userService';
  
const verZpd =[
    {
        type:1,
        desc:'マイナマ(e-KYC)'
    },
    {
        type:2,
        desc:'免許書(e-KYC)'
    },
    {
        type:3,
        desc:'口座振込'
    },
    {
        type:4,
        desc:'ご本人郵便'
    },
]
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});



const Subverify = () => {

    const params = useParams();
    const dateZpd =new Date();
    const navigate = useNavigate();
    const email=JSON.parse(localStorage.getItem('user')).email;
    const zpddyz=JSON.parse(localStorage.getItem('zpddyz'));
    const name=zpddyz.name;
    const userApi={
        email:email,
        ...zpddyz
    }

    const onNext =async () => {
        try {
            const res1 = await UserService.createCardRequest(userApi);
            openNotificationWithIcon('success','成功','back end tables are successfully updated.')
            
            const res = await KafkaService.sendMessage(`${name} は${dateZpd}に申込申請を実施しました`);
            openNotificationWithIcon('success','成功','身分検証を申請しました。受付ご1週間審査結果を通知ます')
            
            // localStorage.removeItem('zpddyz');
            navigate('/');
        }catch(err){
            openNotificationWithIcon('error','failure to update backend tables',err)
            return null;
        }
    }
        // catch(err) {
        //     console.log(err)
        //     openNotificationWithIcon('error','身分検証は失敗しました',err)
        // }
    // };

    return (
        <>
            <h2>{`${verZpd.filter((item)=>item.type===Number(params.verId))[0].desc}   `} で本人確認を実施</h2>
            <img src={zpd} style={{marginLeft:'11rem'}} />
            <Form>
                <Button style={{width:'12rem',marginTop:'2rem',marginBottom:'2rem',marginLeft:'18rem'}} type="primary" danger onClick={onNext}>
                次へ
                </Button>
            </Form>
        </>
    )
}

export default  Subverify