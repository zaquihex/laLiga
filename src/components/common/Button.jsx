import styled, { css } from 'styled-components';

export const Button = styled.button`
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  border: 2px solid dimgrey;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
   & :hover {
    color: white;
    background-color: dimgrey;
  }
`;

export const ButtonBig = styled.button`
    font-size: 1em;
    margin: 0.25em;
    padding: 0.5em 5em;
    border: 2px solid dimgrey;
    border-radius: 5px;
    color: ${(props) => !props.disabled ? props.background : props.color};
    background-color: ${(props) => !props.disabled ? props.color : props.background};
    transition: all .5s ease-out;
    
     ${(props) => !props.disabled ? css`
        cursor: pointer;
        background-color: grey;
      ` : css`
        background-color: darkgrey;
      `};
    ${(props) => !props.disabled ? css`
        & :hover {
              padding: ${() => !props.disabled ? '0.5em 6em' : '0.5em 5em'};
              color: ${() => !props.disabled ? props.color : props.background};
              background-color: ${() => !props.disabled ? props.background : props.color};
            }` : null
};
`;
