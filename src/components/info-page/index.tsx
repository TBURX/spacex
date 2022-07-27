import * as React from "react";
import { useDispatch } from "react-redux";
import { sagaActions } from "../../saga";
import Title from "../title";
import Info from "./info";

const InfoPage: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(sagaActions.load());
  }, []);
  return (
    <>
      <Title homeButton />
      <Info />
    </>
  );
};

export default InfoPage;
