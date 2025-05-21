import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Titulo, Botao, BotaoClicado, CaixaTexto } from "../../Componentes/ComponentesIcones";
import "./cadastro.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    // Verificando se as senhas coincidem
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // Usando a chave correta: 'password'
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      // Exibindo a mensagem de erro
      setErro("Erro ao cadastrar: " + error.message);
    } else {
      const user = data.user;

      if (user) {
        try {
          // Insere na tabela usuarios apenas depois de criar o usuário
          const { error: insertError } = await supabase.from("usuarios").insert([
            {
              iduser: user.id, // campo uuid de auth
              nome: nome, // Nome do usuário
              email: email, // E-mail do usuário
              senha: senha,  // Senha do usuário
            },
          ]);
          
          if (insertError) {
            console.error("Erro ao inserir no banco:", insertError);
            setErro("Erro ao cadastrar usuário no banco de dados.");
          } else {
            navigate("/"); // Redireciona para a tela inicial
          }
        } catch (err) {
          console.error("Erro inesperado ao inserir no banco:", err);
          setErro("Erro inesperado ao cadastrar usuário.");
        }
      }
    }
  };

  return (
    <div className="cadastro-container">
      <Titulo text="Criar Conta" />

      <form onSubmit={handleSubmit} className="cadastro-form">
        {erro && <p className="erro">{erro}</p>}

        <div className="form-group">
          <label htmlFor="nome">Informe o seu primeiro nome:</label>
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
          <label htmlFor="email">Informe o seu E-mail:</label>
          <CaixaTexto
            id="email"
            text="Digite seu email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Informe a sua Senha:</label>
          <CaixaTexto
            id="senha"
            type="password"
            value={senha}
            text="Digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirme sua Senha:</label>
          <CaixaTexto
            id="confirmarSenha"
            type="password"
            value={confirmarSenha}
            text="Digite sua senha novamente"
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <div className="botoes-cadastro">
          <Botao text="Cadastrar" type="submit" />
          <Link to="/" className="sublinhado">
            <BotaoClicado>Voltar à tela de Login</BotaoClicado>
          </Link>
        </div>
      </form>
    </div>
  );
}
