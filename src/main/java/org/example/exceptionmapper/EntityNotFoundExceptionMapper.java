package org.example.exceptionmapper;

import org.example.domain.EntityNotFoundException;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class EntityNotFoundExceptionMapper implements ExceptionMapper<EntityNotFoundException> {

  @Override
  public Response toResponse(EntityNotFoundException exception) {
    return Response.status(Response.Status.BAD_REQUEST)
        .entity(new ErrorMessage(exception.getMessage()))
        .build();
  }
}