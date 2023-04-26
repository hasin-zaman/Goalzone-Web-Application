import '../style/home.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import MainSectionTeams from '../components/mainSectionTeams';
import MainSectionGrounds from '../components/mainSectionGrounds';
import MainSectionAbout from '../components/mainSectionAbout';

export default function Home(){
    return(
        <div style={{backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
            <NavBar />
            <MainSectionAbout />
            <MainSectionGrounds />
            <div style={{height: "200px"}}/>
            <MainSectionTeams />
            <Footer />
        </div>
    )
}