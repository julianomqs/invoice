package org.example.domain.useCase.invoice;

import org.example.domain.entity.Invoice;
import org.example.domain.repository.InvoiceRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class FindInvoiceUseCase {

  @Inject
  private InvoiceRepository repository;

  public Invoice execute(InvoiceFilter filter) {
    return repository.find(filter);
  }
}
