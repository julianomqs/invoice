package org.example.exceptionmapper;

import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

  public static record ViolationResponse(String path, String message) {
  }

  @Override
  public Response toResponse(ConstraintViolationException exception) {
    var violations = exception.getConstraintViolations().stream().toList();

    if (violations.size() == 1 && "Registro inexistente".equals(violations.get(0).getMessage())) {
      return Response.status(Response.Status.NOT_FOUND)
          .entity(new ErrorMessage("Registro inexistente"))
          .build();
    }

    var violationResponses = violations.stream()
        .map(violation -> new ViolationResponse(violation.getPropertyPath().toString(), violation.getMessage()))
        .toList();

    return Response.status(Response.Status.BAD_REQUEST)
        .entity(violationResponses)
        .build();
  }
}
