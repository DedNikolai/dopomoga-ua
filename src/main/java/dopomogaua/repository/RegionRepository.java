package dopomogaua.repository;

import dopomogaua.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
  Region findByIdAndNeeds_EmptyAndProposals_Empty(Long id);
}
