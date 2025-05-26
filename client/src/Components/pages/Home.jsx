import styles from "../Layout/Home.module.css"
import cofre from "../../img/ilustracao-cofre-de-porquinho.png"
import LinkButton from "../LinkButton"
function Home(){

    return(
        <div className={styles.meio}>
            <div className={styles.geral}>
                <div className={styles.conteudo}>
                    <h1>Bem-Vindo ao <strong>Boston Invest</strong></h1>
                    <p>Comece a gerenciar os seus projetos agora mesmo!</p>
                    <LinkButton to="/newproject" text="Criar Projeto"/>
                </div>

                <div className={styles.img}><img src={cofre} alt="Cofre" /></div>
            </div>
        </div>
    )
}

export default Home