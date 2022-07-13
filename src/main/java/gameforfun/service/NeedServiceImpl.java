package gameforfun.service;

import gameforfun.dto.request.NeedRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.NeedResponse;
import gameforfun.exeption.ResourceNotFoundException;
import gameforfun.model.Need;
import gameforfun.model.Category;
import gameforfun.model.Region;
import gameforfun.model.User;
import gameforfun.repository.CategoryRepository;
import gameforfun.repository.NeedsRepository;
import gameforfun.repository.RegionRepository;
import gameforfun.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NeedServiceImpl implements NeedService {
  private final NeedsRepository needsRepository;
  private final ModelMapper modelMapper;
  private final CategoryRepository categoryRepository;
  private final RegionRepository regionRepository;
  private final UserRepository userRepository;

  @Override
  public NeedResponse getNeedById(Long id) {
    Need need = needsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Need", "id", id));
    return modelMapper.map(need, NeedResponse.class);
  }

  @Override
  public Page<NeedResponse> getNeedsByParams(Pageable pageable, String[] categories, String[] regions) {

    List<Region> neededRegionsSet;
    List<Category> categoriesForSearch;
    List<Category> allCategories = categoryRepository.findAll();
    List<Region> allRegions = regionRepository.findAll();

    if (regions.length == 0) {
      neededRegionsSet = allRegions;
    } else {
      Set<String> regionsSet = Set.of(regions);
      neededRegionsSet = allRegions.stream()
              .filter(region -> regionsSet.contains(region.getRegionName())).collect(Collectors.toList());
    }

    if (categories.length == 0) {
      categoriesForSearch = allCategories;
    } else {
      Set<String> categoriesNamesSet = Set.of(categories);
      categoriesForSearch = allCategories.stream()
              .filter(category -> categoriesNamesSet.contains(category.getCategoryName()))
              .collect(Collectors.toList());
    }

    Page<Need> needs = needsRepository
        .findDistinctByCategoriesInAndRegionInAndIsActiveTrueOrderByCreatedDate(categoriesForSearch, neededRegionsSet, pageable);
    Page<NeedResponse> needsByParams = needs.map(need -> modelMapper.map(need, NeedResponse.class));
    return needsByParams;
  }

  @Override
  public ApiResponse createNeed(NeedRequest needRequest) {
    Need need = modelMapper.map(needRequest, Need.class);
    needsRepository.save(need);
    return new ApiResponse(true, "Need was created");
  }

  @Override
  public ApiResponse updateNeed(NeedRequest needRequest, Long id) {
    Need need = modelMapper.map(needRequest, Need.class);
    Need needFromDb = needsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Need", "id", id));
    need.setId(needFromDb.getId());
    needsRepository.save(need);
    return new ApiResponse(true, "Need aws updated");
  }

  @Override
  public ApiResponse deleteNeed(Long id) {
    Need needFromDb = needsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Need", "id", id));
    needsRepository.delete(needFromDb);
    return new ApiResponse(true, "Need was deleted");
  }

  @Override
  public Page<NeedResponse> getNeedsByCurrentUser(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElse(null);
    Page<Need> needs = needsRepository.findAllByUser(user, pageable);
    return needs.map(need -> modelMapper.map(need, NeedResponse.class));
  }
}
