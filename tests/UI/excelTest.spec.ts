import { test } from "../../src/fixtures/baseFixture";
import { ExcelUtils } from "../../src/utils/excelUtil";

test('excel test', async ({ }) => {

    const userData = ExcelUtils.readExcel('src/test_data/userData.xlsx', 'Sheet1')
    //console.log(userData);
    for (const user of userData) {
        console.log(user.id);
        console.log(user.username);
        console.log(user.password);
        console.log(user.role);
    }
})