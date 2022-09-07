package dopomogaua.repository;

import dopomogaua.model.Category;
import dopomogaua.model.Proposal;
import dopomogaua.model.Region;
import dopomogaua.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
  Page<Proposal> findDistinctByCategoriesInAndRegionInAndIsActiveTrueOrderByCreatedDate(List<Category> categories, List<Region> regions, Pageable pageable);

  Page<Proposal> findAllByUser(User user, Pageable pageable);
}
