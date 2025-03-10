package com.ebook.ebookproject.repository;

import com.ebook.ebookproject.entity.Roles;
import com.ebook.ebookproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;


@Repository
public interface RoleRepository extends JpaRepository<Roles, String> {
    Optional<Roles> findRolesByUsers(User users);
}
