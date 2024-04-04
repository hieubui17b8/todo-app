import React from 'react';
import { useState } from 'react';
import "./App.css"
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState<String[]>(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    return storageJobs;
  });

  const handleSubmit = () => {
    const newJobs = [...jobs, job];

    // save to local storage
    localStorage.setItem('jobs', JSON.stringify(newJobs));

    setJobs(newJobs);
    setJob('');
  };

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();

    const updatedJobs = [...jobs];
    updatedJobs.splice(index, 1);

    // save to local storage
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));

    setJobs(updatedJobs);
  };

  const toggleComplete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();

    const updatedJobs = [...jobs];

    const listItem = e.target as HTMLElement;
    listItem.classList.toggle('completed')
    // Cập nhật danh sách công việc đã hoàn thành
    updatedJobs[index] = listItem.classList.contains('completed') ? `✓ ${jobs[index]}` : jobs[index].replace('✓ ', '');

    // Lưu vào localStorage
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));

    setJobs(updatedJobs);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main>
      <p className='desc'>Let's add what you have to do! <br />
        Fill the input and click button or "Enter" to add a new task into the list. <br />
        To mark as completed, just click directly to the task</p>
      <form action="">
        <input
          type="text"
          value={job}
          onChange={e => setJob(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSubmit}>+</button>
      </form>
      <div className='app'>
        <ul>
          {jobs.map((job, index) => (
            <React.Fragment key={index}>
              <li
                onClick={e => toggleComplete(index, e)}
                className={job.includes("✓") ? "completed" : ""}
              >
                {index + 1}. {job}
                <IconButton onClick={e => handleDelete(index, e)} >
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              </li>
              <hr />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;