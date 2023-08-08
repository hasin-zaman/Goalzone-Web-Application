import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import formatDate from '../../../utils/formatDate';
import { Paper, Button } from '@mui/material';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/Header';

const Label = styled.label`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const Span = styled.span`
  color: ${(props) => props.color || 'white'};
  font-size: 20px;
`;

export default function Message() {
  const params = useParams();
  const [messageData, setMessageData] = useState(null);

  const getMessage = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/contact/${params.messageId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      setMessageData(res.data);
    } catch (error) {
      console.log(error.res.data.message);
    }
  };

  const updateStatusToRead = async () => {
    try {
      const res = await axios.patch(`http://localhost:3001/contact/status/read/${params.messageId}`, {}, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });

      console.log(res);
      setMessageData(res.data.updatedMessage);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatusToResponded = async () => {
    try {
      const res = await axios.patch(`http://localhost:3001/contact/status/responded/${params.messageId}`, {}, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });

      console.log(res);
      setMessageData(res.data.updatedMessage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    if(messageData && messageData.status==='Unread'){
      updateStatusToRead();
    }
  }, [messageData]);

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', padding: '20px' }}>
        <Header title="Message" />
        <div>
          <Paper
            elevation={5}
            style={{
              width: '60%',
              backgroundColor: 'rgba(132, 136, 132, 0.3)',
              margin: '70px auto',
              padding: '20px',
            }}
          >
            {messageData && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Received at: </Label>
                  <Span color='darkgrey'>{formatDate(messageData.createdAt)}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Status: </Label>
                  <Span color='darkgrey'>{messageData.status}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Name: </Label>
                  <Span>{messageData.name}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Email: </Label>
                  <Span>{messageData.email}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Message:</Label>
                  <p style={{ color: 'white', fontSize: '20px', whiteSpace: 'pre-wrap' }}>{messageData.message}</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                <Button variant='contained' color="success" onClick={()=>updateStatusToResponded()}>Responded</Button>
                </div>
              </>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
}
