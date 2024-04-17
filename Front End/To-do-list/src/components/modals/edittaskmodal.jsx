import React, { useState, useEffect } from 'react';
import { Input } from '../forms/input fields/input';
import TextAreaInputField from "../forms/input fields/textarea";
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import { finishedTask, updateThisTask } from '../../features/task/taskSlice';

const Modal = ({ currentState, toggleModal }) => {
  const { isFetched, task, isFinished, isUpdated } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState('');
  const [taskId, setTaskId] = useState(0);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('ACTIVE');

  useEffect(() => {
    if (isFetched) {
      setTaskId(task.id);
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setStartDate(task.startDate);
      setStatus(task.status);
    }
  }, [isFetched, task]);

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const updateTask = { id: taskId, title, description, dueDate, startDate, status };
    dispatch(updateThisTask(updateTask));
  }
  const formatDate = (dateString) => {
    if (dateString.trim() === '') {
      return '';
    }
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;

    // verify if newStartDate is later than the current dueDate
    if (new Date(newStartDate) > new Date(dueDate)) {
      toast.error("Start date cannot be after due date");
      setStartDate(''); // Clear the value
    } else {
      setStartDate(newStartDate);
    }
  };

  const setStatusData = (e) => {
    setStatus(e.target.value)
  }

  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;

    // check if newDueDate is earlier than the current startDate
    if (new Date(newDueDate) < new Date(startDate)) {
      toast.error("Due date cannot be before start date");
      setDueDate(''); // Clear the value
    } else {
      setDueDate(newDueDate);
    }
  };
  function modal() {
    toggleModal();
  }

  if (isFinished && isUpdated) {
    toast.success("Task Successfully Updated!", {
      position: "top-center"
    });
    dispatch(finishedTask());
    toggleModal();
  }

  return (
    <div>
      {currentState && isFetched && (
        <div className="fixed inset-0 z-50 flex h-[100%] items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-0">Edit Task</h2>
              <button onClick={modal} className="text-gray-600 hover:text-gray-800 focus:outline-none" aria-label="Close modal">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="text-gray-700">
              <form onSubmit={handleOnSubmit} className="card w-96 p-8 bg-base-100 shad ow-lg flex flex-col gap-y-2">
                <Input
                  value={taskId}
                  name="id"
                  type="hidden"
                  required
                />
                <Input
                  value={title}
                  action={handleTitleChange}
                  name="title"
                  type="text"
                  label="Title"
                  required
                />
                <TextAreaInputField
                  value={description}
                  action={handleDescriptionChange}
                  name="description"
                  title={'Description'}
                  placeholder="Describe your Task"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="startDate"
                    value={formatDate(startDate)}
                    action={handleStartDateChange}
                    type="date"
                    label="Start Date"
                    required
                  />
                  <Input
                    name="dueDate"
                    value={formatDate(dueDate)}
                    action={handleDueDateChange}
                    type="date"
                    label="Due Date"
                    required
                  />
                  <div className=' flex'>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text mr-1">Active</span>
                        <input type="radio" name="status" onChange={setStatusData} checked={status === "ACTIVE" ? true : false} value={"ACTIVE"} className="radio radio-success  " />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text mr-1">Finished</span>
                        <input type="radio" name="status" onChange={setStatusData} checked={status === "FINISHED" ? true : false} value={"FINISHED"} className="radio radio-success  " />
                      </label>
                    </div>
                    <div className="form-control ">
                      <label className="label cursor-pointer">
                        <span className="label-text mr-1">Dropped</span>
                        <input type="radio" name="status" onChange={setStatusData} checked={status === "DROPPED" ? true : false} value={"DROPPED"} className="radio radio-success  " />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex grid grid-cols-2 justify-end">
                  <button type='submit' className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Submit</button>
                  <button onClick={modal} className="ml-4 px-4 py-2 bg-red-500 text-white rounded  focus:outline-none">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Modal;
