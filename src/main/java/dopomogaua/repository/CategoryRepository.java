package dopomogaua.repository;

import dopomogaua.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  Category findFirstByIdAndNeeds_EmptyAndProposals_Empty(Long id);
}
