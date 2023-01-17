package com.agora.server.user.repository;

import com.agora.server.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class GoogleUserRepository {

    private final EntityManager em;

    public void save(User user){em.persist(user);}

    public User findById(Long id) {return em.find(User.class,id);}

}
