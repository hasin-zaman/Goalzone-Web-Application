import React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  input[type="radio"]{
    accent-color: rgba(0, 128, 0, 0.7);
    }
`;

const RadioLabel = styled.label`
  color: whitesmoke;
  font-size: 14px;
  margin-left: 8px;
  position: relative;
  cursor: pointer;
`;

const RadioInput = styled(Field)`
  margin-right: 5px;
`;

const RadioField = ({ name, label, value }) => {
  return (
    <RadioContainer>
      <RadioInput type="radio" name={name} value={value} />
      <RadioLabel>{label}</RadioLabel>
    </RadioContainer>
  );
};

export default RadioField;
