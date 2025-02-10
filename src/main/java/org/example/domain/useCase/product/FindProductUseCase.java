package org.example.domain.useCase.product;

import org.example.domain.entity.Product;
import org.example.domain.repository.ProductRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class FindProductUseCase {

  @Inject
  private ProductRepository repository;

  public Product execute(ProductFilter filter) {
    return repository.find(filter);
  }
}
