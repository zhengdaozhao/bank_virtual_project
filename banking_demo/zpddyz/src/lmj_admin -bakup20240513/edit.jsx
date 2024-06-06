import { Form, useLoaderData,redirect,useNavigate, } from "react-router-dom";
import { updateContact } from "./Contacts";

export async function action({request,params}){
    const formData=await request.formData();
    const updates=Object.fromEntries(formData);
    await updateContact(params.contactId,updates);
    return redirect(`/review/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate=useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>名前</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>住所</span>
        <input
          type="text"
          name="twitter"
          placeholder="東京都千代田区丸の内3丁目"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>画像リンク</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>コメント</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={()=>navigate(-1)}>Cancel</button>
      </p>
    </Form>
  );
}