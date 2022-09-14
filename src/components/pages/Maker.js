import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import {useHistory,useParams,useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BsFillTrashFill  } from 'react-icons/bs'
import style from './Style/Style.module.css'
function ProjectCard({ id, name, handleRemove }) {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
  }
  return (
    <div className={style.CorpoMakerPlasma}>
      <h4>{name}</h4>
      <div>
        <Link to={'/project/' + id} className={style.Editar}>
          Editar
        </Link>
        <br />
        <button onClick={remove} className={style.Remover}>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  )
}

function LinkButton({ to, text }) {
  return (
    <Link  to={to}>
      {text}
    </Link>
  )
}
function Projects() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    setTimeout(
      () =>
        fetch('http://localhost:5000/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjects(data)
          }),
      100,
    )
  }, [])

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id))
      })
  }

  return (
    <div>
      <div className={style.MProjetos}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              cor={project.cor}
              key={project.id}
              fontColor={project.fontColor}
              Texto={project.Texto}
              Texto1={project.Texto1}
              Texto2={project.Texto2}
              Image={project.Image}
              Image2={project.Image2}
              Width={project.Width}
              Height={project.Height}
              SubTitulo={project.SubTitulo}
              TextoStyle={project.TextoStyle}
              Footer={project.Footer}
              Header={project.Header}
              Href={project.Href}
              BorderColor={project.BorderColor}
              handleRemove={removeProject}
            />
          ))}
      </Container>
    </div>
  )
}

function SubmitButton({ text }) {
  return (
    <div>
      <button className={style.CP}>{text}</button>
      <br />
    </div>
  )
}
function InputColor({id, text, name, handleOnChange, value,max}){
  return (
    <div className={style.InputColor}>
      <label htmlFor={name}>{text}</label>
      <br />
      <input
        type="color"
        name={name}
        id={id}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  )
}
function Input({ type,id, text, name, placeholder, handleOnChange, value,max }) {
  return (
    <div className={style.InputMaker}>
      <label htmlFor={name}>{text}</label>
      <br />
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        maxLength={max}
      />
    </div>
  )
}
function Textarea({ type,id, text, name, placeholder, handleOnChange, value }){
  return (
    <div className={style.TextareaMaker}>
      <label htmlFor={name}>{text}</label>
      <br />
      <textarea
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  )
}
function Project() {
  let { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [services, setServices] = useState([])
  const [setType] = useState('success')

  useEffect(() => {
    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setServices(data.services)
          }),
      0,
    )
  }, [id])

  function editPost(project) {

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(!showProjectForm)
        setType('success')
      })
  }



  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

// Aqui é onde eu tenho que mexer
  return (
    <>
      {project.name ? (
        <div className={style.ApiCorpoMaker} 
          style={{background:`${project.Cor}`,color:`${project.fontColor}`}}>
         <div className={style.HeaderMaker} style={{color:`${project.fontColor}`}}>
          <h1>{project.Header}</h1>
        </div>
          <Container customClass="column">
            <div className={style.CorpoMaker} style={{textAlign:`${project.TextoStyle}`}}>
            <h1>{project.name}</h1>
            <h2>{project.SubTitulo}</h2>
            <p>{project.Texto}</p>
            <img src={project.Image} style={{width:`${project.Width}px`,height:`${project.Height}px`,border:`1px solid ${project.BorderColor}`}}/>
            <p>{project.Texto1}</p>
            <img src={project.Image2} style={{width:`${project.Width}px`,height:`${project.Height}px,`,border:`1px solid ${project.BorderColor}`}}/>
            <p>{project.Texto2}</p>
            <br />
            <a href={project.Href} target="_blank">{project.Href}</a>
            <br />
              <button className={style.CP} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div>
                </div>
              ) : (
                <div>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
              <div>
              <h1 className={style.FooterMaker} style={{color:`${project.fontColor}`}}>{project.Footer}</h1>
              </div>
          </Container>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

function Container(props) {
  return (
    <div>
      {props.children}
    </div>
  )
}
function ProjectForm({ handleSubmit, btnText, projectData }) {

  const [project, setProject] = useState(projectData || {})

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={submit} className={style.FormRe}>
      <h1>Requeridas</h1>
      <Input type="text" text="Titulo do projeto" name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name} required/>
      <InputColor text="Background do Site" name="Cor" handleOnChange={handleChange} value={project.cor} required/>
      <InputColor text="Cor da fonte do Site" name="fontColor" handleOnChange={handleChange} value={project.fontColor} required/>
      <Textarea type="text" text="Texto" name="Texto" placeholder="Insira o Texto" handleOnChange={handleChange} value={project.Texto} required/>
      <h1>Não Requeridas</h1>
      <InputColor text="Cor da Borda do Site" name="BorderColor"  handleOnChange={handleChange} value={project.BorderColor} />
      <Input type="text" text="Estilo do texto" name="TextoStyle" placeholder="Insira o Estilo do texto" handleOnChange={handleChange} value={project.TextoStyle}/>
      <Textarea type="text" text="SegundoTexto" name="Texto1" placeholder="Insira o Segundo Texto" handleOnChange={handleChange} value={project.Texto1}/>
      <Textarea type="text" text="TerceiroTexto" name="Texto2" placeholder="Insira o Terceiro Texto" handleOnChange={handleChange} value={project.Texto2}/>
      <Input type="text" text="Imagem no site" name="Image" placeholder="Insira a Imagem" handleOnChange={handleChange} value={project.Image}/>
      <Input type="text" text="Segunda Imagem no site" name="Image2" placeholder="Insira a segunda Imagem" handleOnChange={handleChange} value={project.Image2}/>
      <Input type="number" text="Width do site" name="Width" placeholder="Insira o Width da imagem" handleOnChange={handleChange} value={project.Width}/>
      <Input type="number" text="Height do site" name="Height" placeholder="Insira o Height da imagem" handleOnChange={handleChange} value={project.Height}/>
      <Input type="text" text="Sub-titulo do site" name="SubTitulo" placeholder="Insira o Sub-titulo" handleOnChange={handleChange} value={project.SubTitulo}/>
      <Input type="text" text="Footer do site" name="Footer" placeholder="Insira o Footer" handleOnChange={handleChange} value={project.Footer}/>
      <Input type="text" text="Header do site" name="Header" placeholder="Insira o Header" handleOnChange={handleChange} value={project.Header}/>
      <Input type="text" text="Href do site" name="Href" placeholder="Insira o Href" handleOnChange={handleChange} value={project.Href}/>
      <SubmitButton text={btnText} />
    </form>
  )
}
function NewProject() {
  const history = useHistory()

  function createPost(project) {
    project.cost = 0

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then(() => {
        history.push('/projects', { message: 'Projeto criado com sucesso!' })
      })
  }

  return (
    <div>
      <ProjectForm  handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  )
}

function Maker() {
  return (
    <Router>
      <Switch>
        <Container customClass="min-height">
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/newproject">
            <NewProject />
          </Route>
          <Route path="/project/:id">
            <Project />
          </Route>
        </Container>
      </Switch>
    </Router>
  )
}
export default Maker