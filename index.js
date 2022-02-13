import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';

function Button({ color, text, trigger }) {
  return (
    <button
      style={{ backgroundColor: color, cursor: 'pointer' }}
      className="button"
      onClick={trigger}
    >
      {text}
    </button>
  );
}

function Header({ addtask, setter }) {
  const addClicked = () => {
    setter(!addtask);
  };

  return (
    <div className="header">
      <h1>Task Manager</h1>
      <Button
        color={addtask ? 'red' : 'green'}
        text={addtask ? 'Close' : 'Add Task'}
        trigger={addClicked}
      />
    </div>
  );
}

function AddTask({ OnAdd }) {
  const [todotext, Settodotext] = useState('');
  const [tododesc, Settododesc] = useState('');
  function onadditionclick(e) {
    OnAdd({ todotext, tododesc });
    e.preventDefault();
  }
  return (
    <>
      <form className="addform" onSubmit={onadditionclick}>
        <label htmlFor="task_name"> Task:</label>
        <br />
        <input
          type="text"
          id="task"
          placeholder=" Add task name"
          name="task_name"
          onChange={(e) => Settodotext(e.target.value)}
        ></input>
        <br />
        <label htmlFor="task_desc"> Description:</label>
        <br />
        <input
          type="text"
          id="desc"
          placeholder=" Add task Description"
          name="task_desc"
          onChange={(e) => Settododesc(e.target.value)}
        ></input>
        <Button color="orange" text="Add" />
      </form>
    </>
  );
}
function Task({ task, Ondel }) {
  function deletetask() {
    Ondel(task.id);
  }
  return (
    <>
      <div className="taskcard shadow1">
        <h2>{task.task_name}</h2>
        <div className="bottomcard">
          <h3>{task.task_desc}</h3>
          <Button text="Delete" color="red" trigger={deletetask} />
        </div>
      </div>
    </>
  );
}

function Tasks({ tasks, Ondel }) {
  return tasks.length === 0 ? (
    <pre>No Tasks Available To Display!</pre>
  ) : (
    <>
      {tasks.map((t) => (
        <Task key={t.id} task={t} Ondel={Ondel} />
      ))}
    </>
  );
}

const App = () => {
  let [tasks, SetTasks] = useState([
    { id: 0, task_name: 'learn js', task_desc: 'complete Java Script ' },
    { id: 1, task_name: 'learn React', task_desc: 'loop React library ' },
    { id: 2, task_name: 'practice Django', task_desc: 'complete Django' },
  ]);
  const [isaddtask, Setisaddtask] = useState(false);
  function Ondel(id) {
    SetTasks(tasks.filter((t) => t.id !== id));
  }
  function OnAdd({ todotext, tododesc }) {
    let new_id = tasks.length ? tasks.length + 1 : 0;
    let new_task_obj = { id: new_id, task_name: todotext, task_desc: tododesc };
    tasks.push(new_task_obj);
    SetTasks(tasks);
    Setisaddtask(!isaddtask);
  }

  return (
    <>
      <Header addtask={isaddtask} setter={Setisaddtask} />
      {isaddtask && <AddTask OnAdd={OnAdd} />}
      <Tasks tasks={tasks} Ondel={Ondel} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
