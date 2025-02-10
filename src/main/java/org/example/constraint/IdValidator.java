package org.example.constraint;

import org.jooq.DSLContext;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Collection;

public class IdValidator implements ConstraintValidator<Id, Object> {

  @Inject
  private DSLContext dsl;

  private Id.Table table;

  @Override
  public void initialize(Id constraintAnnotation) {
    this.table = constraintAnnotation.value();
  }

  @Override
  public boolean isValid(Object value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    boolean isValid;

    if (value instanceof Integer) {
      isValid = isValidId((Integer) value);

      if (!isValid) {
        setValidationMessage(context, (Integer) value);
      }
    } else if (value instanceof Collection) {
      isValid = isValidCollection((Collection<?>) value, context);
    } else {
      isValid = false;
    }

    return isValid;
  }

  private boolean isValidId(Integer value) {
    return dsl.fetchExists(dsl.selectOne().from(table.getName()).where("id = ?", value));
  }

  private boolean isValidCollection(Collection<?> collection, ConstraintValidatorContext context) {
    for (Object item : collection) {
      if (!(item instanceof Integer) || !isValidId((Integer) item)) {
        setValidationMessage(context, (Integer) item);
        return false;
      }
    }

    return true;
  }

  private void setValidationMessage(ConstraintValidatorContext context, Integer value) {
    context.disableDefaultConstraintViolation();
    context.buildConstraintViolationWithTemplate("Registro " + value + " inexistente")
        .addConstraintViolation();
  }
}
