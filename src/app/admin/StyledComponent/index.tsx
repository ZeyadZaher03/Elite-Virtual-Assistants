import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 3px;
  border: 0;
  font-weight: 600;
  text-transform: uppercase;
  width: 8rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: all 200ms ease-in-out;
`;

export const ResetButton = styled(Button)`
  background-color: #882f2f;
  color: #fff;
  box-shadow: rgba(255, 0, 0, 0.2) 0px 2px 8px 0px;

  &:hover {
    background-color: #9c3535;
    box-shadow: rgba(255, 0, 0, 0.2) 0px 4px 10px 0px;
  }
`;
export const SaveButton = styled(Button)`
  background-color: #216e3b;
  color: #fff;
  box-shadow: rgba(0, 255, 64, 0.2) 0px 4px 10px 0px;

  &:hover {
    background-color: #1d9244;
  }
`;
