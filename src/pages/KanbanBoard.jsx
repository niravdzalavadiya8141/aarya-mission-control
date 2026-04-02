import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
function TaskCard({ task }) {
  return (
    <div className="task-card" style={{ borderLeft:  }}>
      <div><strong>{task.title}</strong></div>
      <div>{task.description}</div>
      <div>{task.agentEmoji} {task.agent}</div>
      <div className="priority-badge" style={{ color: task.priority === 'critical' ? 'red' : 'yellow' }}>{task.priority}</div>
      <div className="xp-badge">⚡️ {task.xpReward} XP</div>
      <div className="subtask-progress">{task.subtasks.filter(st => st.done).length}/{task.subtasks.length} subtasks</div>
    </div>
  );
}
function KanbanColumn({ status, tasks, onDragEnd }) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
          <div>{status}</div>
          {tasks.filter(task => task.status === status).map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <TaskCard task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
export default function KanbanBoard() {
  const [tasks, setTasks] = React.useState([]);
  React.useEffect(() => {
    fetch('data/tasks.json')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);
  const onDragEnd = (result) => {
    // handle drag end
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {['backlog', 'assigned', 'in-progress', 'review', 'testing', 'completed'].map(status => (
          <KanbanColumn key={status} status={status} tasks={tasks} onDragEnd={onDragEnd} />
        ))}
      </div>
    </DragDropContext>
  );
}
