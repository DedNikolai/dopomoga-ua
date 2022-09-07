package dopomogaua.service;

import dopomogaua.dto.request.RegionRequest;
import dopomogaua.dto.response.ApiResponse;
import dopomogaua.dto.response.RegionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RegionService {
   Page<RegionResponse> getAllRegions(Pageable pageable);

  ApiResponse updateRgion(Long id, RegionRequest request);

  ApiResponse deleteRegion(Long id);

  ApiResponse createRegion(RegionRequest request);
}
