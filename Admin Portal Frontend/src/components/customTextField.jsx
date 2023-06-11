import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

const StyledField = styled(Field)`
  background-color: rgba(132, 136, 132, 0.4);
  color: white;
  border-radius: 8px;
  border: none;
  height: 35px;
  width: 300px;
  margin: 2px 0 2px 0;
  padding: 2px 0 2px 7px;
  &:focus {
    outline: 0.5px solid rgba(55, 255, 20, 0.5);
  }
`;

const StyledLabel = styled.label`
  display: inline-block;
  margin: 15px 0 0 7px;
  font-size: 14px;
  font-weight: 600;
  color: whitesmoke;
`;

const CustomTextField = ({ name, label, ...rest }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', margin: '0 0 5px 0'}}>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledField id={name} name={name} {...rest} />
      <ErrorMessage name={name} component="div" style={{ color: 'red', paddingLeft: '2px', fontSize: '13px'}} />
    </div>
  );
};

export default CustomTextField;
