import styles from "../Layout/NewProject.module.css"
import ProjectForm from "../project/ProjectForm"
import {  useNavigate } from "react-router-dom"

function NewProject(){

    var navigate = useNavigate()
    const state = {message: "Projeto criado com sucesso!"}
    const baseURL = "https://backend-finance-ftzg.onrender.com"

    function CriarProjeto(project) {
        // Inicializar custo e serviço
        project.cost = 0;
        project.services = [];
    
        fetch(`${baseURL}/projects`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project), // Não inclui o ID
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                navigate("/projetos",{state})  
            })
            .catch((err) => console.log(err));
    }
    return(
        <div className={styles.meio}>
            <div className={styles.conteudo}>

                <div className={styles.title}>
                    <h1>Criar Projecto</h1>
                    <p>Crie seu projecto para depois adicionar os serviços.</p>
                </div>
                    <ProjectForm handleSubmit={CriarProjeto}/>       
            </div>
        </div>
    )
}

export default NewProject