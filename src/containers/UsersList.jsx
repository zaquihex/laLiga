// Basic imports
import React, { useState, useEffect } from 'react';
import { any, func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

// Icon
import { faRedo, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import imgEmpty from 'assets/empty.png';
import imgLoading from 'assets/loading.gif';

// Components
import Toolbar from '../components/common/Toolbar';
import Table from '../components/Table';

// Actions
import { getUsersListStart } from '../store/actions/usersList';
import { Button } from '../components/common/Button';
import ErrorMsg from '../components/common/ErrorMsg';

const SpanSearchResults = styled.span`
  display: contents;
`;

const ImgPhoto = styled.img`
  border-radius: 30px;
`;

const UsersList = ({ t, history }) => {
  const dispatch = useDispatch();
  const [timeData, setTimeData] = useState(0);
  const { usersList, common } = useSelector((state) => state);
  const { user } = common;
  const { data, loading, error, page, totalElements, totalPages } = usersList;

  useEffect(() => {
    dispatch(getUsersListStart(1, user.token));
  }, []);

  // interval to increment data time
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeData(timeData + 1);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [timeData]);

  // clear interval after load data
  useEffect(() => {
    if (data) {
      setTimeData(0);
    }
  }, [data]);

  const listColumns = [
    {
      id: 'avatar',
      text: t('usersList.table.columns.photo'),
      renderer: (value) => <ImgPhoto width="50px" src={value} />,
      width: '50px',
    },
    {
      id: 'first_name',
      text: t('usersList.table.columns.name'),
      width: '20px',
    },
    {
      id: 'last_name',
      text: t('usersList.table.columns.surname'),
    },
  ];

  return (
    <div className={loading ? 'centerSelf' : ''}>
      {!loading &&
        <Toolbar className="spaceElements">
          <span className="paddingLeftStandard flex ">{totalElements && `${t('usersList.search-results')} | ${totalElements}`}</span>
          <div>
            <SpanSearchResults flex={1} className="smallText">{`${t('usersList.table.refreshText1')} ${timeData} ${t('usersList.table.refreshText2')}`}</SpanSearchResults>
            <Button onClick={() => {
              dispatch(getUsersListStart(page, user.token));
            }}>
              <FontAwesomeIcon icon={faRedo} className="icon" /> {t('usersList.table.refresh')}
            </Button>
          </div>
        </Toolbar>}
      {loading && <img src={imgLoading} alt="loading..." width="50%" /> }
      {!loading && error &&
        <ErrorMsg data-testid="usersList-errorMsg">
          <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
          <span className="paddingLeftSmall">Error has happened</span>
        </ErrorMsg>}
      {!loading && data &&
      data.length > 0 ? (
        <Table
          listColumns={listColumns}
          data={data}
          t={t}
          paginationInfo={{
            page,
            totalElements,
            totalPages,
          }}
          onRowSelected={(element) => {
            history.push(`/detailUser/${element.id}`);
          }}
          updateData={(newPage) => {
            dispatch(getUsersListStart(newPage, user.token));
          }}
        />
        ) : !loading && data && data.length === 0 ?
          <div className="centerSelf centerElements marginTopStandard" data-testid="usersList-emptyList">
            <img className="centerSelf" alt="emptyTable" src={imgEmpty} width={300} />
            <div>{t('noDataFound')}</div>
          </div> : null}
    </div>
  );
};

UsersList.propTypes = {
  history: any.isRequired,
  t: func.isRequired,
};

export default withTranslation()(UsersList);
