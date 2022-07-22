import * as React from "react";
import { Button, Space, Typography } from "antd";
import { HomeFilled } from "@ant-design/icons";
import "./Title.less";
import IconComponent from "../icon-component/IconComponent";

export interface ITitleProps {
  homeButton?: boolean;
  icon?: string;
}

const Title: React.FC<ITitleProps> = ({ icon, homeButton }) => (
  <Typography.Title className="title title-center" level={2}>
    <Space align="center">
      {homeButton && (
        <Button>
          <HomeFilled />
        </Button>
      )}
      Explore the space
      {icon && <IconComponent src={icon} />}
    </Space>
  </Typography.Title>
);

export default Title;
