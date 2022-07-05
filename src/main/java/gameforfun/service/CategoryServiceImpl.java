package gameforfun.service;

import gameforfun.dto.response.CategoryResponse;
import gameforfun.model.Category;
import gameforfun.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public Set<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(needCategory -> modelMapper.map(needCategory, CategoryResponse.class)).collect(Collectors.toSet());
    }
}
