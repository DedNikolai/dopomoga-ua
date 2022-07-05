package gameforfun.service;

import gameforfun.dto.response.CategoryResponse;

import java.util.Set;

public interface CategoryService {
    Set<CategoryResponse> getAllCategories();
}
