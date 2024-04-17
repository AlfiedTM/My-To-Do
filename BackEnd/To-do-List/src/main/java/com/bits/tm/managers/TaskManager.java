package com.bits.tm.managers;

import com.bits.tm.models.Task;
import com.bits.tm.models.User;
import com.bits.tm.respositories.TaskRepository;
import com.bits.tm.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskManager implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    /**Find task by id
     * @param taskId
     * @return Task
     * */
    @Override
    public Task findTaskById(Long taskId) {
        return taskRepository.findTaskById(taskId);
    }

    /**Find tasks by user
     * @param user
     * @return List<Task>
     * */
    @Override
    public List<Task> findAllTasksByUser(User user) {
        return taskRepository.findAllByUser(user);
    }

    /**Persist a task record
     * @param task
     * @return Task
     * */
    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTaskById(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
