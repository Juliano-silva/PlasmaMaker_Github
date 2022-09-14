import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import {useParams,useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
import style from './Style/Style.module.css'
function ProjectCard({ id, name,Texto,Image,fontColor,Width,Height,BorderColor}) {
  return (
    <div className={style.MakerBoxBody} style={{color:`${fontColor}`}}>
    <Link to={'/project/' + id}>
    <div className={style.MakerBox}>
      <h2>{id}.{name}</h2>
      <div className={style.ParteMakerNone}>
      <img src={Image} style={{width:`${Width}px`,height:`${Height}px`,border:`1px solid ${BorderColor}`}}/>
      <p>{Texto}</p>
      </div>
    </div>
    </Link>
    </div>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])

  const location = useLocation()

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


  return (
    <div>
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
            id={project.id}
            name={project.name}
            cor={project.cor}
            key={project.id}
            fontColor={project.fontColor}
            BorderColor={project.BorderColor}
            Texto={project.Texto}
            Texto1={project.Texto1}
            Texto2={project.Texto2}
            Image={project.Image}
            Image2={project.Image2}
            Width={project.Width}
            Height={project.Height}
            TextoStyle={project.TextoStyle}
            SubTitulo={project.SubTitulo}
            Footer={project.Footer}
            Header={project.Header}
            Href={project.Href}
            />
          ))}
      </Container>
    </div>
  )
}
function Project() {
  let { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
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
    // budget validation
    if (project.budget < project.cost) {
      setType('error')
      return false
    }

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
  return (
    <>
    {project.name ? (
      <div className={style.ApiCorpo} 
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
          </div>
            <div>
            </div>
        </Container>
        <div>
          <h1 className={style.FooterMaker} style={{color:`${project.fontColor}`}}>{project.Footer}</h1>
        </div>
      </div>
    ) : (
      <div>
        
      </div>
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
function Maker() {
  return (
    <Router>
         <Link to="/Sites" className={style.Pojetos}>MEUS PROJETOS</Link>
      <Switch>
        <Container customClass="min-height">
          <Route path="/Sites">
            <Projects />
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