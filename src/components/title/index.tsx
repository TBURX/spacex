import * as React from "react";
import { Button, Space, Typography } from "antd";
import { HomeFilled } from "@ant-design/icons";
import "./style.less";
import { useNavigate } from "react-router";
import GlobeIcon from "../globe-icon";

export interface ITitleProps {
  homeButton?: boolean;
}

const Title: React.FC<ITitleProps> = ({ homeButton }) => {
  const navigate = useNavigate();
  const clickHome = React.useCallback(() => {
    navigate("/");
  }, []);
  return (
    <Typography.Title className="title title-center" level={2}>
      <Space align="center">
        {homeButton && (
          <Button onClick={clickHome}>
            <HomeFilled />
          </Button>
        )}
        Explore the spaceX
        <GlobeIcon />
      </Space>
    </Typography.Title>
  );
};

export default Title;
