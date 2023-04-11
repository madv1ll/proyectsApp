import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';



export const generateExcel = (project, items, employee) => {
    const itemList = items.map(item => [item.name,item.unitPrice, item.quantity, item.purchaseDate, item.totalPrice]);
    const employeeList = employee.map(emp => [emp.name + emp.lastName, emp.startDate, emp.finishDate, emp.salary, emp.workDays]);

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([
        ['Project Name', project.name],
        ['Project Price', project.price],
        ['Start Date', project.startDate],
        ['Finish Date', project.finishDate],
        [],
        ['ITEMS'],
        ['NAME','PRICE','QUANTITY','DATE','TOTAL'],
    ]);
    XLSX.utils.sheet_add_aoa(ws, itemList, {origin: -1});
    XLSX.utils.sheet_add_aoa(ws, [[]], {origin: -1});
    XLSX.utils.sheet_add_aoa(ws, [['NAME', 'START DATE', 'FINISH DATE', 'SALARY', 'WORK DAYS']], {origin: -1});
    XLSX.utils.sheet_add_aoa(ws, employeeList, {origin: -1});

    XLSX.utils.book_append_sheet(wb, ws, 'Project xxx', true);
    const base64 = XLSX.write(wb, {type: 'base64'});
    const filename = FileSystem.documentDirectory + "Project_"+project.id+".xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64
    }).then(()=>{
        Sharing.shareAsync(filename);
    });
};