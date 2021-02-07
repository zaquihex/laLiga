import React from 'react';
import { string, func, any } from 'prop-types';
import styled from 'styled-components';

const DivLabel = styled.div`
  text-align: left;
  width: 115px;
  min-width: 115px;
  color: darkslategrey;
`;

export const InputField = ({ label, type, value, iconsField, onChange }) => (
  <div className="fieldForm fullwidth">
    <DivLabel>{label}</DivLabel>
    <div className="inputField">
      <input
        type={type}
        data-testid={`input-${label}`}
        value={value || ''}
        onChange={onChange}
      />
      {iconsField}
    </div>
  </div>
);

InputField.defaultProps = {
  value: '',
  iconsField: null,
  onChange: () => {},
};

InputField.propTypes = {
  label: string.isRequired,
  type: string.isRequired,
  value: string,
  iconsField: any,
  onChange: func,
};

export default InputField;
