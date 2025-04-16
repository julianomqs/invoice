import { Request, Response } from "express";

export const generatePDF = async ({
  url,
  param,
  data
}: {
  url: string;
  param?: {
    FILTERS?: string[];
    TITLE?: string;
    SUBTITLE1?: string;
    SUBTITLE2?: string;
    DATE?: string;
  } & Record<string, unknown>;
  data?: object[];
}): Promise<string | null> => {
  if (!data || data.length === 0) {
    return null;
  }

  const response = await fetch(`http://report:4000/report/${url}`, {
    method: "POST",
    body: JSON.stringify({
      param: {
        ...param,
        FILTERS: param?.FILTERS ? param.FILTERS.join(", ") : undefined
      },
      data
    }),
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error generating report: ${response.status} - ${text}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  return buffer.toString("base64");
};
