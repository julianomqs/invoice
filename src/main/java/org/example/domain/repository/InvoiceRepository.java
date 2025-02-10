package org.example.domain.repository;

import org.example.domain.entity.Invoice;
import org.example.domain.useCase.invoice.InvoiceFilter;
import org.example.domain.useCase.invoice.InvoiceSort;
import org.example.util.Page;

public interface InvoiceRepository {

  public Invoice save(Invoice invoice);

  public void remove(Invoice invoice);

  public Invoice findById(Integer id);

  public Invoice find(InvoiceFilter filter);

  public Page<Invoice> findAll(int offset, int limit, InvoiceFilter filter, InvoiceSort sort);
}
