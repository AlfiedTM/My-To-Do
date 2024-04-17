package com.bits.tm.controllers;

import com.bits.tm.Dtos.ResponseDto;
import com.bits.tm.Dtos.TaskDto;
import com.bits.tm.contants.Status;
import com.bits.tm.mappers.TaskMapper;
import com.bits.tm.models.Task;
import com.bits.tm.models.User;
import com.bits.tm.services.TaskService;
import com.bits.tm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = {"http://localhost:5173/"})
public class TaskController {
    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskMapper taskMapper;

    @GetMapping("/task")
    public ResponseEntity<ResponseDto> getUserTasks(){
        ResponseDto response = new ResponseDto();
//        Currently logged in user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findByEmail(authentication.getName());
        try{
            response.setResource(taskService.findAllTasksByUser(user));
            response.setResponse("Success");
            response.setStatusCode(200);
        }catch (Exception e){
            response.setResponse("Error");
            response.setStatusCode(500);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/task/new")
    public ResponseEntity<ResponseDto> addNewUserTask(@RequestBody TaskDto task){
        ResponseDto response = new ResponseDto();
//        Currently logged in user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findByEmail(authentication.getName());
        try{
            task.setStatus(Status.NOT_STARTED.getStatus());
            Task newTask = taskMapper.mapDtoToTask(task);
            newTask.setUser(user);
            newTask=  taskService.saveTask(newTask);

            response.setResponse("Success");
            response.setResource(newTask);
            response.setStatusCode(200);
        }catch (Exception e){

            response.setResponse(e.getMessage());
            response.setStatusCode(500);
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/task/{taskId}")
    public ResponseEntity<ResponseDto>  deleteTask(@PathVariable Long taskId){
        ResponseDto response = new ResponseDto();
//        Currently logged in user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findByEmail(authentication.getName());
        try{
           taskService.deleteTaskById(taskId);
            response.setResponse("Success");
            response.setResource(taskId);
            response.setStatusCode(200);
        }catch (Exception e){

            response.setResponse(e.getMessage());
            response.setStatusCode(500);
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/task")
    public ResponseEntity<ResponseDto>  updateTask(@RequestBody TaskDto task){
        ResponseDto response = new ResponseDto();
//        Currently logged in user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findByEmail(authentication.getName());
        try{
            Task newTask = taskMapper.mapDtoToTask(task);
            newTask.setUser(user);
            newTask=  taskService.saveTask(newTask);
            response.setResponse("Success");
            response.setResource(newTask);
            response.setStatusCode(200);
        }catch (Exception e){

            response.setResponse(e.getMessage());
            response.setStatusCode(500);
        }
        return ResponseEntity.ok(response);
    }
}
