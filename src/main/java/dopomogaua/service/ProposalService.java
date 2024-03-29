package dopomogaua.service;

import dopomogaua.dto.request.ProposalRequest;
import dopomogaua.dto.response.ApiResponse;
import dopomogaua.dto.response.ProposalResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProposalService {
  ProposalResponse getProposalById(Long id);

  Page<ProposalResponse> getPropositionsByParams(Pageable pageable, String[] categories, String[] regions);

  ApiResponse createProposal(ProposalRequest proposalRequest);

  ApiResponse updateProposal(ProposalRequest proposalRequest, Long id);

  ApiResponse deleteProposal(Long id);

  Page<ProposalResponse> getProposalsByCurrentUser(Pageable pageable);

  Page<ProposalResponse> findUserProposals(Long userId, Pageable pageable);
}
