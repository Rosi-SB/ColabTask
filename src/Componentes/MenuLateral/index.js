import "./MenuLateral.css";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BotaoClicado } from "../ComponentesIcones";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";

export default function MenuLateral() {
  const navigate = useNavigate();

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
    <div className="sidebar">
      <h2>COLAB TASK</h2>
      <ul>
        <li><Link to="/MeuCadastro"><FontAwesomeIcon icon={faUserShield} /> Perfil</Link></li>
      </ul>
      <BotaoClicado onClick={handleLogout} aria-label="Logout"><FontAwesomeIcon icon={faPowerOff} /> Sair</BotaoClicado>
    </div>
  );
}
