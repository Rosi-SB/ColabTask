import React from "react";
import { Titulo } from "../../Componentes/ComponentesIcones";
import Header from "../../Componentes/Header";
import Footer from "../../Componentes/Footer";
import ro from "../../assets/ro.jpg"
import Nelita from "../../assets/Nelita.jpg"
import Simoni2 from "../../assets/Simoni2.jpg"
import "./sobreNos.css"; 

export default function SobreNos() {
    return (
        <div className="sobre-nos">
            <Header />
            <Titulo children="Quem Somos" />
            <div className="team-container">
                <div className="team-member">
                    <img src="imagem1.jpg" alt="Deusliane" className="team-image" />
                    <textarea className="team-info" readOnly>
                        Deusliane |
                        Polo: Paulo de Faria-SP |
                        Curso: Engenharia da Computação
                    </textarea>
                </div>
                <div className="team-member">
                    <img src={Nelita} alt="Nelita" className="team-image" />
                    <textarea className="team-info" readOnly>
                        Nelita |
                        Polo: Catanduva-SP |
                        Curso: Ciência de Dados
                    </textarea>
                </div>
                <div className="team-member">
                    <img src={ro} alt="Rosicleidi" className="team-image" />
                    <textarea className="team-info" readOnly>
                        Rosicleidi |
                        Polo: Palmares Paulista-SP |
                        Curso: Bacharelado em Tecnologia da Informação
                    </textarea>
                </div>
                <div className="team-member">
                    <img src={Simoni2} alt="Simoni" className="team-image" />
                    <textarea className="team-info" readOnly>
                        Simoni | 
                        Polo: Nova Granada-SP |
                        Curso: Bacharelado em Tecnologia da Informação
                    </textarea>
                </div>
            </div>
            <Footer />
        </div>
    );
}
