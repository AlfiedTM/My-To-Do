import tasks from "./tasks";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
    ...tasks
});