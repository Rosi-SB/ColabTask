import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Titulo, BotaoClicado, CaixaTexto } from "../../Componentes/ComponentesIcones";
import Header from "../../Componentes/Header"
import Footer from "../../Componentes/Footer"
import "./meuCadastro.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function MeuCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState(""); // O email será apenas para leitura
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  // Usando useEffect para pegar as informações do usuário logado
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser(); // Usando getUser() no lugar de user()

      if (user) {
        // Busca o nome do usuário na tabela 'usuarios' usando o iduser do supabase
        const { data, error } = await supabase
          .from("usuarios")
          .select("nome")
          .eq("iduser", user.id) // Compara o id do usuário com o id da tabela
          .single(); // Espera um único resultado

        if (error) {
          console.error("Erro ao buscar nome do usuário:", error.message);
          setErro("Erro ao carregar o nome do usuário.");
        } else {
          setNome(data?.nome || "Nome não disponível");
          setEmail(user.email); // O email do Supabase é carregado aqui
        }
      } else {
        setErro("Usuário não autenticado.");
        navigate("/dashboard"); // Redireciona para o login se o usuário não estiver autenticado
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    // Verificando se as senhas coincidem
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // Obtém o usuário logado
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      setErro("Usuário não está logado.");
      return;
    }

    try {
      // Atualizando os dados do usuário na tabela 'usuarios', mas não atualizando o e-mail
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({ nome }) // Atualiza o nome
        .eq("iduser", user.id); // Usando o ID do usuário para realizar a atualização

      if (updateError) {
        console.error("Erro ao atualizar no banco:", updateError);
        setErro("Erro ao atualizar informações no banco de dados.");
      } else {
        // Atualizando a senha do usuário no Supabase
        if (senha) {
          const { error: passwordError } = await supabase.auth.updateUser({
            password: senha, // Atualiza a senha do usuário no Supabase
          });

          if (passwordError) {
            setErro("Erro ao atualizar a senha.");
            return;
          }
        }

        // Após atualizar as informações, redireciona para a tela inicial
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      setErro("Erro inesperado.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir sua conta?");
    if (confirmDelete) {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setErro("Erro ao buscar usuário.");
        return;
      }

      try {
        const { error: deleteError } = await supabase.auth.api.deleteUser(user.id);

        if (deleteError) {
          setErro("Erro ao excluir a conta.");
        } else {
          navigate("/"); // Após excluir, redireciona para a tela de login
        }
      } catch (err) {
        console.error("Erro ao excluir a conta:", err);
        setErro("Erro inesperado ao excluir a conta.");
      }
    }
  };

  return (
   <div>
    <Header />
       <div className="cadastro-container">
      <Titulo text="Atualizar Conta" />

      <form onSubmit={handleSubmit} className="cadastro-form">
        {erro && <p className="erro">{erro}</p>}

        <div className="form-group">
          <label htmlFor="nome">Nome completo:</label>
          <CaixaTexto
            id="nome"
            text="Digite seu nome"
            value={nome}
            type="text"
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <small>O email não pode ser alterado</small>
          <CaixaTexto
            id="email"
            text="Seu email"
            value={email}
            type="email"
            readOnly 
            required
          />
        </div>

        <div className="form-group">
          <p>Trocar senha:</p>
          <label htmlFor="senha">Nova Senha:</label>
          <CaixaTexto
            id="senha"
            type="password"
            value={senha}
            text="Digite sua nova senha"
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
          <CaixaTexto
            id="confirmarSenha"
            type="password"
            value={confirmarSenha}
            text="Confirme sua nova senha"
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>

        <div className="botoes-cadastro">
          <BotaoClicado type="submit"><FontAwesomeIcon icon={faUserPen}/> Atualizar</BotaoClicado>
          <Link to="/dashboard" className="sublinhado">
            <BotaoClicado><FontAwesomeIcon icon={faArrowLeft} /> Voltar à tela Inicial</BotaoClicado>
          </Link>
          
        </div>
        <div className="botoes-cadastro">
          <BotaoClicado onClick={handleDeleteAccount} aria-label="Excluir conta"><FontAwesomeIcon icon={faUserSlash} /> Excluir Conta</BotaoClicado>
        </div>
      </form>
    </div>
    <Footer/>
   </div>
  );
}
