import { useState } from "react";
import { Input } from "./input fields/input";
import SubmitButton from "./input fields/submitbutton";
import Button from "./input fields/button";
import TextAreaInputField from "./input fields/textarea";
import { addTask } from "../../features/task/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, ToastContainer } from "react-toastify";

let isFormSubmitted = false;

const CreateTaskForm = (thisTask) => {

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;

    // Check if newStartDate is later than the current dueDate
    if (new Date(newStartDate) > new Date(task.dueDate)) {
      toast.error("Start date cannot be after due date");
      setTask({ ...task, [e.target.name]: '' });
      return false;
    }
    return true;
  };

  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;

    // Check if newDueDate is earlier than the current startDate
    if (new Date(newDueDate) < new Date(task.startDate)) {
      toast.error("Due date cannot be before start date");
      setTask({ ...task, [e.target.name]: '' });
      return false;
    }
    return true;
  };

  const TaskSwal = withReactContent(Swal);
  const [task, setTask] = useState({ ...thisTask });

  const handleOnChange = (e) => {
    e.preventDefault();
    const target = e.target;

    if (e.target.name == "dueDate" && handleDueDateChange(e) ||
      (e.target.name == "startDate" && handleStartDateChange(e)) ||
      e.target.name != "startDate" && e.target.name != "dueDate") {
      setTask({ ...task, [e.target.name]: e.target.value });
    }

  };

  // Cleare form
  const clearForm = () => {
    setTask({});
  };

  /* Submit form */
  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();

    isFormSubmitted = true;
    dispatch(addTask(task));
  }
  const { isCreating, isFinished, isError } = useSelector((state) => {
    return state.tasks;
  })

  {/*        Sweet alerts for actions*/ }
  // On successful creation of the task
  {
    isFormSubmitted & isFinished && !isError && TaskSwal.fire({
      title: "Task creation",
      text: "Successfully created",
      icon: "success"
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        window.location.href = '/tasks';
      }
    });
  }

  //                                          On failure
  {
    isFormSubmitted & isFinished && isError && TaskSwal.fire({
      title: "Task creation",
      text: "Sorry could create your task...",
      icon: "error"
    })
  }
  return (
    <main className="h-screen grid place-items-center">
      <form
        className="card w-96 p-8 bg-base-100 shad ow-lg flex flex-col gap-y-2"
        onSubmit={onSubmitForm}
      >
        {/*Form Title*/}
        <h4 className="text-center text-3xl font-bold"> Create Task </h4>

        {/*Form Fields*/}
        <Input
          action={handleOnChange}
          value={task.title}
          name="title"
          type={"text"}
          label={"Title"}
          required
        />

        <TextAreaInputField
          action={handleOnChange}
          value={task.description}
          name={"description"}
          placeholder={"Describe your task"}
          required
        />

        <div className="grid grid-cols-2 gap-2">
          <Input
            action={handleOnChange}
            name="startDate"
            value={task.startDate}
            type={"date"}
            label={"Start Date"}
            required
          />

          <Input
            action={handleOnChange}
            name="dueDate"
            value={task.dueDate}
            type={"date"}
            label={"Due Date"}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 justify-items-">
          <Button
            type="reset"
            btnSize="block"
            name="Cancel"
            color="error"
            action={clearForm}
            textSize="bg-error text-2xl font-bold text-white"
          />
          <SubmitButton
            isSubmitting={isCreating}
            mute={isCreating}
            // action={onSubmitForm}
            btnSize="block"
            name="Submit"
            color="primary"
            textSize="text-2xl font-bold text-white"
          />
        </div>
      </form>
      <ToastContainer />
    </main>
  );
};
export default CreateTaskForm;
