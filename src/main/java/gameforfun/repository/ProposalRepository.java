package gameforfun.repository;

import gameforfun.model.Category;
import gameforfun.model.Proposal;
import gameforfun.model.Region;
import gameforfun.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {
  Page<Proposal> findDistinctByCategoriesInAndRegionInAndIsActiveTrueOrderByCreatedDate(List<Category> categories, List<Region> regions, Pageable pageable);

  Page<Proposal> findAllByUser(User user, Pageable pageable);
}
