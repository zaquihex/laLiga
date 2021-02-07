import React, { useState, useEffect } from 'react';
import { instanceOf, func } from 'prop-types';

import { withTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faUndo, faSpinner, faExclamationTriangle, faRedo } from '@fortawesome/free-solid-svg-icons';

import img404 from 'assets/404.png';
import imgLoading from 'assets/loading.gif';

import { deleteUserStart, getUserDetailStart, initUserDeleted, updateDataStart } from '../store/actions/userDetail';

import Toolbar from '../components/common/Toolbar';
import InputField from '../components/common/InputField';
import { Button } from '../components/common/Button';
import ErrorMsg from '../components/common/ErrorMsg';

const DivConfirmDialog = styled.div`
  width: 345px;
  height: 100px;
  border-radius: 10px;
  position: absolute;
  background-color: #443c3c;
  z-index: 1;
  margin: 10px;
`;

const DivModalBtns = styled.div`
  position: absolute;
  right: 10px;
  bottom: 0;
`;

const UserDetail = ({ t, match, history }) => {
  const { id: idUser } = match.params;
  const [timeData, setTimeData] = useState(0);
  const { common, userDetail } = useSelector((state) => state);
  const { user } = common;
  const { data, loading, error, loadingUpdate, errorUpdated, dateUpdated, errorDeleted, loadingDeleted, userDeleted } = userDetail;
  const dispatch = useDispatch();
  if (userDeleted) {
    dispatch(initUserDeleted());
    history.push('/');
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const { first_name, last_name, email } = data;
  const { firstName: nameModif, lastName: lastNameModif, email: emailModif } = userInfo;

  useEffect(() => {
    dispatch(getUserDetailStart(idUser, user.token));
  }, []);

  useEffect(() => {
    if (data) {
      setUserInfo({
        firstName: first_name,
        lastName: last_name,
        email,
      });
    }
  }, [data]);

  useEffect(() => {
    setUserInfo({
      firstName: first_name,
      lastName: last_name,
      email,
    });
  }, [dateUpdated]);

  // interval to increment data time
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeData(timeData + 1);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [timeData]);

  const dataModif = first_name !== nameModif || last_name !== lastNameModif || email !== emailModif;
  return (
    <div className={loading ? 'centerSelf' : ''}>
      {showDeleteModal && (
        <DivConfirmDialog>
          <div className="relative centerElements flex" data-testid="userDetail-removeModal">
            <div className="colorTextInverse marginTopStandard fullwidth">{t('userDetail.confirmDelete')}</div>
            <DivModalBtns className="flex">
              <Button fg="dimgrey" bg="white" fgHover="white" bgHover="dimgrey" onClick={() => {
                setShowDeleteModal(false);
              }}>
                Cancel
              </Button>
              <Button fg="white" bg="red" fgHover="white" bgHover="#e00505" onClick={() => {
                dispatch(deleteUserStart(idUser, user.token));
                setShowDeleteModal(false);
              }}>
                Remove
              </Button>
            </DivModalBtns>
          </div>
        </DivConfirmDialog>
      )}
      {
        error ? error === 404
          ?
            <img alt="404 not found" src={img404} width="100%" />
          :
            <ErrorMsg data-testid="usersList-errorMsg">
              <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
              <span className="paddingLeftSmall">Error has happened</span>
            </ErrorMsg>
          : null
      }
      {loading && <img src={imgLoading} alt="loading..." width="50%" /> }
      {(!error && !loading) &&
        <>
          <Toolbar className="spaceElements">
            <div className="flex">
              <Button data-testid="userDetail-btn-removeUser" onClick={() => {
                setShowDeleteModal(true);
              }}>
                {t('userDetail.removeUser')}
              </Button>
              {
                loadingDeleted &&
                <div className="tooltip centerSelf">
                  <FontAwesomeIcon icon={faSpinner} className="icon" spin />
                  <span className="tooltiptext">{t('userDetail.loading')}</span>
                </div>
              }
              {
                errorDeleted &&
                <div className="tooltip centerSelf">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
                  <span className="tooltiptext">{t('userDetail.errorDeleted')}</span>
                </div>
              }
              <Button disabled={!dataModif} onClick={() => {
                dispatch(updateDataStart(idUser, { first_name, last_name, email }, user.token));
              }}>
                {t('userDetail.updateData')}
              </Button>

              {
                errorUpdated &&
                <div className="tooltip centerSelf">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
                  <span className="tooltiptext">{t('userDetail.errorUpdate')}</span>
                </div>
              }
              {
                loadingUpdate &&
                <div className="tooltip centerSelf">
                  <FontAwesomeIcon icon={faSpinner} className="icon" spin />
                  <span className="tooltiptext">{t('userDetail.loading')}</span>
                </div>
              }
            </div>
            <div>
              <span className="smallText">{`${t('userDetail.refreshText1')} ${timeData} ${t('userDetail.refreshText2')}`}</span>
              <Button onClick={() => { dispatch(getUserDetailStart(idUser, user.token)); setTimeData(0); }}><FontAwesomeIcon icon={faRedo} className="icon" /> {t('userDetail.refresh')}</Button>
            </div>
          </Toolbar>
          <div className="flex fullwidth marginTopStandard paddingLeftSmall">
            <img alt="user profile" src={data && data.avatar} />
            <div className="fullwidth paddingLeftSmall paddingRightSmall">
              <InputField
                label={t('userDetail.firstName')}
                type="text"
                value={nameModif}
                onChange={(inputElem) => {
                  const { value } = inputElem.target;
                  setUserInfo({ ...userInfo, firstName: value });
                }}
                iconsField={
                  nameModif !== first_name &&
                  <>
                    <div className="tooltip" data-testid="userDetail-icon-warningName">
                      <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                      <span className="tooltiptext">{first_name}</span>
                    </div>
                    <div className="tooltip" data-testid="userDetail-icon-warningName">
                      <FontAwesomeIcon data-testid="userDetail-icon-name-undo" icon={faUndo} className="icon" onClick={() => {
                        setUserInfo({ ...userInfo, firstName: first_name });
                      }} />
                      <span className="tooltiptext">{t('userDetail.undo')}</span>
                    </div>
                  </>
                }
              />
              <InputField
                label={t('userDetail.lastName')}
                type="text"
                value={lastNameModif}
                onChange={(inputElem) => {
                  const { value } = inputElem.target;
                  setUserInfo({ ...userInfo, lastName: value });
                }}
                iconsField={
                  lastNameModif !== last_name &&
                  <>
                    <div className="tooltip" data-testid="userDetail-icon-warningLastName">
                      <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                      <span className="tooltiptext">{last_name}</span>
                    </div>
                    <div className="tooltip" data-testid="userDetail-icon-warningLastName">
                      <FontAwesomeIcon icon={faUndo} className="icon" data-testid="userDetail-icon-lastName-undo" onClick={() => {
                        setUserInfo({ ...userInfo, lastName: last_name });
                      }} />
                      <span className="tooltiptext">{t('userDetail.undo')}</span>
                    </div>
                  </>
                }
              />
              <InputField
                label={t('userDetail.email')}
                type="text"
                value={emailModif}
                onChange={(inputElem) => {
                  const { value } = inputElem.target;
                  setUserInfo({ ...userInfo, email: value });
                }}
                iconsField={
                  emailModif !== email &&
                  <>
                    <div className="tooltip" data-testid="userDetail-icon-warningEmail">
                      <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                      <span className="tooltiptext">{email}</span>
                    </div>
                    <div className="tooltip" data-testid="userDetail-icon-warningEmail">
                      <FontAwesomeIcon icon={faUndo} className="icon" data-testid="userDetail-icon-email-undo" onClick={() => {
                        setUserInfo({ ...userInfo, email });
                      }} />
                      <span className="tooltiptext">{t('userDetail.undo')}</span>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        </>}
    </div>
  );
};

UserDetail.propTypes = {
  t: func.isRequired,
  match: instanceOf(Object).isRequired,
  history: instanceOf(Object).isRequired,
};

export default withTranslation()(UserDetail);
