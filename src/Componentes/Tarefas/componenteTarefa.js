import "./Tarefa.css";

export default function ComponenteTarefa({ tarefa, onExcluir, onToggleConclusao, onEditar }) {
  const isConcluida = tarefa.status === "concluída";

  // A classe 'concluida' só será aplicada se a tarefa estiver concluída
  return (
    <div className={`tarefa ${isConcluida ? "concluida" : ""}`}>
      <input
        type="checkbox"
        checked={isConcluida}
        onChange={() => onToggleConclusao(tarefa)}  // Passando o objeto 'tarefa' completo para manipulação
      />
      <div className="info">
        <strong>{tarefa.titulo}</strong>
        <p>{tarefa.descricao}</p>
        <small>
          Prioridade: {tarefa.prioridade} | Status: {tarefa.status}
        </small>
      </div>
      <button className="editar" onClick={() => onEditar(tarefa)}>
        ✏️ Editar Tarefa
      </button>

      <button className="excluir" onClick={() => onExcluir(tarefa)}>
        🗑️ Excluir
      </button>
    </div>
  );
}
