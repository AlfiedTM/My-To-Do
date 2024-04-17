package com.bits.tm.respositories;

import com.bits.tm.models.Task;
import com.bits.tm.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    /** Find Task by user
    * @param user
    * @return
    * */
    List<Task> findAllByUser(User user);

    /**Find Task By Id
     * @param taskId
     * @return
     * */
    Task findTaskById(Long id);
}
