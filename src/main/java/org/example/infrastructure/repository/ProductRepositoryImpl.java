package org.example.infrastructure.repository;

import static org.example.jooq.Tables.PRODUCT;

import java.util.Map;

import org.example.application.mapper.ProductMapper;
import org.example.domain.entity.Product;
import org.example.domain.repository.ProductRepository;
import org.example.domain.useCase.product.ProductFilter;
import org.example.domain.useCase.product.ProductSort;
import org.example.infrastructure.entity.ProductEntity;
import org.example.util.NumberOperators;
import org.example.util.Page;
import org.jooq.DSLContext;
import org.jooq.Field;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class ProductRepositoryImpl implements ProductRepository {

  @Inject
  private BaseRepository<ProductEntity> repository;
  @Inject
  private DSLContext db;
  @Inject
  private ProductMapper mapper;
  @Inject
  private EntityManager entityManager;

  public Product save(Product product) {
    var entity = mapper.toProductEntity(product);

    if (product.getId() != null) {
      var entityVersion = entityManager.getReference(ProductEntity.class, product.getId()).getVersion();
      entity.setVersion(entityVersion);
    }

    return mapper.toProduct(repository.save(entity));
  }

  public void remove(Product product) {
    repository.remove(mapper.toProductEntity(product));
  }

  public Product findById(Integer id) {
    return find(ProductFilter.builder()
        .id(NumberOperators.builder()
            .eq(id)
            .build())
        .build());
  }

  public Product find(ProductFilter filter) {
    var where = repository.buildWhere(filter, getFiltersMap());

    return db.selectFrom(PRODUCT)
        .where(where)
        .fetchOne(r -> new Product(r.get(PRODUCT.ID), r.get(PRODUCT.NAME)));
  }

  public Page<Product> findAll(int offset, int limit, ProductFilter filter, ProductSort sort) {
    var where = repository.buildWhere(filter, getFiltersMap());
    var orderBy = repository.buildSort(sort, getSortsMap());

    var products = db.selectFrom(PRODUCT)
        .where(where)
        .orderBy(orderBy)
        .offset(offset)
        .limit(limit)
        .fetch(
            r -> new Product(r.get(PRODUCT.ID), r.get(PRODUCT.NAME)));

    var total = db.selectCount()
        .from(PRODUCT)
        .where(where)
        .fetchOneInto(Integer.class);

    return new Page<>(products, total);
  }

  private Map<String, Field<?>> getFiltersMap() {
    return Map.of(
        "id", PRODUCT.ID,
        "name", PRODUCT.NAME);
  }

  private Map<String, Field<?>> getSortsMap() {
    return Map.of(
        "id", PRODUCT.ID,
        "name", PRODUCT.NAME);
  }
}
