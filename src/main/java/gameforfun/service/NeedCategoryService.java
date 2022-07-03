package gameforfun.service;

import gameforfun.dto.response.NeedCategoryResponse;

import java.util.Set;

public interface NeedCategoryService {
    Set<NeedCategoryResponse> getAllCategories();
}
