import './assets/styles/index.scss';
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <h1 className="text-center my-3">Welcome to Grama check!</h1>
      <div id="detail">
        {/* <Outlet /> tells the Root component where its child components should be rendered*/}
        <Outlet />
      </div>
    </>
  );
}

export default Root;
