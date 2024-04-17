import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, differenceInDays } from "date-fns";
import DropDownButton from "../../components/buttons/dropdowns";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from '../../components/modals/edittaskmodal';
import {
  // fetchTodo
  fetchTask,
  removeTask,
  loadTasks,
} from "../../features/task/taskSlice";
import CreateTaskForm from "../../components/forms/createtask";
import Loader from "../../components/presentation/loader";

let startDeleting = false;

const Page = () => {

  const [isOpen, setIsOpen] = useState(false);

  const openModal = (prevstate, currentState) => setIsOpen({ ...prevstate, isOpen: true })
  const triggerModal = () => {
    setIsOpen(!isOpen)
    console.log(isOpen)
  };

  // Dropdown data
  const dropdownMenu = {
    menuItems: [
      {
        Icon: EditNoteOutlinedIcon,
        text: "Edit",
        href: "#edit",
        action: () => { },
      },
      {
        Icon: DeleteOutlinedIcon,
        text: "Delete",
        href: "#delete",
        action: triggerModal,
      },
    ],
  };

  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "startDate",
      label: "Starting Date",
      options: {
        customBodyRender: (value, tableData) => {
          return format(new Date(value), "do MMMM yyyy");
        }
      }
    },
    {
      name: "dueDate",
      label: "Due Date",
      options: {
        customBodyRender: (value, tableData) => {
          const { rowData } = tableData;
          //   console.log(rowData);
          const today = new Date();
          const daysDifference = differenceInDays(value, today);

          const formattedOutput =
            daysDifference > 0
              ? `${daysDifference} days left`
              : `${Math.abs(daysDifference)} ${Math.abs(daysDifference) > 1 ? "days " : "day"}  ago`;
          return format(new Date(value), "do MMMM") + " (" + formattedOutput + ")";
        }
      }
    },
    {
      name: "status",
      label: "Current Status",
      options: {
        customBodyRender: (value, tableData) => {
          const { rowData } = tableData;
          const color =
            value == "FINISHED"
              ? "badge-success"
              : value == "DROPPED"
                ? "badge-error"
                : "badge-warning";

          return (
            <div className={`badge ${color} gap-2`}>
              {value}
            </div>
          );
        }
      }
    },
    {
      name: "actions",
      label: "Actions", //Column header
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          //             Table data
          const { rowData } = tableMeta;
          let userId = rowData[0];

          //           View task method
          const viewTask = (id) => {
            dispatch(fetchTask(id));
            triggerModal();
          };

          //       Delete task method
          const deleteTask = (id) => {
            startDeleting = true;
            dispatch(removeTask(id))
          }

          dropdownMenu.menuItems[0].action = viewTask;
          dropdownMenu.menuItems[1].action = deleteTask;

          return (
            <DropDownButton
              resource={rowData[2]}
              //   Icon={ManageAccountsIcon}
              {...dropdownMenu}
              id={rowData[0]}
            />
          );
        },
      },
    },
  ];

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "rubik",
      },
      fixedHeader: true,
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",
            },
          },
        },
      },
    });


  const options = {
    textLabels: {
      body: {
        noMatch: "You currently have no tasks...",
      }
    },
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 10,
    enableNestedDataAccess: ".",
    rowsPerPageOptions: [5, 10, 25, 50, 100],
  };


  const { tasks, isLoading, isFinished, isDeleted, task, isFetched } = useSelector((state) => {
    return state.tasks;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  if (isLoading) {
    return (
      <Loader text={"Loading...Please wait"} />
    );
  }
  // Successful deletion of task
  if (startDeleting && isDeleted && isFinished) {
    toast.success("Task Successfully Deleted!", {
      position: "top-center"
    });
    startDeleting = false;
  }

  return (
    <div className={"relative"}>
      <div className="row item justify-content-between mb-10 block w-full">
        <Button
          className="float-right bg-primary text-black"
          variant="contained"
          color="primary"
          // startIcon={<PersonAddAlt1Icon />}
          onClick={() => {
            window.location.href = '/new';
          }}
        >
          New Task
        </Button>
      </div>
      <div id={"data-table"}>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            data={tasks}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
      <ToastContainer />

      {isFetched && openModal}
      {/* Modals */}
      <Modal currentState={isOpen} data={task} toggleModal={triggerModal} />
    </div>
  );
};
export default Page;


// Page for creating new task
export const CreateTask = () => {
  return <CreateTaskForm />
}
