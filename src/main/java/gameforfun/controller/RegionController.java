package gameforfun.controller;

import gameforfun.dto.request.RegionRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.RegionResponse;
import gameforfun.service.RegionService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/regions")
@RequiredArgsConstructor
public class RegionController {
    private final RegionService regionService;

    @GetMapping
    public ResponseEntity<Page<RegionResponse>> getAllCategories(@PageableDefault Pageable pageable) {
        Page<RegionResponse> regions = regionService.getAllRegions(pageable);
        return ResponseEntity.ok(regions);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> updateRegion(@PathVariable Long id, @RequestBody RegionRequest request) {
        ApiResponse response = regionService.updateRgion(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> deleteRegion(@PathVariable Long id) {
        ApiResponse response = regionService.deleteRegion(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> createCategory(@RequestBody RegionRequest request) {
        ApiResponse response = regionService.createRegion(request);
        return ResponseEntity.ok(response);
    }
}
