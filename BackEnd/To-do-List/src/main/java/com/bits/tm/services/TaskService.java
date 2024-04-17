package com.bits.tm.services;

import com.bits.tm.models.Task;
import com.bits.tm.models.User;

import java.util.List;

public interface TaskService {
    /** Find Task by id
     * @param taskId
     * @return
     * */
    Task findTaskById(Long taskId);

    /** Find Tasks by Use
     * @param user
     * @return
     * */
    List<Task> findAllTasksByUser(User user);

    /** Update or Save Task
     * @param task
     * @return
     * */
    Task saveTask(Task task);

    /**Delete task by id
     * @param taskId
     * @return
     * */
    void deleteTaskById(Long taskId);
}
