import { v4 as uuidv4 } from 'uuid';
import { data, useParams } from "react-router-dom"
import styles from "../Layout/Edit.module.css"
import { useEffect, useState } from "react";
import Ad_Service from "../pages/Ad_Service"
import Message from "./Message";
import { FaTrash } from "react-icons/fa";
import Loading from "./Loading"
import ProjectForm from "../project/ProjectForm";

function Edit(){
    const {id} = useParams()
    const [projeto, setProjeto] = useState([])
    const [services, setServices] = useState([])
    const baseURL = "https://backend-finance-ftzg.onrender.com"

    
    useEffect(()=>{
        setTimeout(()=>{
            fetch(`${baseURL}/projects/${id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then((resp)=> resp.json())
            .then((data) => {
                setProjeto(data)
                setServices(data.services)
            })
            .catch((err)=> console.log(err))
        }, 500)
        
    }, [id])
          
    const[ad_service, setAd_service] = useState(false)
    const[projetoForm, setProjetoForm] = useState(false)
    const[categories, setCategories] = useState([])

    const[message, setMessage] = useState()
    const[type, setType] = useState()
    
    useEffect(()=>{
        fetch(`${baseURL}/categories`, {
            method: "GET",
            headers: {
                'Content.Type': 'application/json'
            }
        }).then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch(err => console.log(err))
    
    }, [])


    function ShowEditarProjeto(){
        setProjetoForm(!projetoForm)
    }

    function ShowAdicionarServico(){
        setAd_service(!ad_service)
    }

    function EditarProjeto(project){
        setMessage("")
        if(project.orcamento < project.cost){
            setMessage("O Orçamento do projeto não pode ser inferioe ao custo dos serviços")
            setType("error")
            return false
        }

        fetch(`${baseURL}/projects/${projeto.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setProjeto(data)
            setMessage("Projeto Atualizado com sucesso!")
            setType("success")
            setProjetoForm(false)
        })
        .catch((err)=> console.log(err))
    }

    
    function CriarServico(project) {
        setMessage("")
        const lastService = project.services[project.services.length - 1]
    
        lastService.id = uuidv4()
    
        const lastServiceCost = lastService.cost  

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
    

        if (newCost > parseFloat(project.orcamento)) {
            setMessage("Orçamento ultrapassado, verifique o valor do custo do Serviço")
            setType("error")
            project.services.pop()
            setAd_service(false)
            return false;
        }


        project.cost = newCost;  

        fetch(`${baseURL}/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp)=> resp.json())
        .then((data) => {
            setAd_service(false)
        })
        .catch((err)=> console.log(err))
    }

    function RemoverServico(id, cost) {
        setMessage("")
        const servicesUpdate = projeto.services.filter((service) => service.id !== id)

        const projectUpdated = projeto

        projectUpdated.services = servicesUpdate 
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`${baseURL}/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setProjeto(projectUpdated)
            setServices(servicesUpdate)
            setMessage("Serviço removido com sucesso")
            setType("success")
        })
        .catch((err)=> console.log(err))
    }


    return(

        <div className={styles.meio}>
            {projeto.name ? 
            
            <div className={styles.edicao}>
                {message && <Message type={type} msg={message}/>}

                <div className={styles.details}>
                    <div className={styles.topo}>
                        <h1>Projeto: {projeto.name}</h1>
                        <button className={styles.button} onClick={ShowEditarProjeto}>{!projetoForm ? "Editar Projeto" : "Fechar"}</button>
                    </div>
                    {!projetoForm ? (
                        <div className={styles.lastP}>
                        <p><strong>Categoria:</strong> {projeto.categoria.name}</p>
                        <p><strong>Total do Orçamento:</strong> {projeto.orcamento}kz</p>
                        <p><strong>Total utilizado: </strong> {projeto.cost}kz</p>
                    </div>
                    ) : 
                    (
                        <ProjectForm handleSubmit={EditarProjeto} projectData={projeto}/>
                    )}
                    
                </div>

                <div className={styles.ad_service}>
                    {!ad_service ? (
                        <div className={styles.one}>
                            <h1>Adicionar Serviço:</h1>
                            <button className={styles.button} onClick={ShowAdicionarServico}>Adicionar Serviço</button>
                        </div>
                    ): 
                    (
                        <div className={styles.form}>
                            <div className={styles.one}>
                                <h1>Adicione o Serviço:</h1>
                                <button className={styles.button} onClick={ShowAdicionarServico}>Fechar</button>
                            </div>
                            <Ad_Service handleSubmit={CriarServico} projectData={projeto}/>
                        </div>
                    )
                    
                    
                    }
                    
                </div>

                <div className={styles.service}>
                    <h1>Serviços:</h1>
                     {services.length > 0 && ( <div className={styles.container}>
                        {services.map((item)=> (
                            <div key={item.id} className={styles.item}>
                            <div className={styles.name}>{item.name}</div>
                                <div className={styles.custo}>
                                    <p>Custo: {item.cost}kz</p>
                                </div>
                            <div className={styles.description}>
                                <h2>Descrição:</h2>
                                <p>{item.description}</p>
                            </div>
                            <button className={styles.delete} onClick={()=> RemoverServico(item.id, item.cost)}><FaTrash/>Excluir</button>
                        </div>
                        ))}
                    </div>
                           ) }

                        {services.length === 0 && <p>Não há serviços cadastrados</p>}
                        
                    
                </div>

            </div> : <Loading/>
        }
        </div>
    )
}

export default Edit