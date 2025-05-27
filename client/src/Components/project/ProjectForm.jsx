import styles from "../Layout/ProjectForm.module.css"
import { useEffect, useState } from "react"


function ProjectForm({handleSubmit, projectData}){
    const[categories, setCategories] = useState([])
    const[project, setProject] = useState(projectData || {})
    const baseURL = "https://backend-finance-ftzg.onrender.com"
    
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

    const submit = (e)=>{
        e.preventDefault()
        if (!project.name || !project.orcamento|| !project.categoria) {
            window.alert("Por favor, preencha todos os campos antes de criar o projeto!")
            return;
        }
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, categoria:{
                id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }
        })
    }

    return(
        <div className={styles.form}>
                    <form onSubmit={submit}>
                        <p><label htmlFor="iname">Nome do Projecto:</label></p>
                        <input type="text" name="name" id="iname" placeholder="Insira o nome do projecto"  onChange={handleChange}/>

                        <p><label htmlFor="iorcamento">Orçamento do Projecto:</label></p>
                        <input type="number" name="orcamento" id="iorcamento" placeholder="Insira o orçamento total"  onChange={handleChange}/>

                        <label htmlFor="icategorias">
                            <p>Selecione a Categoria:</p>
                        </label>
                        
                        <select name="categorias" id="icategorias" className={styles.select} onChange={handleCategory}>
                            <option value="" disabled selected>Selecione uma categoria</option>
                           {categories.map((option)=> (
                            <option value={option.id} key={option.id}>{option.name}</option>
                           ))}
                        </select>

                        <input className={styles.button} type="submit" value="Criar Projecto" />
                    </form>
                
                    </div>
    )
}

export default ProjectForm