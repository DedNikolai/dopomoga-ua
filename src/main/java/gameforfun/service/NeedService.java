package gameforfun.service;

import gameforfun.dto.request.NeedRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.NeedResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NeedService {
  NeedResponse getNeedById(Long id);

  Page<NeedResponse> getNeedsByParams(Pageable pageable, String[] categories, String[] regions);

  ApiResponse createNeed(NeedRequest needRequest);

  ApiResponse updateNeed(NeedRequest needRequest, Long id);

  ApiResponse deleteNeed(Long id);

  Page<NeedResponse> getNeedsByCurrentUser(Pageable pageable);
}
