import { Card } from "antd";
import classNames from "classnames";
import * as React from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Launch } from "../../../../model/types";
import { selectors } from "../../../../store/slice";

export interface ILaunchCardProps {
  launch: Launch;
  draggable?: boolean;
  dragType?: string;
}

const LaunchCard: React.FC<ILaunchCardProps> = ({
  launch,
  draggable,
  dragType,
}) => {
  const navigate = useNavigate();
  const rocket = useSelector(selectors.launchRocket);
  const onClick = React.useCallback(() => {
    navigate(`/info/${launch.id}`);
  }, []);
  const [{ isDragging }, dragRef] = useDrag({
    type: dragType ?? "",
    item: launch,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  const cardClassNames = classNames(
    {
      highlighted: isDragging,
    },
    "launch-card"
  );
  return (
    <Card
      className={cardClassNames}
      ref={draggable ? dragRef : null}
      hoverable
      title={launch.name}
      onClick={onClick}
    >
      {rocket(launch.id)?.name}
    </Card>
  );
};

export default LaunchCard;
