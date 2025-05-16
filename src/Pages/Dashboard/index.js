import MenuLateral from "../../Componentes/MenuLateral";
import TopBar from "../../Componentes/Menu";
import "./dashboard.css";

export default function Dashboard({ children }) {
  return (
    <div className="dashboard">
      <MenuLateral />
      <div className="main-panel">
        <TopBar />
        <div className="conteudo">{children}</div>
      </div>
    </div>
  );
}
