package gameforfun.repository;

import gameforfun.model.Need;
import gameforfun.model.Category;
import gameforfun.model.Region;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NeedsRepository extends JpaRepository<Need, Long> {
  Page<Need> findDistinctByCategoriesInAndRegionInAndIsActiveTrueOrderByCreatedDate(List<Category> categories, List<Region> regions, Pageable pageable);
}
