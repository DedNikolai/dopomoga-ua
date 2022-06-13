package gameforfun.repository;

import gameforfun.model.NeedCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NeedsCategoryRepository extends JpaRepository<NeedCategory, Long> {
}
