package gameforfun.controller;

import gameforfun.dto.request.ProposalRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.ProposalResponse;
import gameforfun.service.ProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/propositions")
@RequiredArgsConstructor
public class ProposalController {
  private final ProposalService proposalService;

  @GetMapping("{id}")
  public ResponseEntity<ProposalResponse> getProposalById(@PathVariable Long id) {
    ProposalResponse response = proposalService.getProposalById(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("current")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<Page<ProposalResponse>> getNeedsByCurrentUser(@PageableDefault Pageable pageable) {
    Page<ProposalResponse> proposals = proposalService.getProposalsByCurrentUser(pageable);
    return ResponseEntity.ok(proposals);
  }

  @GetMapping
  public ResponseEntity<Page<ProposalResponse>> getProposalByParams(
      @RequestParam(value = "categories") String[] categories,
      @RequestParam(value = "regions") String[] regions,
      @PageableDefault Pageable pageable) {
    Page<ProposalResponse> response = proposalService.getPropositionsByParams(pageable, categories, regions);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<ApiResponse> createProposal(@RequestBody ProposalRequest proposalRequest) {
    ApiResponse response = proposalService.createProposal(proposalRequest);
    return ResponseEntity.ok(response);
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<ApiResponse> updateProposal(@RequestBody ProposalRequest proposalRequest, @PathVariable Long id) {
    ApiResponse response = proposalService.updateProposal(proposalRequest, id);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<ApiResponse> deleteProposal(@PathVariable Long id) {
    ApiResponse response = proposalService.deleteProposal(id);
    return ResponseEntity.ok(response);
  }
}
