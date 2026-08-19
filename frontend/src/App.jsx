import { useEffect } from "react";
import getCurrentUser from "./features/getCurrentUser";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();
        dispatch(setUserData(data));
      } catch (error) {
        dispatch(setUserData(null));
      }
    };

    getUser();
  }, []);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
