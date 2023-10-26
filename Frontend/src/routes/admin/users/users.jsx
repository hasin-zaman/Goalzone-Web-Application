import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MUIPagination from '../../../components/global/muiPagination';
import MUITooltip from '../../../components/global/muiTooltip';
import AlertDialog from '../../../components/global/alertDialog';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/Header';

const Page = styled.div`
  width: 85%;
  padding: 50px 0;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  background-color: rgba(132, 136, 132, 0.2);
  border-collapse: collapse;
`;

const FirstRow = styled.tr`
  background-color: rgba(11, 171, 181);
`;

const Data = styled.td`
  color: rgba(194, 185, 189, 0.7);
  padding: 7px;
`;

const Row = styled.tr`
  &:hover {
    background-color: rgba(132, 136, 132, 0.5);
    cursor: pointer;
    ${Data} {
      color: whitesmoke;
    }
  }
`;

const Heading = styled.th`
  color: #121212;
  padding: 8px;
  border-right: 2px solid rgba(0,0,0,0.5);
`;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/users', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 3}});
      setUsers(res.data.users);
      setPages(res.data.totalPages);
      console.log(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const getUser = (user) => {
    navigate(`/admin/users/${user.userId}`);
  };

  const addUser = async () => {
    navigate(`/admin/users/add`);
  };

  const updateUser = (user) => {
    navigate(`/admin/users/update/${user.userId}`);
  };

  const deleteUser = async (user) => {
    try {
        const res=await axios.delete(`http://localhost:3000/admin/users/${user.userId}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
        console.log(res)
        
        setUsers(users.filter((oldUser) => oldUser.userId !== user.userId));
        setDeleteDialogOpen(false);
    } catch (error) {
        console.log(error)
    }
  };

  const changePage=async (e, page) => {
    if(page!=currentPage){
        setCurrentPage(page);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', minHeight: '100vh' }}>
        <Header title="Users" toolTip="Add user." onClick={() => addUser()} />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                  <Heading>Id</Heading>
                  <Heading>First Name</Heading>
                  <Heading>Last Name</Heading>
                  <Heading>Age</Heading>
                  <Heading>Gender</Heading>
                  <Heading>Phone</Heading>
                  <Heading>Email</Heading>
                  <Heading>Role</Heading>
                  <Heading></Heading>
                  <Heading></Heading>
                </FirstRow>
              </tbody>
              {users.length > 0 &&
                users.map((user) => (
                  <tbody key={user.userId}>
                    <Row>
                      <Data onClick={() => getUser(user)}>{user.userId}</Data>
                      <Data onClick={() => getUser(user)}>{user.firstName}</Data>
                      <Data onClick={() => getUser(user)}>{user.lastName}</Data>
                      <Data onClick={() => getUser(user)}>{user.age}</Data>
                      <Data onClick={() => getUser(user)}>{user.gender}</Data>
                      <Data onClick={() => getUser(user)}>{user.phone}</Data>
                      <Data onClick={() => getUser(user)}>{user.email}</Data>
                      <Data onClick={() => getUser(user)}>{user.role}</Data>
                      <Data>
                        <MUITooltip
                          icon="edit"
                          color="primary"
                          title="Edit user."
                          onClick={() => updateUser(user)}
                        />
                      </Data>
                      <Data>
                        <MUITooltip
                          icon="delete"
                          color="error"
                          title="Delete user."
                          onClick={() => handleOpenDeleteDialog(user)}
                        />
                      </Data>
                    </Row>
                  </tbody>
                ))}
            </StyledTable>
            <MUIPagination count={pages} changePage={changePage} />
          </Page>
        </div>
      </div>
      <AlertDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onClick={() => deleteUser(selectedUser)}
        color="error"
        title="Delete User"
        text="Are you sure you want to delete this user?"
        button1="Cancel"
        button2="Delete"
      />
    </div>
  );
}
