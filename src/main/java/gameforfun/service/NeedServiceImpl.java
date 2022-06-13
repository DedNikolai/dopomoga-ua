package gameforfun.service;

import gameforfun.dto.request.NeedRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.NeedResponse;
import gameforfun.exeption.ResourceNotFoundException;
import gameforfun.model.Need;
import gameforfun.model.NeedCategory;
import gameforfun.model.Region;
import gameforfun.repository.NeedsCategoryRepository;
import gameforfun.repository.NeedsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class NeedServiceImpl implements NeedService {
  private final NeedsRepository needsRepository;
  private final ModelMapper modelMapper;
  private final NeedsCategoryRepository needsCategoryRepository;

  @Override
  public NeedResponse getNeedById(Long id) {
    Need need = needsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Need", "id", id));
    return modelMapper.map(need, NeedResponse.class);
  }

  @Override
  public Page<NeedResponse> getNeedsByParams(Pageable pageable, String[] categories, String[] regions) {
    Set<String> categoriesNamesSet = Set.of(categories);
    Set<String> regionsSet = Set.of(regions);
    List<Region> neededRegionsSet = Stream.of(Region.values())
        .filter(value -> regionsSet.contains(value)).collect(Collectors.toList());
    List<NeedCategory> allCategories = needsCategoryRepository.findAll();
    List<NeedCategory> categoriesForSearch = allCategories.stream()
        .filter(category -> categoriesNamesSet.contains(categories))
        .collect(Collectors.toList());
    Page<Need> needs = needsRepository
        .findAllByCategoriesInAndRegionInOrderByCreatedDate(categoriesForSearch, neededRegionsSet, pageable);
    return needs.map(need -> modelMapper.map(need, NeedResponse.class));
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
}
