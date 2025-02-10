package org.example.domain.useCase.product;

import org.example.util.SortOrder;

import lombok.Builder;

@Builder
public record ProductSort(SortOrder id, SortOrder name) {
}
