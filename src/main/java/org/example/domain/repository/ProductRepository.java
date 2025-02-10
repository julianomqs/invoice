package org.example.domain.repository;

import org.example.domain.entity.Product;
import org.example.domain.useCase.product.ProductFilter;
import org.example.domain.useCase.product.ProductSort;
import org.example.util.Page;

public interface ProductRepository {

  public Product save(Product product);

  public void remove(Product product);

  public Product findById(Integer id);

  public Product find(ProductFilter filter);

  public Page<Product> findAll(int offset, int limit, ProductFilter filter, ProductSort sort);
}
