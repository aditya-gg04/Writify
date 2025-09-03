package com.aditya.notes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aditya.notes.entities.Notes;
import com.aditya.notes.entities.User;

public interface NotesRepo extends JpaRepository<Notes, Integer>{
    List<Notes> findByUser(User user);
}
