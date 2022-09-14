import style from '../pages/Style/Style.module.css'
import React from "react"
import { Link } from "react-router-dom"
export default function Header(){
    return(
        <div className={style.Header}>
        <Link to="/"><h1>Plasma Maker</h1></Link>
            <div className={style.Links}>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/Portfolio">Portfolio</Link>
            </div>
        </div>
    )
}