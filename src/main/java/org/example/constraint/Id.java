package org.example.constraint;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = IdValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface Id {

  String message() default "Registro inexistente";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  Table value();

  enum Table {
    PRODUCT("product"),
    INVOICE("invoice"),
    INVOICE_ITEM("invoice_item"),
    CLIENT("client");

    private final String name;

    Table(String name) {
      this.name = name;
    }

    public String getName() {
      return name;
    }
  }
}
