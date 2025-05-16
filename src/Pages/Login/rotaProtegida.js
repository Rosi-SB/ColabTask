import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function RotaProtegida({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Função assíncrona para obter o usuário
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUsuario(data?.user || null); // Atualiza o estado com o usuário ou null se não houver
    };

    fetchUser(); // Chama a função para buscar o usuário
  }, []); // O useEffect será executado apenas uma vez na montagem do componente

  // Enquanto a informação do usuário não chega, renderiza um loading ou nada
  if (usuario === null) {
    return <div>Carregando...</div>;
  }

  // Se não houver usuário, redireciona para a página inicial
  if (!usuario) {
    return <Navigate to="/" />;
  }

  // Se houver usuário, renderiza o conteúdo protegido
  return children;
}
