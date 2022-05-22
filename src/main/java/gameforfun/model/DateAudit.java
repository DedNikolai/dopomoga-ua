package gameforfun.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import javax.persistence.*;
import java.util.Date;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class DateAudit {
  @CreatedDate
  @Column(name = "date_created")
  @Temporal(TemporalType.DATE)
  private Date createdDate;

  @LastModifiedDate
  @Column(name = "date_modified")
  @Temporal(TemporalType.DATE)
  private Date modifiedDate;
}