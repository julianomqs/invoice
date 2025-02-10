package org.example.domain.useCase.client;

import org.example.util.SortOrder;

import lombok.Builder;

@Builder
public record ClientSort(SortOrder id, SortOrder name) {
}
