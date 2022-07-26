import { Col, Row } from "antd";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { selectors } from "../../store/slice";
import { DragTypes } from "../../types";
import LaunchColumn from "./launch-column";

const Launches: React.FC = () => {
  const pastLaunches = useSelector(selectors.pastLaunches);
  const upcomingLaunches = useSelector(selectors.upcomingLaunches);
  const reservedLaunches = useSelector(selectors.reservedLaunches);
  return (
    <DndProvider backend={HTML5Backend}>
      <Row>
        <Col span={8}>
          <LaunchColumn title="PAST LAUNCHES" launches={pastLaunches} />
        </Col>
        <Col span={8}>
          <LaunchColumn
            dragType={DragTypes.UPCOMING}
            dropTypes={[DragTypes.RESERVED]}
            draggable
            droppable
            title="LAUNCHES"
            launches={upcomingLaunches}
          />
        </Col>
        <Col span={8}>
          <LaunchColumn
            dragType={DragTypes.RESERVED}
            dropTypes={[DragTypes.UPCOMING]}
            draggable
            droppable
            title="MY LAUNCHES"
            launches={reservedLaunches}
          />
        </Col>
      </Row>
    </DndProvider>
  );
};

export default Launches;
