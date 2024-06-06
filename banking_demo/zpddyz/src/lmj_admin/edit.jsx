import { Form, useLoaderData,redirect,useNavigate, } from "react-router-dom";
import { useState } from "react";
import CardService from "../util/cardService";
import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});


export async function action({request,params}){
    const requests =JSON.parse(localStorage.getItem('mjddyz'));
    let mjddyz = requests.find(req => req.id === params.contactId);
  // const mjddyz=JSON.parse(localStorage.getItem('mjddyz'));
    const formData=await request.formData();
    // console.log(formData);
    let cardno=formData.get('cardno');
    // const {cardno}=Object.fromEntries(formData);
    // console.log(cardno);
    // return null;
    if (!cardno) {
      openNotificationWithIcon('error','エラー','PANは未発行です。')
      return null;
    }
    // let cards=mjddyz.cxddyz.cards;
    // let cxddyz=mjddyz.cxddyz;
    // cards.unshift(cardno);
    const zpddyz={
      ...mjddyz,
      name:cardno,  //save the cardno to name property of Api because there is no
      // cxddyz:{
      //   ...cxddyz,
      //   cards:cards
      // },
      status:'Accept',
    }
    try{
      await CardService.updateCardRequestStatus(zpddyz);
      openNotificationWithIcon('success','成功','PAN発行は完了しました')
    }catch(err){
      openNotificationWithIcon('error','失敗','PAN発行関連db更新操作にエラー発生しました')
    }
    return redirect("/review");
}

export default function EditContact() {
  const [zpddyz,setZpddyz]=useState();
  const [loading,setLoading]=useState();
  const { contact } = useLoaderData();
  const navigate=useNavigate();

  const handleBtnClick= ()=>{
    setLoading(true);
    setTimeout(httpRequestToGetCardNo,5000);
  }
  const httpRequestToGetCardNo= async ()=>{
    // setLoading(true);
    const res=await CardService.getPancode();
    // console.log(json.toString(res) );
    setZpddyz('8888'+res.data);
    setLoading(false);
  }

  const handleSaveClick=async ()=>{
    // const requests =JSON.parse(localStorage.getItem('mjddyz'));
    // let mjddyz = requests.find(req => req.id === params.contactId);
    if (!zpddyz) {
      openNotificationWithIcon('error','エラー','PANは未発行です。')
      return null;
    }
    const cxddyz={
      ...contact,
      name:zpddyz,
      status:'Accept',
    }
    try{
      await CardService.updateCardRequestStatus(cxddyz);
      openNotificationWithIcon('success','成功','PAN発行は完了しました');
      navigate("/review");
    }catch(err){
      openNotificationWithIcon('error','失敗','PAN発行関連db更新操作にエラー発生しました')
    }
  }

  return (
    <Form method="post" id="contact-form">
      <label>
        <span>名前</span>
        <input
          placeholder="Name"
          // aria-label="name"
          type="text"
          name="name"
          // readOnly
          defaultValue={contact?.name}
        />
      </label>
      <label>
        <span>住所</span>
        <input
          type="text"
          name="address"
          placeholder="東京都千代田区丸の内3丁目"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>申請ｶｰﾄﾞﾀｲﾌﾟ</span>
        <input
          type="text"
          name="type"
          placeholder="credit card type"
          defaultValue={contact?.type}
        />
      </label>
      <label>
        <span>PAN採番</span>
        {/* <Pan cfxback={handleBtnClick}/> */}
        {loading?  <div
                id="zpddyz-spinner"
                aria-hidden
              /> : 
        <>
          <input
            type="text"
            name="cardno"
            placeholder="credit card number"
            style={{backgroundColor:'yellow'}}
            defaultValue={zpddyz}
          />
          <button style={{backgroundColor:'red',color:'white'}} type="button" onClick={handleBtnClick}>採番</button>
        </>
        }
      </label>
      <p>
        {/* <button type="button" onClick={handleSaveClick}>Save</button> */}
        <button type="submit">Save</button>
        <button type="button" onClick={()=>navigate(-1)}>Cancel</button>
      </p>
    </Form>
  );
}