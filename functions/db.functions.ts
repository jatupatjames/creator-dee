import { runQuery } from "../db/connection";

/** DELETE example — remove a deal by its dynamic id */
export async function deleteDeal(dealId: number): Promise<void> {
  const sql = `DELETE FROM deal WHERE id = $1`;
  await runQuery(sql, [dealId]);
}