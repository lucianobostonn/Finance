import styles from "../Layout/Projetos.module.css"
import { FaCircle, FaFacebook, FaPen, FaTrash } from "react-icons/fa"
import LinkButton from "../LinkButton"
import { Link, useLocation } from "react-router-dom"
import Message from "./Message"
import { useEffect, useState } from "react"

function Projetos(){
    const [projects, setProjects] = useState([])
    const[exibirMensagem, setExibirMensagem] = useState("")
    const baseURL = "https://backend-finance-ftzg.onrender.com"
    
    const Location = useLocation()
    var message = ""
    
    if(Location.state){
        message = Location.state.message
    }

    useEffect(()=>{

        fetch(`${baseURL}/projects`, {
            method: "GET",
            headers: {
                "Content.Type": "application/json",
            },
        }).then((resp)=> resp.json())
        .then((data)=> {
            console.log(data)
            setProjects(data)
        })
        .catch((err)=> console.log(err))
    },[])


    function RemoverProjeto(id){
            fetch(`${baseURL}/projects/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((resp)=> resp.json())
            .then(() => {
                setProjects(projects.filter((project)=> project.id !== id))
                setExibirMensagem("Projeto Eliminado com sucesso!")

            })
            .catch((err)=> console.log(err))

    }

    
    
    return(
        <div className={styles.meio}>
    
            <div className={styles.conteudo}>

                <div className={styles.title}>
                    <h1>Meus Projectos</h1>
                    <LinkButton to="/newproject" text="Criar Projeto"/>
                </div>
                {message && <Message msg={message}  type="success"/>}
            {exibirMensagem && <Message msg={exibirMensagem}  type="success"/>}
                <div className={styles.projetos}>



                    {projects.length > 0 ?
                    (projects.map((item)=> 

                    <div key={item.id} className={styles.item}>

                        <div className={styles.name}>
                            {item.name}
                        </div>

                        <div className={styles.details}>
                        <p className={styles.orc}><strong>Orçamento:</strong> {item.orcamento}kz</p>
                        <p className={styles.categ}><FaCircle className={styles[item.categoria.name.toLowerCase()]}/> {item.categoria.name}</p>
                        <div className={styles.botoes}>

                        <Link className={styles.edit} to={`/projetos/${item.id}`}> <FaPen/>Editar</Link>

                        <button className={styles.delete} onClick={() => RemoverProjeto(item.id)}><FaTrash/>Excluir</button>
                        </div>
                        </div>
                    </div>
                    )): (
                        <p>Não há projetos Cadastrados</p>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Projetos


// <div className={styles.details}>
//                         <p className={styles.orc}><strong>Orçamento:</strong> {item.orcamento}kz</p>
//                         <p className={styles.categ}><FaCircle className={styles[item.categoria.toLowerCase()]}/> {item.categoria}</p>

//                         <div className={styles.botoes}>

//                         <Link className={styles.edit} to={`/projetos/${item.id}`}> <FaPen/>Editar</Link>

//                         <button className={styles.delete}><FaTrash/>Excluir</button>
//                         </div>
                        
//                         </div>