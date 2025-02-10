package org.example.infrastructure.repository;

import static org.example.jooq.Tables.INVOICE;
import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.multiset;
import static org.jooq.impl.DSL.row;
import static org.jooq.impl.DSL.select;

import java.util.Map;

import org.example.application.mapper.InvoiceMapper;
import org.example.domain.entity.Client;
import org.example.domain.entity.Invoice;
import org.example.domain.entity.InvoiceItem;
import org.example.domain.entity.Product;
import org.example.domain.repository.InvoiceRepository;
import org.example.domain.useCase.invoice.InvoiceFilter;
import org.example.domain.useCase.invoice.InvoiceSort;
import org.example.infrastructure.entity.ClientEntity;
import org.example.infrastructure.entity.InvoiceEntity;
import org.example.infrastructure.entity.InvoiceItemEntity;
import org.example.infrastructure.entity.ProductEntity;
import org.example.util.NumberOperators;
import org.example.util.Page;
import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.Records;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class InvoiceRepositoryImpl implements InvoiceRepository {

  @Inject
  private BaseRepository<InvoiceEntity> repository;
  @Inject
  private DSLContext db;
  @Inject
  private InvoiceMapper mapper;
  @Inject
  private EntityManager entityManager;

  public Invoice save(Invoice invoice) {
    var entity = mapper.toInvoiceEntity(invoice);

    if (invoice.getId() != null) {
      var entityVersion = entityManager.getReference(InvoiceEntity.class, invoice.getId()).getVersion();
      entity.setVersion(entityVersion);
    }

    var clientVersion = entityManager.getReference(ClientEntity.class, invoice.getClient().getId()).getVersion();
    entity.getClient().setVersion(clientVersion);

    for (var item : entity.getItems()) {
      if (item.getId() != null) {
        var itemVersion = entityManager.getReference(InvoiceItemEntity.class, item.getId()).getVersion();
        item.setVersion(itemVersion);
      }

      var productVersion = entityManager.getReference(ProductEntity.class, item.getProduct().getId()).getVersion();
      item.getProduct().setVersion(productVersion);
    }

    return mapper.toInvoice(repository.save(entity));
  }

  public void remove(Invoice invoice) {
    repository.remove(mapper.toInvoiceEntity(invoice));
  }

  public Invoice findById(Integer id) {
    return find(InvoiceFilter.builder()
        .id(NumberOperators.builder()
            .eq(id)
            .build())
        .build());
  }

  public Invoice find(InvoiceFilter filter) {
    var client = field(row(
        INVOICE.client().ID,
        INVOICE.client().NAME)
            .mapping(Client::new)
            .as("client"));

    var items = multiset(
        select(
            INVOICE.invoiceItem().ID,
            INVOICE.invoiceItem().QUANTITY,
            INVOICE.invoiceItem().UNIT_VALUE,
            row(
                INVOICE.invoiceItem().product().ID,
                INVOICE.invoiceItem().product().NAME)
                    .mapping(Product::new)
                    .as("product"))
                        .from(INVOICE.invoiceItem()))
                            .as("items")
                            .convertFrom(r -> r.intoSet(Records.mapping(InvoiceItem::new)));

    var where = repository.buildWhere(
        filter,
        getFiltersMap());

    return db.select(
        INVOICE.ID,
        INVOICE.VERSION,
        INVOICE.NUMBER,
        INVOICE.DATE_TIME,
        client,
        items)
        .from(INVOICE)
        .where(where)
        .fetchOne(r -> new Invoice(
            r.get(INVOICE.ID),
            r.get(INVOICE.NUMBER),
            r.get(INVOICE.DATE_TIME),
            r.get(client),
            r.get(items)));
  }

  public Page<Invoice> findAll(int offset, int limit, InvoiceFilter filter, InvoiceSort sort) {
    var where = repository.buildWhere(filter, getFiltersMap());
    var orderBy = repository.buildSort(sort, getSortsMap());

    var client = field(row(
        INVOICE.client().ID,
        INVOICE.client().NAME)
            .mapping(Client::new)
            .as("client"));

    var invoices = db.select(
        INVOICE.ID,
        INVOICE.VERSION,
        INVOICE.NUMBER,
        INVOICE.DATE_TIME,
        client)
        .from(INVOICE)
        .where(where)
        .orderBy(orderBy)
        .offset(offset)
        .limit(limit)
        .fetch(r -> new Invoice(
            r.get(INVOICE.ID),
            r.get(INVOICE.NUMBER),
            r.get(INVOICE.DATE_TIME),
            r.get(client)));

    var total = db.selectCount()
        .from(INVOICE)
        .where(where)
        .fetchOneInto(Integer.class);

    return new Page<>(invoices, total);
  }

  private Map<String, Field<?>> getFiltersMap() {
    return Map.of(
        "id", INVOICE.ID,
        "number", INVOICE.NUMBER,
        "dateTime", INVOICE.DATE_TIME,
        "clientId", INVOICE.client().ID);
  }

  private Map<String, Field<?>> getSortsMap() {
    return Map.of(
        "id", INVOICE.ID,
        "number", INVOICE.NUMBER,
        "dateTime", INVOICE.DATE_TIME,
        "clientId", INVOICE.client().ID);
  }
}
