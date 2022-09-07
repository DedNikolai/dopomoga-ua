package dopomogaua.repository;

import dopomogaua.model.Need;
import dopomogaua.model.Category;
import dopomogaua.model.Region;
import dopomogaua.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NeedsRepository extends JpaRepository<Need, Long> {
  Page<Need> findDistinctByCategoriesInAndRegionInAndIsActiveTrueOrderByCreatedDate(List<Category> categories, List<Region> regions, Pageable pageable);

  Page<Need> findAllByUser(User user, Pageable pageable);
}
