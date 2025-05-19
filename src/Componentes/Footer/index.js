import React from "react";
import { Link } from "react-router-dom";
import "./footer.css"; // Importe o arquivo CSS
import { BotaoClicado } from "../ComponentesIcones";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="contact-info">
        <p>Projeto Integrador em Computação III - PJI310 - Turma 001</p>
        <small>DRP11-PJI310-SALA-001GRUPO-006</small>
      </div>


      <div className="social-icons">        
        <Link
          to="/SobreNos"
          target="_blank"
          children="Visite nossa biografia"
          aria-label="Sobre nós"
        >
         <FontAwesomeIcon icon={faAddressCard} size="3x" /> Sobre Nós
        </Link>
        <a
          href="https://github.com/Rosi-SB/ColabTask"
          target="_blank"
          rel="noopener noreferrer"
          title="Visite o repositório no GitHub"
          aria-label="Repositório GitHub Rosi-SB"
        >
          <FontAwesomeIcon icon={faGithub} size="3x" /> GitHub
        </a>
        <a
          href="mailto:proj.int.univesp@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Dúvidas? Entre em contato conosco"
          aria-label="Caixa de Mensagem"
        >
          <FontAwesomeIcon icon={faEnvelope} size="3x" /> Caixa de Mensagem
        </a>
      </div>

      <div className="copyright">
        <p>
          &copy;{new Date().getFullYear()} ColabTask. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
