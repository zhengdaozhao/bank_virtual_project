import { Form,useLoaderData,useNavigate } from "react-router-dom";
import { notification,Modal,Button } from "antd";
import CardService from "../util/cardService";
import { useState } from "react";

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function loader({ params }) {
    const requests =JSON.parse(localStorage.getItem('mjddyz'));
    let contact = requests.find(req => req.id === params.contactId);
    return { contact };
  }

export default function Contact() {
  const {contact}=  useLoaderData();
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);

  const LocalizedModal = () => {
    const showModal = () => {
      setOpen(true);
    };
    const hideModal = () => {
      setOpen(false);
    };
    return (
      <>
        <Button type="primary" onClick={showModal}>
          拒絶
        </Button>
        <Modal
          title="ご確認"
          open={open}
          onOk={handleRejectClick}
          onCancel={hideModal}
          okText="確認"
          cancelText="キャンセル"
        >
          該当お客さんの申し込みを拒絶してよろしい？
        </Modal>
      </>
    );
  };
  
  // const handleRejectClick=async ()=>{
  //   // const mjddyz=JSON.parse(localStorage.getItem('mjddyz'));
  //   const cxddyz={
  //     ...contact,
  //     status:'Reject'
  //   }
  //   // await deleteContact(params.contactId);
  //   try{
  //     await CardService.updateCardRequestStatus(cxddyz);
  //     openNotificationWithIcon('success','成功',cxddyz.name +'様のカード申込を拒絶しました');
  //     navigate("/review");
  //   }catch(err){
  //     openNotificationWithIcon('error','失敗','拒絶操作にエラー発生しました')
  //   }
  // }

  return (
    <div id="contact">
      <div>
        <img
          key={contact.cxddyz.address}
          src={contact.cxddyz.address || null}
        />
      </div>

      <div>
        <h1>
          {contact.name}
        </h1>

        {contact.email && (
          <p>
            {contact.email}
          </p>
        )}

        {contact.type && <p>{contact.type}</p>}

        <div>
          <Form action="edit">
            <button type="submit">カード発行</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={
              (event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }}
            }
          >
            <button type="submit">拒絶</button>
            {/* <button type="button" onClick={handleRejectClick}>拒絶</button> */}
            
          </Form>
          {/* <LocalizedModal /> */}
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}