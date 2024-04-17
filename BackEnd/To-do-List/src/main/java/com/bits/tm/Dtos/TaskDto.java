package com.bits.tm.Dtos;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class TaskDto {
    private Long id;
    private String title;
    private String status;
    private String description;
    private Date dueDate;
    private Date startDate;
}
