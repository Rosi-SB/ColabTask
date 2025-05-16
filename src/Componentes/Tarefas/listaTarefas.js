import React from "react";
import ComponenteTarefa from "./componenteTarefa"
import "./Tarefa.css";

export default function ListaTarefas({ tarefas, onExcluir, onEditar, onToggleConclusao}) {
  return (
    <div className="lista-tarefas">
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        tarefas.map((tarefa) => (
          <ComponenteTarefa 
             key={tarefa.idtarf}
            tarefa={tarefa}
            onExcluir={()=> onExcluir(tarefa.idtarf)}
            onEditar={()=>onEditar(tarefa)}
            onToggleConclusao={() => onToggleConclusao(tarefa.idtarf, tarefa.status)} 
          />
        ))
      )}
    </div>
  );
}
