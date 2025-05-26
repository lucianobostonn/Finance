import { useState } from "react"
import styles from "../Layout/Ad_Service.module.css"

function Ad_Service({handleSubmit, projectData}){
    const[service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        if (!service.name || !service.cost || !service.description) {
            window.alert("Preencha todos os campos do serviço.");
            return;
        }
    
        projectData.services.push(service);
        handleSubmit(projectData);

    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }
    
        

    

    return(
        <form onSubmit={submit}>
            <p><label htmlFor="inome"><strong>Nome do serviço:</strong></label></p>
            <input type="text" name="name" id="inome" placeholder="Insira o nome do serviço" onChange={handleChange}/>

            <p><label htmlFor="icusto"><strong>Custo do serviço:</strong></label></p>
            <input type="number" name="cost" id="icusto" placeholder="Insira o custo do serivço" onChange={handleChange}/>

            <p><label htmlFor="idescription"><strong>Descrição do Serviço:</strong></label></p>
            <input type="text" name="description" id="idescription" placeholder="Adicione uma descrição ao serviço" onChange={handleChange}/>

            <input type="submit" value="Adicionar Serivço" className={styles.button}/>
        </form>
    )
}

export default Ad_Service