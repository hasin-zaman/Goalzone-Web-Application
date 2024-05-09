import styled from 'styled-components';
import { Paper } from '@mui/material';
import Drawer from '../../components/admin/drawer';
import Header from '../../components/admin/header';

const Page = styled.div`
  width: 100%;
  padding: 50px 0;
`;

export default function Home(){

    return(
        <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
            <Drawer />
            <div style={{ width: '85%', minHeight: '100vh'}}>
                <Header title="Home" />
                <div>
                    <Page>
                        <Paper elevation={5} style={{width: '50%', height: '250px', backgroundColor: "rgba(132, 136, 132, 0.2)", display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '70px auto 0 auto'}}>
                            <h1 style={{color: 'whitesmoke'}}>Welcome back Admin!</h1>
                            <h2 style={{color: 'rgba(194, 185, 189, 0.7)'}}>Here are the new updates!</h2>
                        </Paper>
                    </Page>
                </div>
            </div>
        </div>
    )
}