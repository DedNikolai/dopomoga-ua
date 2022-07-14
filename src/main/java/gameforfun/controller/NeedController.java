package gameforfun.controller;

import gameforfun.dto.request.NeedRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.NeedResponse;
import gameforfun.service.NeedService;
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
@RequestMapping("api/v1/needs")
@RequiredArgsConstructor
public class NeedController {
  private final NeedService needService;

  @GetMapping("{id}")
  public ResponseEntity<NeedResponse> getNeedById(@PathVariable Long id) {
    NeedResponse response = needService.getNeedById(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  public ResponseEntity<Page<NeedResponse>> getNeedsByParams(
      @RequestParam(value = "categories") String[] categories,
      @RequestParam(value = "regions") String[] regions,
      @PageableDefault Pageable pageable) {
    Page<NeedResponse> response = needService.getNeedsByParams(pageable, categories, regions);
    return ResponseEntity.ok(response);
  }

  @GetMapping("current")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<Page<NeedResponse>> getNeedsByCurrentUser(@PageableDefault Pageable pageable) {
    Page<NeedResponse> needs = needService.getNeedsByCurrentUser(pageable);
    return ResponseEntity.ok(needs);

  }

  @PostMapping
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<ApiResponse> createNeed(@RequestBody NeedRequest needRequest) {
    ApiResponse response = needService.createNeed(needRequest);
    return ResponseEntity.ok(response);
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<ApiResponse> updateNeed(@RequestBody NeedRequest needRequest, @PathVariable Long id) {
    ApiResponse response = needService.updateNeed(needRequest, id);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<ApiResponse> deleteNeed(@PathVariable Long id) {
    ApiResponse response = needService.deleteNeed(id);
    return ResponseEntity.ok(response);
  }
}
