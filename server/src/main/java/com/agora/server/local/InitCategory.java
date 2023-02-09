//package com.agora.server.local;
//
//import com.agora.server.category.domain.Category;
//import com.agora.server.category.repository.CategoryRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Lazy;
//import org.springframework.context.annotation.Profile;
//import org.springframework.stereotype.Component;
//
//import javax.annotation.PostConstruct;
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.transaction.Transactional;
//import java.util.List;
//
//@Profile("local")
//@Component
//@RequiredArgsConstructor
//public class InitCategory {
//    private final InitCategoryService initCategoryService;
//
//    @PostConstruct
//    public void init() {
//        initCategoryService.dbInit();
//    }
//
//    @Component
//    @Transactional
//    @RequiredArgsConstructor
//    private static class InitCategoryService {
//
//        private final CategoryRepository categoryRepository;
//        public void dbInit() {
//
//            for (int i = 0; i < 10; i++) {
//                Category category = new Category();
//                category.setCategory_name(i + "번");
//                category.setCategory_image("-");
//                categoryRepository.save(category);
//            }
//
//        }
//    }
//}
