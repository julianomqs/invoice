package org.example.exceptionmapper;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ExceptionExceptionMapper implements ExceptionMapper<Exception> {

  @Override
  public Response toResponse(Exception exception) {
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
        .entity(new ErrorMessage(exception.getMessage()))
        .build();
  }
}