import { Component } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/taskServices";

// var moment = require("moment");
// var formatted_date = moment(photo.date_published).format("YYYY-MM-DD");

class Tasks extends Component {
    state = { tasks: [], currentTask: "" };

    async componentDidMount() {
        try {
            const { data } = await getTasks();
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const { data } = await addTask({ task: this.state.currentTask });
            const tasks = originalTasks;
            tasks.push(data);
            this.setState({ tasks, currentTask: "" });
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            let date_create = new Date()
            console.log(date_create);
            tasks[index].completedAt = date_create;
            this.setState({ tasks });
            await updateTask(currentTask, {
              completed: tasks[index].completed,
              completedAt: tasks[index].completedAt
            });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({ tasks });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
}

export default Tasks;
