import { Descriptions, Typography } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectors } from "../../../store/slice";

const Info: React.FC = () => {
  const params = useParams();
  const launch = useSelector(selectors.launches)[params.launchId];
  const rocket = useSelector(selectors.launchRocket)(params.launchId);
  const launchpad = useSelector(selectors.launchLaunchpad)(params.launchId);
  if (launch)
    return (
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">
          <b>{launch?.name}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {launch?.date.toLocaleString("ru-RU")}
        </Descriptions.Item>
        <Descriptions.Item label="Rocket">{rocket?.name}</Descriptions.Item>
        <Descriptions.Item label="Launchpad">
          <Typography.Paragraph>{launchpad?.name}</Typography.Paragraph>
          <Typography.Paragraph>{launchpad?.details}</Typography.Paragraph>
        </Descriptions.Item>
        {launch?.details && (
          <Descriptions.Item label="Details">
            {launch.details}
          </Descriptions.Item>
        )}
      </Descriptions>
    );
  return null;
};

export default Info;
