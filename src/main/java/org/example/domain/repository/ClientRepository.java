package org.example.domain.repository;

import org.example.domain.entity.Client;
import org.example.domain.useCase.client.ClientFilter;
import org.example.domain.useCase.client.ClientSort;
import org.example.util.Page;

public interface ClientRepository {

  Client save(Client client);

  void remove(Client client);

  Client findById(Integer id);

  Client find(ClientFilter filter);

  Page<Client> findAll(int offset, int limit, ClientFilter filter, ClientSort sort);
}
