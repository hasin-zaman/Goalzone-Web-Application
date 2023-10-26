import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import formatDate from '../../../utils/formatDate';
import formatMessage from '../../../utils/formatMessage';
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
  background-color: ${(props) => props.status==='Unread' ? 'rgba(132, 136, 132, 0.4)' : 'rgba(132, 136, 132, 0.2)'};

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

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate=useNavigate();

  const getAllMessages = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/contact', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}});
      setMessages(res.data.messages);
      setPages(res.data.totalPages);
      console.log(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const getMessage = async (message) => {
    navigate(`/admin/messages/${message.messageId}`);
  };

  const deleteMessage = async (message) => {
    try {
        const res=await axios.delete(`http://localhost:3000/admin/contact/${message.messageId}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
        console.log(res)
        
        setMessages(messages.filter((oldMessage) => oldMessage.messageId !== message.messageId));
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
    getAllMessages();
  }, []);

  useEffect(() => {
    getAllMessages();
  }, [currentPage]);

  const handleOpenDeleteDialog = (message) => {
    setSelectedMessage(message);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', minHeight: '100vh' }}>
        <Header title="Messages" />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                  <Heading>Id</Heading>
                  <Heading>Name</Heading>
                  <Heading>Email</Heading>
                  <Heading>Message</Heading>
                  <Heading>Status</Heading>
                  <Heading>Created At</Heading>
                  <Heading></Heading>
                </FirstRow>
              </tbody>
              {messages.length > 0 &&
                messages.map((message) => (
                  <tbody key={message.messageId}>
                    <Row status={message.status}>
                      <Data onClick={() => getMessage(message)}>{message.messageId}</Data>
                      <Data onClick={() => getMessage(message)}>{message.name}</Data>
                      <Data onClick={() => getMessage(message)}>{message.email}</Data>
                      <Data onClick={() => getMessage(message)}>{formatMessage(message.message)}</Data>
                      <Data onClick={() => getMessage(message)}>{message.status}</Data>
                      <Data onClick={() => getMessage(message)}>{formatDate(message.createdAt)}</Data>
                      <Data>
                        <MUITooltip
                          icon="delete"
                          color="error"
                          title="Delete message."
                          onClick={() => handleOpenDeleteDialog(message)}
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
        onClick={() => deleteMessage(selectedMessage)}
        color="error"
        title="Delete Message"
        text="Are you sure you want to delete this message?"
        button1="Cancel"
        button2="Delete"
      />
    </div>
  );
}
