import { useEffect, useState } from "react";
import FormularioTarefa from "../../Componentes/Tarefas/formularioTarefa";
import ListaTarefas from "../../Componentes/Tarefas/listaTarefas";
import { supabase } from "../../supabaseClient";
import "./dashboard.css";

export default function DashboardTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const obterUsuario = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      const user = userData?.user;

      if (user) {
        setUsuarioId(user.id);
        carregarTarefas(user.id);
      } else {
        console.error("Usuário não autenticado", error);
      }
    };

    obterUsuario();
  }, []);

  const carregarTarefas = async (iduser) => {
    const { data, error } = await supabase
      .from("tarefas")
      .select("*")  // Selecionando todas as colunas
      .eq("iduser", iduser)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar tarefas:", error.message);
    } else {
      setTarefas(data);
    }
  };

  const salvarTarefa = async (tarefa) => {
  if (!usuarioId) return;

  if (tarefaEditando) {
    // Atualizando a tarefa
    const { error } = await supabase
      .from("tarefas")
      .update({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        prioridade: tarefa.prioridade,
        status: tarefa.status,
        updated_at: new Date(),
      })
      .eq("idtarf", tarefa.idtarf); // Certifique-se de que "idtarf" é o nome correto da chave primária

    if (error) {
      console.error("Erro ao atualizar tarefa:", error.message);
    }
  } else {
    // Inserindo nova tarefa
    const { error } = await supabase.from("tarefas").insert([
      {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        prioridade: tarefa.prioridade,
        status: tarefa.status,
        iduser: usuarioId,  // O iduser deve ser configurado corretamente
      },
    ]);

    if (error) {
      console.error("Erro ao inserir tarefa:", error.message);
    }
  }

  setTarefaEditando(null);
  setMostrarFormulario(false);
  carregarTarefas(usuarioId);
};


  const excluirTarefa = async (id) => {
    const { error } = await supabase.from("tarefas").delete().eq("idtarf", id);
    if (error) {
      console.error("Erro ao excluir tarefa:", error.message);
    }
    carregarTarefas(usuarioId);
  };

  const editarTarefa = (tarefa) => {
    setTarefaEditando(tarefa);
    setMostrarFormulario(true);
  };

  const alternarConclusao = async (id, statusAtual) => {
    const novoStatus = statusAtual === "concluída" ? "pendente" : "concluída";
    const { error } = await supabase.from("tarefas").update({ status: novoStatus }).eq("idtarf", id);
    if (error) {
      console.error("Erro ao alternar status da tarefa:", error.message);
    }
    carregarTarefas(usuarioId);
  };

  const progresso =
    tarefas.length > 0
      ? (tarefas.filter((t) => t.status === "concluída").length / tarefas.length) * 100
      : 0;

  return (
    <div className="dashboard-tarefas">
      <div className="cabecalho">
        <h2>Minhas Tarefas</h2>
        <button
          className="botao-nova"
          onClick={() => {
            setTarefaEditando(null);
            setMostrarFormulario(!mostrarFormulario);
          }}
        >
          + Nova Tarefa
        </button>
      </div>

      <div className="progresso">
        <label>Progresso do Projeto</label>
        <progress value={progresso} max="100" />
      </div>

      {mostrarFormulario && (
        <FormularioTarefa
          onSalvar={salvarTarefa}
          tarefa={tarefaEditando}
        />
      )}

      <ListaTarefas
        tarefas={tarefas}
        onExcluir={excluirTarefa}
        onEditar={editarTarefa}
        onToggleConclusao={(id, status) => alternarConclusao(id, status)}
      />
    </div>
  );
}
