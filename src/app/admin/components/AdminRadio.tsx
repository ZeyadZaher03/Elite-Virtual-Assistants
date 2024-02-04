import React from "react";
import styled from "styled-components";

const RadioItem = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ $selected }) => ($selected ? "#c7e1eb" : "#eeeeee")};
  border: 1px solid ${({ $selected }) => ($selected ? "#2293c0" : "#ddd")};
  padding: 2rem;
  flex: 1;
  text-align: center;
`;

export const AdminRadio = ({
  onClick,
  value,
  selected,
}: {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
  selected: boolean;
}) => {
  return (
    <RadioItem
      onClick={onClick}
      data-value={value}
      $selected={selected}
      data-selected={selected}
    >
      {value}
    </RadioItem>
  );
};
