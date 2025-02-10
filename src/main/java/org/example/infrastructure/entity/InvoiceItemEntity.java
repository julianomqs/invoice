package org.example.infrastructure.entity;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.Version;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "invoice_item")
@Data
@EqualsAndHashCode(of = { "id", "tempId" })
@NoArgsConstructor
public class InvoiceItemEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Version
  private Integer version;
  private BigDecimal quantity;
  @Column(name = "unit_value")
  private BigDecimal unitValue;
  @ManyToOne(fetch = FetchType.LAZY)
  private ProductEntity product;
  @ManyToOne(fetch = FetchType.LAZY)
  private InvoiceEntity invoice;

  @Transient
  private UUID tempId = UUID.randomUUID();

  public InvoiceItemEntity(Integer id, Integer version, BigDecimal quantity, BigDecimal unitValue,
      ProductEntity product, InvoiceEntity invoice) {
    this.id = id;
    this.version = version;
    this.quantity = quantity;
    this.unitValue = unitValue;
    this.product = product;
    this.invoice = invoice;
  }
}
