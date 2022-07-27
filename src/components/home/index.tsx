import * as React from "react";
import { useDispatch } from "react-redux";
import { sagaActions } from "../../saga";
import Launches from "../launches";
import Title from "../title";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(sagaActions.load());
  }, []);
  return (
    <>
      <Title />
      <Launches />
    </>
  );
};

export default Home;
