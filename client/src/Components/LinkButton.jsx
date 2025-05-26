import { Link } from "react-router-dom"
import styles from "./Layout/LinkButton.module.css"

function LinkButton({to, text}){

    return(
        <div>
            <Link to={to} className={styles.button}>{text}</Link>
        </div>
    )
}

export default LinkButton