import fs from "fs";
import path from "path";

const filePath = path.resolve("src/database/db.d.ts");

try {
  let content = fs.readFileSync(filePath, "utf8");

  const updated = content.replace(
    /export type Decimal = ColumnType<string, number \| string>;/,
    "export type Decimal = ColumnType<number, number, number>;"
  );

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(
      "✔️ Tipo Decimal ajustado para ColumnType<number, number, number>"
    );
  } else {
    console.log("ℹ️ Tipo Decimal já está ajustado.");
  }
} catch (err) {
  console.error("❌ Erro ao atualizar tipo Decimal:", (err as Error).message);
}
