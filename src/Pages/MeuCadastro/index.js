import React, { useState } from "react";
import { Titulo, Botao, BotaoClicado, CaixaTexto } from "../../Componentes/ComponentesIcones";
import { supabase } from "../../supabaseClient";
import "./meuCadastro.css";


export default function meuCadastro(){
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return(
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
          <label htmlFor="email">E-mail:</label>
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
          <label htmlFor="senha">Senha:</label>
          <CaixaTexto
            id="senha"
            type="password"
            value={senha}
            text="Digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="botoes-cadastro">
          <Botao text="Salvar" type="submit" />
          <Link to="/dashboard">
            <BotaoClicado>Voltar à Página Inicial</BotaoClicado>
          </Link>
        </div>
      </form>
    </div>
    )
}