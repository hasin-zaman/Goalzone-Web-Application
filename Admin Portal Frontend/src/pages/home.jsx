import { Paper } from '@mui/material';
import Drawer from '../components/drawer';
import Header from '../components/Header';

export default function Home(){

    return(
        <div style={{display: 'flex'}}>
            <Drawer />
            <div style={{width: '85%'}}>
                <Header title='Home'></Header>
                <div>
                    <Paper elevation={5} style={{width: '50%', height: '250px', backgroundColor: "rgba(132, 136, 132, 0.3)", display: "flex", flexDirection: 'column',justifyContent: 'center', alignItems: 'center', margin: '130px auto 0 auto'}}>
                        <h1 style={{color: 'whitesmoke'}}>Welcome back Admin!</h1>
                        <h2 style={{color: 'rgba(255,255,255,0.6)'}}>Here are the new updates!</h2>
                    </Paper>
                </div>
            </div>
        </div>
    )
}