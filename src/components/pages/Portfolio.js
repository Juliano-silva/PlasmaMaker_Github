import React from "react"
import style from './Style/Style.module.css'
import Eu from '../../Arquivo/Juliano.jpg'
export default function Portfolio(){
    return(
        <div className={style.box}>
            <br />
            <img src={Eu} alt="" className={style.EU}/>
            <h1>Juliano Silva de Almeida</h1>   
            <p>Estudante de tecnologia com foco em desenvolvimento de software, busco me inserir no mercado e desenvolver as habilidades necessárias pra me tornar melhor</p>
    </div>
    )
}