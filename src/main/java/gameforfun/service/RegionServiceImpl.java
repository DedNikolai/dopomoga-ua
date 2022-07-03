package gameforfun.service;

import gameforfun.dto.response.RegionResponse;
import gameforfun.model.Region;
import gameforfun.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegionServiceImpl implements RegionService {
    private final RegionRepository regionRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<RegionResponse> getAllRegions() {
        List<Region> regions = regionRepository.findAll();
        return regions.stream().map(region -> modelMapper.map(region, RegionResponse.class)).collect(Collectors.toList());
    }
}
