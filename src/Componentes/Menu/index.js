import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import "./menu.css";

export default function TopBar() {
  const [usuarioNome, setUsuarioNome] = useState(""); // Estado para armazenar o nome do usuário

  useEffect(() => {
    // Função assíncrona para pegar o usuário logado
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
          setUsuarioNome("Nome não encontrado");
        } else {
          setUsuarioNome(data?.nome || "Nome não disponível");
        }
      } else {
        setUsuarioNome("Usuário não autenticado");
      }
    };


    fetchUser(); // Chama a função para buscar o usuário
  }, []); // O useEffect roda apenas uma vez quando o componente é montado

  return (
    <div className="topbar">
      <h1>👤 Bem-vindo, {usuarioNome}!</h1> {/* Exibe o nome do usuário */}
    </div>
  );
}
