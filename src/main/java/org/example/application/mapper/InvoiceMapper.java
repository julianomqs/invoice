package org.example.application.mapper;

import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

import java.util.LinkedHashSet;
import java.util.stream.Collectors;

import org.example.application.controller.InvoiceController.CreateInvoiceDto;
import org.example.application.controller.InvoiceController.CreateInvoiceItemDto;
import org.example.application.controller.InvoiceController.FindAllInvoiceDto;
import org.example.application.controller.InvoiceController.FindOneInvoiceDto;
import org.example.application.controller.InvoiceController.InvoiceItemDto;
import org.example.application.controller.InvoiceController.PatchInvoiceDto;
import org.example.application.controller.InvoiceController.PatchInvoiceItemDto;
import org.example.application.controller.InvoiceController.UpdateInvoiceDto;
import org.example.application.controller.InvoiceController.UpdateInvoiceItemDto;
import org.example.domain.entity.Invoice;
import org.example.domain.entity.InvoiceItem;
import org.example.infrastructure.entity.InvoiceEntity;
import org.example.infrastructure.entity.InvoiceItemEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import jakarta.inject.Inject;

@Mapper(uses = { ClientMapper.class, ProductMapper.class })
public abstract class InvoiceMapper {

  @Inject
  private ClientMapper clientMapper;

  public abstract Invoice toInvoice(CreateInvoiceDto dto);

  public abstract Invoice toInvoice(InvoiceEntity entity);

  public InvoiceEntity toInvoiceEntity(Invoice invoice) {
    InvoiceEntity entity = new InvoiceEntity();

    entity.setId(invoice.getId());
    entity.setVersion(invoice.getVersion());
    entity.setNumber(invoice.getNumber());
    entity.setDateTime(invoice.getDateTime());
    entity.setClient(clientMapper.toClientEntity(invoice.getClient()));

    if (invoice.getItems() != null) {
      entity.setItems(invoice.getItems()
          .stream()
          .map(i -> {
            var item = toInvoiceItemEntity(i);
            item.setInvoice(entity);
            return item;
          })
          .collect(Collectors.toCollection(LinkedHashSet::new)));
    }

    return entity;
  }

  public Invoice updateInvoice(UpdateInvoiceDto dto, Invoice invoice) {
    invoice.setNumber(dto.number());
    invoice.setDateTime(dto.dateTime());
    invoice.setClient(clientMapper.fromId(dto.client()));

    if (dto.items() != null) {
      if (dto.items().create() != null) {
        for (var item : dto.items().create()) {
          invoice.getItems().add(toInvoiceItem(item));
        }
      }

      if (dto.items().update() != null) {
        for (var item : dto.items().update()) {
          var invoiceItem = invoice.getItems()
              .stream()
              .filter(i -> i.getId().equals(item.id()))
              .findFirst()
              .get();

          updateInvoiceItem(item, invoiceItem);
        }
      }

      if (dto.items().remove() != null) {
        for (var item : dto.items().remove()) {
          var invoiceItem = invoice.getItems()
              .stream()
              .filter(i -> i.getId().equals(item))
              .findFirst()
              .get();

          invoice.getItems().remove(invoiceItem);
        }
      }
    }

    return invoice;
  }

  public abstract Invoice updateInvoice(Invoice invoice, @MappingTarget Invoice invoiceToUpdate);

  public Invoice patchInvoice(PatchInvoiceDto dto, Invoice invoice) {
    if (dto.number() != null) {
      invoice.setNumber(dto.number());
    }

    if (dto.dateTime() != null) {
      invoice.setDateTime(dto.dateTime());
    }

    if (dto.client() != null) {
      invoice.setClient(clientMapper.fromId(dto.client()));
    }

    if (dto.items() != null) {
      if (dto.items().create() != null) {
        for (var item : dto.items().create()) {
          invoice.getItems().add(toInvoiceItem(item));
        }
      }

      if (dto.items().update() != null) {
        for (var item : dto.items().update()) {
          var invoiceItem = invoice.getItems()
              .stream()
              .filter(i -> i.getId().equals(item.id()))
              .findFirst()
              .get();

          patchInvoiceItem(item, invoiceItem);
        }
      }

      if (dto.items().remove() != null) {
        for (var item : dto.items().remove()) {
          var invoiceItem = invoice.getItems()
              .stream()
              .filter(i -> i.getId().equals(item))
              .findFirst()
              .get();

          invoice.getItems().remove(invoiceItem);
        }
      }
    }

    return invoice;
  }

  public abstract FindOneInvoiceDto toFindOneInvoiceDto(Invoice invoice);

  public abstract FindAllInvoiceDto toFindAllInvoiceDto(Invoice invoice);

  public abstract InvoiceItem toInvoiceItem(CreateInvoiceItemDto dto);

  public abstract InvoiceItem updateInvoiceItem(UpdateInvoiceItemDto dto, @MappingTarget InvoiceItem item);

  @Mapping(target = "id", nullValuePropertyMappingStrategy = IGNORE)
  @Mapping(target = "quantity", nullValuePropertyMappingStrategy = IGNORE)
  @Mapping(target = "unitValue", nullValuePropertyMappingStrategy = IGNORE)
  @Mapping(target = "product", nullValuePropertyMappingStrategy = IGNORE)
  public abstract InvoiceItem patchInvoiceItem(PatchInvoiceItemDto dto, @MappingTarget InvoiceItem item);

  public abstract InvoiceItemDto toInvoiceItemDto(InvoiceItem item);

  public abstract InvoiceItemEntity toInvoiceItemEntity(InvoiceItem item);
}
