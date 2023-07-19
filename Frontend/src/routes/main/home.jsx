import NavBar from '../../components/main/navbar';
import Footer from '../../components/main/footer';
import MainSectionTeams from '../../components/main/mainSectionTeams';
import MainSectionGrounds from '../../components/main/mainSectionGrounds';
import MainSectionAbout from '../../components/main/mainSectionAbout';

export default function Home(){
    return(
        <div style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
            <NavBar />
            <MainSectionAbout />
            <MainSectionGrounds />
            <div style={{height: "200px"}}/>
            <MainSectionTeams />
            <Footer />
        </div>
    )
}