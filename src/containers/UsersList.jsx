// Basic imports
import React, { useEffect } from 'react';
import { any, func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

// Components
import Toolbar from '../components/common/Toolbar';
import Table from '../components/Table';

// Actions
import { getUsersListStart } from '../store/actions/usersList';

const ImgPhoto = styled.img`
  border-radius: 30px;
`;

const UsersList = ({ t, history }) => {
  const dispatch = useDispatch();
  const { usersList } = useSelector((state) => state);
  const { data, page, totalElements, totalPages } = usersList;

  useEffect(() => {
    dispatch(getUsersListStart(1));
  }, []);

  const listColumns = [
    {
      id: 'avatar',
      text: t('table.columns.photo'),
      renderer: (value) => <ImgPhoto width="50px" src={value} />,
      width: '50px',
    },
    {
      id: 'first_name',
      text: t('table.columns.name'),
      width: '20px',
    },
    {
      id: 'last_name',
      text: t('table.columns.surname'),
    },
  ];

  return (
    <>
      <Toolbar>
        <span className="paddingLeftSmall">{`${t('search-results')} | ${totalElements}`}</span>
      </Toolbar>
      {data
        && (
        <Table
          listColumns={listColumns}
          data={data}
          paginationInfo={{
            page,
            totalElements,
            totalPages,
          }}
          onRowSelected={(element) => {
            history.push(`/detailUser/${element.id}`);
          }}
          updateData={(newPage) => {
            dispatch(getUsersListStart(newPage));
          }}
        />
        )}
    </>
  );
};

UsersList.propTypes = {
  history: any.isRequired,
  t: func.isRequired,
};

export default withTranslation()(UsersList);
