import "../styles/style.css";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  //if (commonStore.appLoaded) return <LoadingComponent />;

  return (
    <div className="App">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
