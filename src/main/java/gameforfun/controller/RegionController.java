package gameforfun.controller;

import gameforfun.dto.response.RegionResponse;
import gameforfun.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/regions")
@RequiredArgsConstructor
public class RegionController {
    private final RegionService regionService;

    @GetMapping
    public ResponseEntity<List<RegionResponse>> getAllCategories() {
        List<RegionResponse> regions = regionService.getAllRegions();
        return ResponseEntity.ok(regions);
    }
}
