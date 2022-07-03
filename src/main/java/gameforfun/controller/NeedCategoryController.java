package gameforfun.controller;

import gameforfun.dto.response.NeedCategoryResponse;
import gameforfun.service.NeedCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("api/v1/needs-categories")
@RequiredArgsConstructor
public class NeedCategoryController {
    private final NeedCategoryService needCategoryService;

    @GetMapping
    public ResponseEntity<Set<NeedCategoryResponse>> getAllCategories() {
        Set<NeedCategoryResponse> categories = needCategoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
