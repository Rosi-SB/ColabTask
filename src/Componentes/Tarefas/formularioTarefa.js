import { useState, useEffect } from "react";
import "./Tarefa.css";

export default function FormularioTarefa({ onSalvar, tarefa }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [status, setStatus] = useState("pendente");

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || "");
      setDescricao(tarefa.descricao || "");
      setPrioridade(tarefa.prioridade || "media");
      setStatus(tarefa.status || "pendente");
    }
  }, [tarefa]);

  // Validação de prioridade e status
  const validarCampos = () => {
    const prioridadesValidas = ["baixa", "media", "alta"];
    const statusValidos = ["pendente", "em andamento", "concluída"];

    if (!prioridadesValidas.includes(prioridade)) {
      alert("Prioridade inválida. Escolha entre 'baixa', 'media' ou 'alta'.");
      return false;
    }

    if (!statusValidos.includes(status)) {
      alert("Status inválido. Escolha entre 'pendente', 'em andamento' ou 'concluída'.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      return; // Não envia se a validação falhar
    }

    const novaTarefa = {
      idtarf: tarefa?.idtarf, // Caso de edição
      titulo,
      descricao,
      prioridade,
      status,
    };

    console.log("Valores de Tarefa:", novaTarefa);  // Para depuração (verificar valores enviados)

    onSalvar(novaTarefa);

    // Não resetamos os campos caso seja uma edição
    if (!tarefa) {
      setTitulo("");
      setDescricao("");
      setPrioridade("media");
      setStatus("pendente");
    }
  };

  return (
    <form className="formulario-tarefa" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <select
        value={prioridade}
        onChange={(e) => setPrioridade(e.target.value)}
      >
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluída">Concluída</option>
      </select>
      <button type="submit">{tarefa ? "Atualizar" : "Salvar"}</button>
    </form>
  );
}

