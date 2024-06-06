import { Outlet, Link,useLoaderData,
    Form,redirect,NavLink,
    useNavigation,useSubmit } from "react-router-dom";
import { getContacts } from "./Contacts";
import { createContact } from "./Contacts";
import { useEffect } from "react";

export async function action(){
    const contact= await createContact();
    // return { contact};
    return redirect(`/review/contacts/${contact.id}/edit`);
}

export default function Review() {
    const { contacts,q } = useLoaderData();
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
          <h1>カード審査待ちリスト</h1>
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
                <button type="submit">New</button>
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
            {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
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
                    {/* <Link to={`contacts/${contact.id}`}> */}
                        {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                        ) : (
                        <i>No Name</i>
                        )}{" "}
                        {contact.favorite && <span>★</span>}
                    {/* </Link> */}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
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
    const contacts = await getContacts(q);
    return { contacts, q };
  }