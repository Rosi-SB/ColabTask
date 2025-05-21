import { useEffect, useState } from "react";
import FormularioTarefa from "../../Componentes/Tarefas/formularioTarefa";
import ListaTarefas from "../../Componentes/Tarefas/listaTarefas";
import { supabase } from "../../supabaseClient";
import "./dashboard.css";

export default function DashboardTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [erroSalvar, setErroSalvar] = useState(null); // Novo estado para erro de salvar

  const carregarTarefas = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return;

    const { data, error } = await supabase
      .from("tarefas")
      .select("*")
      .eq("iduser", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar tarefas:", error.message);
    } else {
      setTarefas(data);
    }
  };

  const salvarTarefa = async (tarefa) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;

    const prioridade = tarefa.prioridade.replace(/[áàãâä]/g, 'a').toLowerCase();

    if (tarefaEditando) {
      await supabase
        .from("tarefas")
        .update({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          prioridade: prioridade,
          status: tarefa.status,
          updated_at: new Date(),
        })
        .eq("idtarf", tarefa.idtarf);
    } else {
      const { error } = await supabase.from("tarefas").insert([
        {
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          prioridade: tarefa.prioridade,
          status: tarefa.status,
          iduser: user.id,
        },
      ]);

      if (error) {
        console.error("Erro ao inserir tarefa:", error.message);
        setErroSalvar("Ocorreu um erro ao salvar a tarefa. Tente novamente.");
        return;
      }
    }

    setErroSalvar(null); // Limpa o erro se houver sucesso
    setTarefaEditando(null);
    setMostrarFormulario(false);
    carregarTarefas();
  };

  const excluirTarefa = async (id) => {
    await supabase.from("tarefas").delete().eq("idtarf", id);
    carregarTarefas();
  };

  const editarTarefa = (tarefa) => {
    setTarefaEditando(tarefa);
    setMostrarFormulario(true);
  };

  const alternarConclusao = async (id, statusAtual) => {
    const novoStatus = statusAtual === "concluída" ? "pendente" : "concluída";
    await supabase.from("tarefas").update({ status: novoStatus }).eq("idtarf", id);
    carregarTarefas();
  };

  const progresso =
    tarefas.length > 0
      ? (tarefas.filter((t) => t.status === "concluída").length / tarefas.length) * 100
      : 0;

  useEffect(() => {
    carregarTarefas();
  }, []);

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

      {erroSalvar && <div className="erro">{erroSalvar}</div>} {/* Exibe o erro, se houver */}

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
