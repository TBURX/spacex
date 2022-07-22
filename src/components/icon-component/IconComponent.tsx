import * as React from "react";

export interface IIconComponentProps {
  src: string;
}

const IconComponent: React.FC<IIconComponentProps> = ({ src }) => (
  <img src={src} alt="" width={24} />
);

export default IconComponent;
