package gameforfun.repository;

import gameforfun.model.Need;
import gameforfun.model.NeedCategory;
import gameforfun.model.Region;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NeedsRepository extends JpaRepository<Need, Long> {
  Page<Need> findAllByCategoriesInAndRegionInOrderByCreatedDate(List<NeedCategory> categories, List<Region> regions, Pageable pageable);
}
