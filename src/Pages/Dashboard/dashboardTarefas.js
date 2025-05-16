import { useState, useEffect } from "react";
import FormularioTarefa from "../../Componentes/Tarefas/formularioTarefa";
import ListaTarefas from "../../Componentes/Tarefas/listaTarefas";
import "./dashboard.css";
import { Titulo, Botao } from "../../Componentes/ComponentesIcones";
import { supabase } from "../../supabaseClient";

export default function DashboardTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const obterUsuario = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUsuarioId(data.user.id);
        carregarTarefas(data.user.id);
      }
    };
    obterUsuario();
  }, []);

  const carregarTarefas = async (iduser) => {
    const { data, error } = await supabase
      .from("tarefas")
      .select("*")
      .eq("iduser", iduser)
      .order("created_at", { ascending: false });

    if (!error) {
      setTarefas(data);
    }
  };

  const salvarTarefa = async (tarefa) => {
    if (!usuarioId) return;

    if (tarefaEditando) {
      await supabase
        .from("tarefas")
        .update({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          prioridade: tarefa.prioridade,
          status: tarefa.status,
          updated_at: new Date(),
        })
        .eq("idtarf", tarefa.idtarf);
    } else {
      await supabase.from("tarefas").insert([
        {
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          prioridade: tarefa.prioridade,
          status: tarefa.status,
          iduser: usuarioId,
        },
      ]);
    }

    setTarefaEditando(null);
    setMostrarFormulario(false);
    carregarTarefas(usuarioId);
  };

  const excluirTarefa = async (id) => {
    await supabase.from("tarefas").delete().eq("idtarf", id);
    carregarTarefas(usuarioId);
  };

  const editarTarefa = (tarefa) => {
    setTarefaEditando(tarefa);
    setMostrarFormulario(true);
  };

  const alternarConclusao = async (id, statusAtual) => {
    const novoStatus = statusAtual === "concluída" ? "pendente" : "concluída";
    await supabase.from("tarefas").update({ status: novoStatus }).eq("idtarf", id);
    carregarTarefas(usuarioId);
  };

  const progresso =
    tarefas.length > 0
      ? (tarefas.filter((t) => t.status === "concluída").length / tarefas.length) * 100
      : 0;

  return (
    <div className="dashboard-tarefas">
      <div className="cabecalho">
        <Titulo text="Minhas Tarefas" />
        <Botao
          text="+ Nova Tarefa"
          onClick={() => {
            setTarefaEditando(null);
            setMostrarFormulario(!mostrarFormulario);
          }}
        />
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
        onToggleConclusao={(id) => {
          const tarefa = tarefas.find((t) => t.id === id);
          if (tarefa) alternarConclusao(id, tarefa.concluida);
        }}
        onEditar={editarTarefa}
      />
    </div>
  );
}
