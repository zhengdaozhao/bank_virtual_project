import { Outlet, Link,useLoaderData,
    Form,redirect,NavLink,
    useNavigation,useSubmit } from "react-router-dom";
import { getContacts,getCardRequest } from "./Contacts";
import { useEffect } from "react";
import httpErrHandle from "../util/httpErrHandle";

export async function action(){
    // const contact= await createContact();
    // return { contact};
    return redirect(`/`);
}

export default function Review() {
    const { q,mjddyz } = useLoaderData();
    // console.log(mjddyz);
    localStorage.setItem("mjddyz",JSON.stringify(mjddyz));
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
      <div id="zpddyz">
        <div id="sidebar">
          <h1 style={{color:'green'}}>カード審査待ちリスト</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                    const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });

              }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            {/* <form method="post">
              <button type="submit">New</button>
            </form> */}
            <Form method="post">
                <button type="submit">Home</button>
            </Form>

          </div>
          <nav>
            {/* <ul>
              <li>
                <Link to={`/review/contacts/1`}>Your Name</Link>
              </li>
              <li>
                <Link to={`/review/contacts/2`}>Your Friend</Link>
              </li>
            </ul> */}
            {mjddyz.length ? (
            <ul>
              {mjddyz.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i style={{color:'red'}}>ﾍﾟﾝﾃﾞｨﾝｸﾞタスクがありません</i>
            </p>
          )}            
          </nav>
        </div>
        <div 
          id="detail"
          className={
            navigation.state === "loading" ? "loading" : ""
          }
        >
          <Outlet />
        </div>
      </div>
    );
  }

  export async function loader({request}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    // 2024/05/13 modify for bank project
    try {
      const mjddyz = await getCardRequest();
      return {q, mjddyz} 
    }
    catch(err) {
      httpErrHandle(err.response.status);
      return (redirect('/'));
    }
    // return { q, mjddyz };
  }