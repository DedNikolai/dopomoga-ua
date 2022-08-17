package gameforfun.service;

import gameforfun.dto.request.CategoryRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.CategoryResponse;
import gameforfun.exeption.ResourceNotFoundException;
import gameforfun.model.Category;
import gameforfun.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<CategoryResponse> getAllCategories(Pageable pageable) {
        Page<Category> categories = categoryRepository.findAll(pageable);
        return categories.map(needCategory -> modelMapper.map(needCategory, CategoryResponse.class));
    }

    @Override
    public ApiResponse updateCategory(Long id, CategoryRequest request) {
        Category categoryFromDb = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        Category category = modelMapper.map(request, Category.class);
        category.setId(categoryFromDb.getId());
        categoryRepository.save(category);
        return new ApiResponse(true, "Категорію Оновлено");
    }
}
