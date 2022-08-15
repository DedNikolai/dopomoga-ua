package gameforfun.service;

import gameforfun.dto.request.ProposalRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.ProposalResponse;
import gameforfun.exeption.ResourceNotFoundException;
import gameforfun.model.Category;
import gameforfun.model.Proposal;
import gameforfun.model.Region;
import gameforfun.model.User;
import gameforfun.repository.CategoryRepository;
import gameforfun.repository.ProposalRepository;
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
public class ProposalServiceImpl implements ProposalService {
  private final ProposalRepository proposalRepository;
  private final ModelMapper modelMapper;
  private final CategoryRepository categoryRepository;
  private final RegionRepository regionRepository;
  private final UserRepository userRepository;

  @Override
  public ProposalResponse getProposalById(Long id) {
    Proposal proposal = proposalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proposal", "id", id));
    return modelMapper.map(proposal, ProposalResponse.class);
  }

  @Override
  public Page<ProposalResponse> getPropositionsByParams(Pageable pageable, String[] categories, String[] regions) {

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

    Page<Proposal> proposals = proposalRepository
        .findDistinctByCategoriesInAndRegionInAndIsActiveTrueOrderByCreatedDate(categoriesForSearch, neededRegionsSet, pageable);
    Page<ProposalResponse> proposalsByParams = proposals.map(need -> modelMapper.map(need, ProposalResponse.class));
    return proposalsByParams;
  }

  @Override
  public ApiResponse createProposal(ProposalRequest proposalRequest) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElse(null);
    Proposal proposal = modelMapper.map(proposalRequest, Proposal.class);
    proposal.setUser(user);
    proposal.setIsActive(true);
    proposalRepository.save(proposal);
    return new ApiResponse(true, "Proposal was created");
  }

  @Override
  public ApiResponse updateProposal(ProposalRequest proposalRequest, Long id) {
    Proposal proposal = modelMapper.map(proposalRequest, Proposal.class);
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElse(null);

    if (user.getId() == proposal.getUser().getId()) {
      Proposal proposalFromDb = proposalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proposal", "id", id));
      proposal.setId(proposalFromDb.getId());
      proposal.setUser(user);
      proposalRepository.save(proposal);
      return new ApiResponse(true, "Proposal was updated");
    }

    return new ApiResponse(false, "It's not current user proposal");

  }

  @Override
  public ApiResponse deleteProposal(Long id) {
    Proposal proposalFromDB = proposalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proposal", "id", id));
    proposalRepository.delete(proposalFromDB);
    return new ApiResponse(true, "Proposal was deleted");
  }

  @Override
  public Page<ProposalResponse> getProposalsByCurrentUser(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElse(null);
    Page<Proposal> proposals = proposalRepository.findAllByUser(user, pageable);
    return proposals.map(proposal -> modelMapper.map(proposal, ProposalResponse.class));
  }
}
