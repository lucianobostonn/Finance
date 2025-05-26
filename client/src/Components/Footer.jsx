import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import styles from "./Layout/Footer.module.css"

function Footer(){
    return(
       <footer className={styles.baixo}>
         <div className={styles.icones}>
            <a href="https://www.facebook.com/felipeneto" className={styles.link} target="blank"><FaFacebook/></a>
            <a href="https://www.instagram.com/lucianobostonn/" className={styles.link} target="blank"><FaInstagram/></a>
            <a href="https://www.youtube.com/@Zorogames7" className={styles.link} target="blank"><FaYoutube/></a>
         </div>
         <p><strong>Boston</strong> Invest &copy; 2025</p>
       </footer>
    )
   }
   
   export default Footer