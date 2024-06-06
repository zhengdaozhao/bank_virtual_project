// import MainNavigation from '../components/MainNavigation';
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate=useNavigate();
  return (
    <>
      {/* <MainNavigation /> */}
      <main>
        <h1>An error occurred!</h1>
        <p>Could not find this page!</p>
        <button type="button" onClick={()=>navigate('/')} >
          Home
        </button>
      </main>
    </>
  );
}

export default ErrorPage;
