import { Card, Space } from "antd";
import classNames from "classnames";
import * as React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Launch } from "../../../model/types";
import { sagaActions } from "../../../saga";
import { DragTypes } from "../../../types";
import LaunchCard from "./launch-card";
import "./style.less";

export interface ILaunchColumProps {
  title: string;
  launches: Launch[];
  dragType?: DragTypes;
  draggable?: boolean;
  dropTypes?: DragTypes[];
  droppable?: boolean;
}

const LaunchColumn: React.FC<ILaunchColumProps> = ({
  title,
  launches,
  dragType,
  dropTypes,
  draggable,
  droppable,
}) => {
  const dispatch = useDispatch();
  const [{ isOver }, dropRef] = useDrop({
    accept: dropTypes?.length ? dropTypes : "",
    drop: (item: Launch) => {
      if (dropTypes.includes(DragTypes.UPCOMING)) {
        dispatch(sagaActions.reserve({ launch: item, isReserved: true }));
      }
      if (dropTypes.includes(DragTypes.RESERVED)) {
        dispatch(sagaActions.unreserveConfirm(item));
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });
  const className = classNames({ highlighted: isOver }, "launch-column");
  return (
    <Card
      ref={droppable ? dropRef : null}
      className={className}
      title={title}
      headStyle={{ textAlign: "center" }}
    >
      <Space direction="vertical">
        {launches.map((launch) => (
          <LaunchCard
            draggable={draggable}
            dragType={dragType}
            key={launch.id}
            launch={launch}
          />
        ))}
      </Space>
    </Card>
  );
};

export default LaunchColumn;
