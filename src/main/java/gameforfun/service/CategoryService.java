package gameforfun.service;

import gameforfun.dto.request.CategoryRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
    Page<CategoryResponse> getAllCategories(Pageable pageable);

    ApiResponse updateCategory(Long id, CategoryRequest category);

    ApiResponse deleteCategory(Long id);

    ApiResponse createCategory(CategoryRequest category);
}
