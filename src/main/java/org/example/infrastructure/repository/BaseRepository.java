package org.example.infrastructure.repository;

import static org.jooq.impl.DSL.noCondition;
import static org.jooq.impl.DSL.not;
import static org.jooq.impl.DSL.trueCondition;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;

import org.example.util.NumberOperators;
import org.example.util.SortOrder;
import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.SortField;

import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Id;

@Dependent
public class BaseRepository<T> {

  @Inject
  private EntityManager entityManager;

  public T save(T entity) {
    if (hasId(entity)) {
      entity = entityManager.merge(entity);
    } else {
      entityManager.persist(entity);
    }

    entityManager.flush();

    return entity;
  }

  public void remove(T entity) {
    if (entityManager.contains(entity)) {
      entityManager.remove(entity);
    } else {
      entityManager.remove(entityManager.merge(entity));
    }

    entityManager.flush();
  }

  public Condition buildWhere(Object filter, Map<String, Field<?>> fields) {
    if (filter == null) {
      return noCondition();
    }

    Objects.requireNonNull(fields, "fields é obrigatório");

    Condition condition = trueCondition();

    for (var field : filter.getClass().getDeclaredFields()) {
      field.setAccessible(true);

      try {
        var operatorObject = field.get(filter);

        if (operatorObject != null) {
          condition = condition.and(processOperator(field.getName(), operatorObject, fields));
        }
      } catch (IllegalAccessException e) {
        throw new RuntimeException("Error accessing filter field", e);
      }
    }

    return condition;
  }

  public SortField<?>[] buildSort(Object sort, Map<String, Field<?>> fields) {
    if (sort == null) {
      return new SortField[] {};
    }

    Objects.requireNonNull(fields, "fields é obrigatório");

    return Arrays.stream(sort.getClass().getDeclaredFields())
        .map(field -> {
          field.setAccessible(true);

          try {
            var sortOrder = (SortOrder) field.get(sort);

            if (sortOrder != null) {
              @SuppressWarnings("unchecked")
              var dbField = (Field<Object>) fields.get(field.getName());

              if (dbField == null) {
                throw new IllegalArgumentException("Field não encontrado: " + field.getName());
              }

              return sortOrder == SortOrder.ASC ? dbField.asc() : dbField.desc();
            }
          } catch (IllegalAccessException e) {
            throw new RuntimeException("Error accessing sort field", e);
          }

          return null;
        })
        .filter(Objects::nonNull)
        .toArray(SortField<?>[]::new);
  }

  private boolean hasId(T entity) {
    for (var field : entity.getClass().getDeclaredFields()) {
      if (field.isAnnotationPresent(Id.class)) {
        field.setAccessible(true);

        try {
          if (field.get(entity) != null) {
            return true;
          }
        } catch (IllegalAccessException ex) {
          throw new RuntimeException(ex);
        }
      }
    }

    return false;
  }

  private Condition processOperator(String fieldName, Object operators, Map<String, Field<?>> fields) {
    Condition condition = trueCondition();

    for (var operatorField : operators.getClass().getDeclaredFields()) {
      operatorField.setAccessible(true);

      try {
        var value = operatorField.get(operators);

        if (value != null) {
          var operatorName = operatorField.getName();
          condition = condition.and(buildConditionForOperator(fieldName, operatorName, value, fields));
        }
      } catch (IllegalAccessException e) {
        throw new RuntimeException("Error accessing operator field", e);
      }
    }

    return condition;
  }

  private Condition buildConditionForOperator(String fieldName, String operator, Object value,
      Map<String, Field<?>> fields) {
    @SuppressWarnings("unchecked")
    var dbField = (Field<Object>) fields.get(fieldName);

    if (dbField == null) {
      throw new IllegalArgumentException("Field não encontrado: " + fieldName);
    }

    switch (operator) {
    case "eq":
      return dbField.eq(value);
    case "ne":
      return dbField.ne(value);
    case "gt":
      return dbField.gt(value);
    case "ge":
      return dbField.ge(value);
    case "lt":
      return dbField.lt(value);
    case "le":
      return dbField.le(value);
    case "between":
      var range = (NumberOperators.NumberRange) value;
      return dbField.between(range.getStart(), range.getEnd());
    case "notBetween":
      range = (NumberOperators.NumberRange) value;
      return dbField.notBetween(range.getStart(), range.getEnd());
    case "in":
      return dbField.in((Collection<?>) value);
    case "notIn":
      return dbField.notIn((Collection<?>) value);
    case "startsWith":
      return dbField.startsWith(value);
    case "notStartsWith":
      return not(dbField.startsWith(value));
    case "endsWith":
      return dbField.endsWith(value);
    case "notEndsWith":
      return not(dbField.endsWith(value));
    case "contains":
      return dbField.contains(value);
    case "notContains":
      return dbField.notContains(value);
    default:
      throw new UnsupportedOperationException("Unsupported operator: " + operator);
    }
  }
}
