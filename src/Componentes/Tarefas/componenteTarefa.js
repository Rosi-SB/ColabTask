import "./Tarefa.css";

export default function ComponenteTarefa({ tarefa, onExcluir, onEditar, onToggleConclusao }) {
  const isConcluida = tarefa.status === "concluída";

  return (
    <div className={`tarefa ${isConcluida ? "concluida" : ""}`}>
      <input
        type="checkbox"
        checked={isConcluida}
        onChange={onToggleConclusao}
      />
      <div className="info">
        <strong>{tarefa.titulo}</strong>
        <p>{tarefa.descricao}</p>
        <small>Prioridade: {tarefa.prioridade} | Status: {tarefa.status}</small>
      </div>
      <div className="acoes">
        <button className="editar" onClick={onEditar}>✏️</button>
        <button className="excluir" onClick={onExcluir}>🗑️</button>
      </div>
    </div>
  );
}
