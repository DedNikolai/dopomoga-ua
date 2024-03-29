package dopomogaua.service;

import dopomogaua.dto.request.CategoryRequest;
import dopomogaua.dto.response.ApiResponse;
import dopomogaua.dto.response.CategoryResponse;
import dopomogaua.exeption.ResourceNotFoundException;
import dopomogaua.model.Category;
import dopomogaua.repository.CategoryRepository;
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

    @Override
    public ApiResponse deleteCategory(Long id) {
        Category category = categoryRepository.findFirstByIdAndNeeds_EmptyAndProposals_Empty(id);
        if (category == null) {
            return new  ApiResponse(false, "Категорію не можна видалити є звязані єлементи");
        }

        categoryRepository.delete(category);
        return new ApiResponse(true, "Категорію видилено");
    }

    @Override
    public ApiResponse createCategory(CategoryRequest request) {
        Category category = modelMapper.map(request, Category.class);
        Category createdCategory = categoryRepository.save(category);
        if (createdCategory.getId() != null) {
            return new ApiResponse(true, "Категорію створено");
        }
        return new ApiResponse(false, "Категорію не створено");
    }
}
