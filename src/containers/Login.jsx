import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { withTranslation } from 'react-i18next';

import { faEye, faEyeSlash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserError, setLoginStart } from '../store/actions/common';

import { ButtonBig } from '../components/common/Button';

const ErrorDiv = styled.div`
  color: red;
  font-size: 0.8em;
`;

const DivLogin = styled.div`
  width: inherit;
  height: 80vh;
  text-align: -webkit-center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScreenFields = styled.div`
  padding: 25px;
  width: 50%;
  max-width: 500px;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  border-radius: 30px;
  border: 1px solid dimgray;
`;

const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
`;

const DivFormTitle = styled.div`
  margin-bottom: 15px;
`;

const DivLabel = styled.div`
  text-align: left;
  width: 115px;
  min-width: 115px;
  color: darkslategrey;
`;

const checkEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const Login = ({ t }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUserError(null));
  }, []);

  const [autologin, setAutologin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { common } = useSelector((state) => state);

  const [userInfo, setUserInfo] = useState({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  });

  const emailIsValid = checkEmail(userInfo.email);
  const loginBtnEnabled = userInfo.password.length > 0 && emailIsValid;

  return (
    <DivLogin data-testid="login-div-main">
      { common.user && <Redirect to="/" /> }
      <ScreenFields>
        <DivForm>
          <DivFormTitle>
            <h2>{t('login.title')}</h2>
            <span>{t('login.subtitle')}</span>
          </DivFormTitle>
          <div className="centerSelf">
            <div className="fieldForm fullwidth">
              <DivLabel>{t('login.email')}</DivLabel>
              <div className="inputField">
                <input
                  type="text"
                  value={userInfo.email}
                  onChange={(inputElem) => {
                    const { value } = inputElem.target;
                    setUserInfo({ ...userInfo, email: value });
                  }}
                />

                {!emailIsValid && userInfo.email.length > 0
                  && (
                    <div className="tooltip" style={{ zIndex: '10' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
                      <span className="tooltiptext">{t('login.emailNoValid')}</span>
                    </div>
                  )}
              </div>
            </div>
            <div className="fieldForm fullwidth ">
              <DivLabel>{t('login.password')}</DivLabel>
              <div className="inputField">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={userInfo.password}
                  onChange={(inputElem) => {
                    const { value } = inputElem.target;
                    setUserInfo({ ...userInfo, password: value });
                  }}
                />
                <div className="tooltip" style={{ zIndex: '10' }}>
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="icon" onClick={() => { setShowPassword(!showPassword); }} />
                  <span className="tooltiptext">{t(showPassword ? 'login.hidePass' : 'login.showPass')}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input type="checkbox" checked={autologin} onChange={() => { setAutologin(!autologin); }} />
            <label>{t('login.autologin')}</label>
          </div>
        </DivForm>

        <ButtonBig
          color="dimgrey"
          background="white"
          disabled={!loginBtnEnabled}
          onClick={() => {
            dispatch(setLoginStart(userInfo, autologin));
          }}
        >
          Login
        </ButtonBig>

        {common.errorLogin && <ErrorDiv>{common.errorLogin}</ErrorDiv>}
      </ScreenFields>
    </DivLogin>
  );
};

Login.propTypes = {
  t: func.isRequired,
};

export default withTranslation()(Login);