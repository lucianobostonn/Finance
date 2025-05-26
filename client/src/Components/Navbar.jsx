import { Link } from "react-router-dom"
import styles from "./Layout/Navbar.module.css"
import logo from "../img/sack-of-money-on-transparent-background-free-png.webp"
import { IoIosMenu, IoMdClose } from "react-icons/io"
import { useState } from "react"


function Navbar(){
   const [menuVisible, setMenuVisible] = useState(false);

   function ClickMenu(){
      setMenuVisible(!menuVisible)
   }

 return(
    <header className={styles.topo}>
       <Link to="/"><img src={logo} alt="money" /></Link>
        <div className={styles.nav}>
         <div className={styles.menuList}>
            {menuVisible=== false ? <IoIosMenu className={styles.menu} onClick={ClickMenu}/> : <abbr title="Fechar">
               <IoMdClose className={styles.fechar} onClick={ClickMenu}/>
            </abbr>}
            
         </div>
           <ul className={menuVisible ? styles.menuVisible: ""}>
            <li><Link to="/" className={`${styles.item} ${menuVisible ? styles.itemVisible : ""}`}>Home</Link></li>
            <li><Link to="/projetos" className={`${styles.item} ${menuVisible ? styles.itemVisible : ""}`}>Projetos</Link></li>
            <li><Link to="/empresa" className={`${styles.item} ${menuVisible ? styles.itemVisible : ""}`}>Empresa</Link></li>
            <li><Link to="/contato" className={`${styles.item} ${menuVisible ? styles.itemVisible : ""}`}>Contato</Link></li>
           </ul>
        </div>
    </header>
 )
}

export default Navbar