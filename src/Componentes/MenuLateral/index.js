import React, { useState } from "react";
import "./MenuLateral.css";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BotaoClicado } from "../ComponentesIcones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUserShield, faBars } from "@fortawesome/free-solid-svg-icons"; // Ícone do hambúrguer

export default function MenuLateral() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a abertura da sidebar

  // Função para alternar a sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Alterna entre aberto e fechado
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/"); // Após deslogar, redireciona para a página de login
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      alert("Erro ao realizar logout. Tente novamente.");
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Botão de alternância (hambúrguer) */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} /> {/* Ícone de hambúrguer */}
      </button>

      <h2>COLAB TASK</h2>
      <ul>
        <li>
          <Link to="/MeuCadastro" className="sublinhado">
            <FontAwesomeIcon icon={faUserShield} /> Perfil
          </Link>
        </li>
      </ul>
      <BotaoClicado onClick={handleLogout} aria-label="Logout">
        <FontAwesomeIcon icon={faPowerOff} /> Sair
      </BotaoClicado>
    </div>
  );
}

