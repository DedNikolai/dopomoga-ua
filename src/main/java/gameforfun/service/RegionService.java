package gameforfun.service;

import gameforfun.dto.request.RegionRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.RegionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RegionService {
   Page<RegionResponse> getAllRegions(Pageable pageable);

  ApiResponse updateRgion(Long id, RegionRequest request);

  ApiResponse deleteRegion(Long id);

  ApiResponse createRegion(RegionRequest request);
}
