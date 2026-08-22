import XLSX from 'xlsx';

interface Row {
    key: string;
    [key: string]: string | undefined;
}

export class ExcelUtils {

    static readExcel(filePath: string, sheetName: string) {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];

        if (!sheet) {
            throw new Error(`Sheet "${sheetName}" not found in workbook`);
        }

        const rows: Row[] = XLSX.utils.sheet_to_json(sheet);
        const dataSet: any[] = []

        const keys = Object.keys(rows[0]!).filter(k => k !== 'key');

        for (const col of keys) {
            const data: Record<string, string> = {};
            for (const row of rows) {
                data[row.key] = row[col] ?? "";
            }
            dataSet.push({ id: col, ...data });
        }

        return dataSet
    }
}