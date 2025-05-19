import { useState, useEffect } from "react";
import "./Tarefa.css";

export default function FormularioTarefa({ onSalvar, tarefa }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("média");
  const [status, setStatus] = useState("pendente");

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || "");
      setDescricao(tarefa.descricao || "");
      setPrioridade(tarefa.prioridade || "média");
      setStatus(tarefa.status || "pendente");
    }
  }, [tarefa]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaTarefa = {
      idtarf: tarefa?.idtarf,
      titulo,
      descricao,
      prioridade,
      status,
    };

    onSalvar(novaTarefa);

    // Limpar formulário
    setTitulo("");
    setDescricao("");
    setPrioridade("média");
    setStatus("pendente");
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
      <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
        <option value="baixa">Baixa</option>
        <option value="média">Média</option>
        <option value="alta">Alta</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluída">Concluída</option>
      </select>
      <button type="submit">{tarefa ? "Atualizar" : "Salvar"}</button>
    </form>
  );
}
