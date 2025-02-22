package org.example.domain.useCase.invoice;

import java.util.LinkedHashSet;

import org.example.application.mapper.InvoiceMapper;
import org.example.domain.entity.Invoice;
import org.example.domain.repository.InvoiceRepository;
import org.example.domain.useCase.client.FindByIdClientUseCase;
import org.example.domain.useCase.product.FindByIdProductUseCase;
import org.example.exceptionmapper.BusinessException;
import org.example.util.NumberOperators;
import org.example.util.StringOperators;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class SaveInvoiceUseCase {

  @Inject
  private InvoiceRepository repository;
  @Inject
  private InvoiceMapper mapper;
  @Inject
  private FindByIdInvoiceUseCase findByIdInvoiceUseCase;
  @Inject
  private FindByIdClientUseCase findByIdClientUseCase;
  @Inject
  private FindByIdProductUseCase findByIdProductUseCase;

  @Transactional
  public Invoice execute(Invoice invoice) {
    validateExistingNumber(invoice);
    validateDuplicateProducts(invoice);

    if (invoice.getId() != null) {
      var invoiceDB = findByIdInvoiceUseCase.execute(invoice.getId());
      invoice = mapper.updateInvoice(invoice, invoiceDB);
    }

    invoice.setClient(findByIdClientUseCase.execute(invoice.getClient().getId()));
    invoice.getItems().forEach(item -> item.setProduct(findByIdProductUseCase.execute(item.getProduct().getId())));

    return repository.save(invoice);
  }

  private void validateExistingNumber(Invoice invoice) {
    if (invoice.getNumber() != null) {
      var filterBuilder = InvoiceFilter.builder()
          .number(StringOperators.builder()
              .eq(invoice.getNumber())
              .build());

      if (invoice.getId() != null) {
        filterBuilder = filterBuilder.id(NumberOperators.builder()
            .ne(invoice.getId())
            .build());
      }

      var filter = filterBuilder.build();

      if (repository.find(filter).isPresent()) {
        throw new BusinessException("Já existe uma nota fiscal com o número informado.");
      }
    }
  }

  private void validateDuplicateProducts(Invoice invoice) {
    var productIds = new LinkedHashSet<>();

    invoice.getItems().forEach(item -> {
      if (!productIds.add(item.getProduct().getId())) {
        throw new BusinessException("A invoice contém itens com produtos repetidos.");
      }
    });
  }
}
