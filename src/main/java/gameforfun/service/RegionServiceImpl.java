package gameforfun.service;

import gameforfun.dto.request.RegionRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.RegionResponse;
import gameforfun.exeption.ResourceNotFoundException;
import gameforfun.model.Region;
import gameforfun.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegionServiceImpl implements RegionService {
    private final RegionRepository regionRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<RegionResponse> getAllRegions(Pageable pageable) {
        Page<Region> regions = regionRepository.findAll(pageable);
        return regions.map(region -> modelMapper.map(region, RegionResponse.class));
    }

    @Override
    public ApiResponse updateRgion(Long id, RegionRequest request) {
        Region regionFromDb = regionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Region", "id", id));
        Region region = modelMapper.map(request, Region.class);
        region.setId(regionFromDb.getId());
        regionRepository.save(region);
        return new ApiResponse(true, "Регіог Оновлено");
    }

    @Override
    public ApiResponse deleteRegion(Long id) {
        Region region = regionRepository.findByIdAndNeeds_EmptyAndProposals_Empty(id);
        if (region == null) {
            return new  ApiResponse(false, "Регіон не можна видалити є звязані єлементи");
        }

        regionRepository.delete(region);
        return new ApiResponse(true, "Решіон видилено");
    }

    @Override
    public ApiResponse createRegion(RegionRequest request) {
        Region region = modelMapper.map(request, Region.class);
        Region createdRegion = regionRepository.save(region);
        if (createdRegion.getId() != null) {
            return new ApiResponse(true, "Регіон створено");
        }
        return new ApiResponse(false, "Регіон не створено");
    }
}
