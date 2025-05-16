import "./MenuLateral.css";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BotaoClicado } from "../ComponentesIcones";



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
        <li><Link to="/meuCadastro">Perfil</Link></li>
      </ul>
      <BotaoClicado onClick={handleLogout} aria-label="Logout">Sair</BotaoClicado>
    </div>
  );
}
