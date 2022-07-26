import * as React from "react";
import { useDispatch } from "react-redux";
import { sagas } from "../../saga";
import Title from "../title";
import Info from "./info";

const InfoPage: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(sagas.load());
  }, []);
  return (
    <>
      <Title homeButton />
      <Info />
    </>
  );
};

export default InfoPage;
