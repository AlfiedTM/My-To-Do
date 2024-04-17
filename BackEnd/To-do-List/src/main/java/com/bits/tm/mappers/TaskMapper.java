package com.bits.tm.mappers;

import com.bits.tm.Dtos.TaskDto;
import com.bits.tm.models.Task;
import jakarta.persistence.Column;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TaskMapper {

    public Task mapDtoToTask (TaskDto taskDto){
        return Task.builder()
                .id(taskDto.getId())
                .title(taskDto.getTitle())
                .status(taskDto.getStatus())
                .description(taskDto.getDescription())
                .startDate(taskDto.getStartDate())
                .dueDate(taskDto.getDueDate())
                .build();
    }

    public TaskDto mapTaskToDto (Task task){
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .status(task.getStatus())
                .description(task.getDescription())
                .startDate(task.getStartDate())
                .dueDate(task.getDueDate())
                .build();
    }
}
