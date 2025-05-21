import { useState } from "react";
import { Titulo, BotaoClicado, CaixaTexto } from "../../Componentes/ComponentesIcones";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import Header from "../../Componentes/Header"
import Footer from "../../Componentes/Footer"
import { Link } from "react-router-dom";
import "./login.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setErro(null);  // Resetando o erro

  // Verifique se os campos email e senha não estão vazios
  if (!email || !senha) {
    setErro("Por favor, preencha todos os campos.");
    return;
  }

  //console.log("Tentando login com email:", email, "e senha:", senha); // Debug

  try {
    // Usando o método correto: signInWithPassword
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha, 
    });

    if (error) {
      console.error("Erro de login:", error);  // Logando o erro no console para debug
      setErro("Credenciais inválidas.");  // Exibindo mensagem de erro para o usuário
      return;
    } 

    // Se o login for bem-sucedido, navegamos para o dashboard
    if (data?.user) {
      navigate("/dashboard");
    } else {
      setErro("Erro desconhecido. Tente novamente.");
    }
  } catch (err) {
    console.error("Erro inesperado:", err);  // Logando qualquer erro inesperado
    setErro("Ocorreu um erro. Tente novamente mais tarde.");
  }
};

  return (
  <div className="login-page">
    <Header />
    <div className="login-container">
      <Titulo text="Bem Vindo(a)!" />
      <p className="paragrafo">O gerenciador de tarefas mais simplificado e eficiente para seu dia!</p>
      <form onSubmit={handleLogin} className="login-form">
        {erro && <p className="erro">{erro}</p>}
        <div>
          <label>E-mail</label>
          <CaixaTexto
            type="email"
            value={email}
            text="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Senha</label>
          <CaixaTexto
            type={mostrarSenha ? "text" : "password"}
            id="password"
            value={senha}
            text="Digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <div className="mostrar-senha">
            <input
              type="checkbox"
              id="mostrarSenha"
              checked={mostrarSenha}
              onChange={(e) => setMostrarSenha(!mostrarSenha)}
            />
            <label htmlFor="mostrarSenha">Exibir Senha</label>
          </div>
        </div>

        <BotaoClicado type="submit">Entrar</BotaoClicado>
      </form>

      <div className="cadastro">
        <Titulo text="Sua primeira vez por aqui?" />
        <Link to="/cadastro" className="sublinhado">
          <BotaoClicado>Cadastre-se agora</BotaoClicado>
        </Link>
      </div>
    </div>

    <Footer />
  </div>
);
}
