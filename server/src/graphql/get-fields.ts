import { FieldNode, GraphQLResolveInfo, Kind } from "graphql";

export default (info: GraphQLResolveInfo) => {
  const extractFields = (fieldNode: FieldNode, parent?: string): string[] => {
    const fields: string[] = [];

    if (!fieldNode.selectionSet) return fields;

    fieldNode.selectionSet.selections.forEach((field) => {
      if (field.kind === Kind.FIELD) {
        const fieldName = parent
          ? `${parent}_${field.name.value}`
          : field.name.value;

        if (!field.selectionSet) {
          fields.push(fieldName);
        }

        fields.push(...extractFields(field, fieldName));
      }
    });

    return fields;
  };

  const findNodeWithResults = (fieldNode: FieldNode): FieldNode | undefined => {
    if (!fieldNode.selectionSet) return undefined;

    const resultsField = fieldNode.selectionSet.selections.find(
      (s) => s.kind === Kind.FIELD && s.name.value === "results"
    );

    return resultsField ? (resultsField as FieldNode) : fieldNode;
  };

  const fields: string[] = [];

  for (const fieldNode of info.fieldNodes) {
    const initialNode = findNodeWithResults(fieldNode);
    if (initialNode) {
      fields.push(...extractFields(initialNode));
    }
  }

  return fields;
};
