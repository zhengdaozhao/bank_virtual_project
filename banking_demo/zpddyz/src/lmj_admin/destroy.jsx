import { redirect } from "react-router-dom";
import CardService from "../util/cardService";
import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function action({ params }) {
  const requests =JSON.parse(localStorage.getItem('mjddyz'));
  let mjddyz = requests.find(req => req.id === params.contactId);
  const cxddyz={
    ...mjddyz,
    status:'Reject'
  }
  try{
    await CardService.updateCardRequestStatus(cxddyz);
    openNotificationWithIcon('success','成功','PAN発行を拒絶しました')
  }catch(err){
    openNotificationWithIcon('error','失敗','拒絶操作にエラー発生しました')
  }
  return redirect("/review");
}