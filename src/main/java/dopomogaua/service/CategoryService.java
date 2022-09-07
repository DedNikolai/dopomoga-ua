package dopomogaua.service;

import dopomogaua.dto.request.CategoryRequest;
import dopomogaua.dto.response.ApiResponse;
import dopomogaua.dto.response.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
    Page<CategoryResponse> getAllCategories(Pageable pageable);

    ApiResponse updateCategory(Long id, CategoryRequest category);

    ApiResponse deleteCategory(Long id);

    ApiResponse createCategory(CategoryRequest category);
}
