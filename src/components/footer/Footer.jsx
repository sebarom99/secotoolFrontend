import logo from '../../assets/img/logo-white-desktop.png'
import '../footer/Footer.module.css'

function Footer() {
    /*aqui va todo referido al footer*/
    return(
        <>
        <footer className="spacing-grid">
            <img src={logo}/>
            <p style={{ margin: 0 }}>©2023 SecoTool</p>
        </footer>
        </>
    )
}
export default Footer;
