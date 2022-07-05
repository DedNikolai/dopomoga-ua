package gameforfun.controller;

import gameforfun.dto.response.CategoryResponse;
import gameforfun.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("api/v1/needs-categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService needCategoryService;

    @GetMapping
    public ResponseEntity<Set<CategoryResponse>> getAllCategories() {
        Set<CategoryResponse> categories = needCategoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
