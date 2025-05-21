import MenuLateral from "../../Componentes/MenuLateral";
import TopBar from "../../Componentes/Menu";
import Header from "../../Componentes/Header";
import Footer from "../../Componentes/Footer";
import "./dashboard.css";

export default function Dashboard({ children }) {
  return (
    <div className="dashboard">
      <Header />
      <div className="menu-lateral">
        <MenuLateral />
      </div>
      <div className="main-panel">
        <TopBar />
        <div className="conteudo">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
