/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from "inversify";
import { SortOrder } from "../graphql/schema.js";
import { prisma } from "../prisma.js";

interface FindOneEntity {
  filter: object;
  fields?: string[];
  fetch?: object;
}

interface FindManyEntity {
  filter?: object;
  sort?: object;
  offset?: number;
  limit?: number;
  fields?: string[];
  fetch?: object;
}

export interface IDOperators {
  eq?: number;
  ne?: number;
  in?: number[];
  notIn?: number[];
}

export class StringOperators {
  eq?: string;
  ne?: string;
  startsWith?: string;
  notStartsWith?: string;
  endsWith?: string;
  notEndsWith?: string;
  contains?: string;
  notContains?: string;
  in?: string[];
  notIn?: string[];
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface DateOperators {
  eq?: Date;
  ne?: Date;
  between?: DateRange;
  notBetween?: DateRange;
  gt?: Date;
  ge?: Date;
  lt?: Date;
  le?: Date;
  in?: Date[];
  notIn?: Date[];
}

export interface Page<T> {
  results: T[];
  total: number;
}

@injectable()
export class Repository<
  T,
  FOE extends FindOneEntity = FindOneEntity,
  FME extends FindManyEntity = FindManyEntity
> {
  private entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  async save(entity: T, fields?: string[]): Promise<T> {
    const select = fields ? buildSelect(fields) : undefined;

    const id = (entity as any).id;

    if (id) {
      return (await (prisma as any)[this.entityName].update({
        where: { id },
        data: entity,
        select
      })) as T;
    } else {
      return (await (prisma as any)[this.entityName].create({
        data: entity,
        select
      })) as T;
    }
  }

  async remove(id: number, fields?: string[]): Promise<T> {
    const select = fields ? buildSelect(fields) : undefined;

    return (await (prisma as any)[this.entityName].delete({
      where: { id },
      select
    })) as T;
  }

  async count({ filter }: FOE): Promise<number> {
    const where = buildFilter(filter);

    return await (prisma as any)[this.entityName].count({
      where
    });
  }

  async findOne({ filter, fields, fetch }: FOE): Promise<T | null> {
    const where = buildFilter(filter);
    const select = fields ? buildSelect(fields) : undefined;

    return (await (prisma as any)[this.entityName].findFirst({
      where,
      select,
      include: fetch
    })) as T | null;
  }

  async findMany(
    { filter, sort, offset, limit, fields, fetch }: FME = {} as FME
  ): Promise<Page<T>> {
    const where = filter ? buildFilter(filter) : {};
    const orderBy = sort ? buildOrderBy(sort) : undefined;
    const select = fields ? buildSelect(fields) : undefined;

    const results = (await (prisma as any)[this.entityName].findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      select,
      include: fetch
    })) as T[];

    const total = await (prisma as any)[this.entityName].count({
      where
    });

    return { results, total };
  }
}

export const buildSelect = (fields: string[]) => {
  const select: any = {};

  for (const field of fields) {
    const fieldParts = field.split("_");
    let currentSelect = select;

    for (let i = 0; i < fieldParts.length - 1; i++) {
      const relation = fieldParts[i];

      currentSelect[relation] ??= { select: {} };

      currentSelect = currentSelect[relation].select;
    }

    currentSelect[fieldParts[fieldParts.length - 1]] = true;
  }

  return select;
};

export const buildFilter = (filter: any) => {
  const prismaFilter: any = {};

  for (const field in filter) {
    if (["and", "or", "not"].includes(field)) {
      continue;
    }

    const fieldFilter = filter[field];

    if (fieldFilter && typeof fieldFilter === "object") {
      const fieldParts = field.split("_");
      let currentFilter = prismaFilter;

      for (let i = 0; i < fieldParts.length - 1; i++) {
        const relation = fieldParts[i];

        currentFilter[relation] ??= {};

        currentFilter = currentFilter[relation];
      }

      const finalField = fieldParts[fieldParts.length - 1];

      let filterApplied = false;

      for (const operator in fieldFilter) {
        if (filterApplied) {
          break;
        }

        const value = fieldFilter[operator];

        if (value === undefined) {
          continue;
        }

        if (value === null && operator !== "eq" && operator !== "ne") {
          continue;
        }

        currentFilter[finalField] ??= {};

        if (operator === "eq") {
          currentFilter[finalField] = value;
        } else if (operator === "ne") {
          currentFilter[finalField] = { not: value };
        } else if (operator === "in") {
          currentFilter[finalField] = { in: value };
        } else if (operator === "notIn") {
          currentFilter[finalField] = { notIn: value };
        } else if (operator === "startsWith") {
          currentFilter[finalField] = { startsWith: value };
        } else if (operator === "endsWith") {
          currentFilter[finalField] = { endsWith: value };
        } else if (operator === "contains") {
          currentFilter[finalField] = { contains: value };
        } else if (operator === "notStartsWith") {
          currentFilter[finalField] = { not: { startsWith: value } };
        } else if (operator === "notEndsWith") {
          currentFilter[finalField] = { not: { endsWith: value } };
        } else if (operator === "notContains") {
          currentFilter[finalField] = { not: { contains: value } };
        }

        filterApplied = true;
      }
    }
  }

  if ("and" in filter && filter.and) {
    prismaFilter.AND = filter.and.map((subFilter: any) =>
      buildFilter(subFilter)
    );
  }

  if ("or" in filter && filter.or) {
    prismaFilter.OR = filter.or.map((subFilter: any) => buildFilter(subFilter));
  }

  if ("not" in filter && filter.not) {
    prismaFilter.NOT = filter.not.map((subFilter: any) =>
      buildFilter(subFilter)
    );
  }

  return prismaFilter;
};

export const buildOrderBy = (sort: any) => {
  const orderBy: any = {};

  for (const field in sort) {
    const order = sort[field];

    if (order === undefined) {
      continue;
    }

    if (order !== SortOrder.ASC && order !== SortOrder.DESC) {
      throw new Error(
        `Invalid SortOrder value for field ${field}. Expected 'ASC' or 'DESC'.`
      );
    }

    const fieldParts = field.split("_");
    let currentOrder = orderBy;

    for (let i = 0; i < fieldParts.length - 1; i++) {
      const relation = fieldParts[i];
      currentOrder[relation] ??= { orderBy: {} };
      currentOrder = currentOrder[relation].orderBy;
    }

    const finalField = fieldParts[fieldParts.length - 1];
    currentOrder[finalField] = order;
  }

  return orderBy;
};
