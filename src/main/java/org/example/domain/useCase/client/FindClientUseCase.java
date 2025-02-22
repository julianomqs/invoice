package org.example.domain.useCase.client;

import org.example.domain.EntityNotFoundException;
import org.example.domain.entity.Client;
import org.example.domain.repository.ClientRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class FindClientUseCase {

  @Inject
  private ClientRepository repository;

  public Client execute(ClientFilter filter) {
    return repository.find(filter)
        .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
  }
}
