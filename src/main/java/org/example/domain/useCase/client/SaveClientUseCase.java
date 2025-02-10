package org.example.domain.useCase.client;

import org.example.domain.entity.Client;
import org.example.domain.repository.ClientRepository;
import org.example.exceptionmapper.BusinessException;
import org.example.util.NumberOperators;
import org.example.util.StringOperators;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class SaveClientUseCase {

  @Inject
  private ClientRepository repository;

  @Transactional
  public Client execute(Client client) {
    validateExistingName(client);
    return repository.save(client);
  }

  private void validateExistingName(Client client) {
    if (client.getName() != null) {
      var filterBuilder = ClientFilter.builder()
          .name(StringOperators.builder()
              .eq(client.getName())
              .build());

      if (client.getId() != null) {
        filterBuilder = filterBuilder.id(NumberOperators.builder()
            .ne(client.getId())
            .build());
      }

      var filter = filterBuilder.build();

      if (repository.find(filter) != null) {
        throw new BusinessException("Já existe um cliente com o nome informado.");
      }
    }
  }
}
