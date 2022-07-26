import * as React from "react";
import { useDispatch } from "react-redux";
import { sagas } from "../../saga";
import Launches from "../launches";
import Title from "../title";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(sagas.load());
  }, []);
  return (
    <>
      <Title />
      <Launches />
    </>
  );
};

export default Home;
