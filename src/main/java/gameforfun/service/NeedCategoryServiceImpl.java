package gameforfun.service;

import gameforfun.dto.response.NeedCategoryResponse;
import gameforfun.model.NeedCategory;
import gameforfun.repository.NeedsCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NeedCategoryServiceImpl implements NeedCategoryService{
    private final NeedsCategoryRepository needsCategoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public Set<NeedCategoryResponse> getAllCategories() {
        List<NeedCategory> categories = needsCategoryRepository.findAll();
        return categories.stream().map(needCategory -> modelMapper.map(needCategory, NeedCategoryResponse.class)).collect(Collectors.toSet());
    }
}
