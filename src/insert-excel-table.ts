import * as vscode from 'vscode';
import * as clipboardy from 'clipboardy';

export default async (textEditor: vscode.TextEditor) => {
    try {
        const resultString = await clipboardy.read();
        const resultArray = resultString.split('\r\n');
        resultArray.pop();
        if (!resultArray.length) {
            vscode.window.showInformationMessage('Please check whether the excel copied!');
            return;
        }
        const resultTwoDimArray = resultArray.map((item) => {
            return item.split('\t');
        });
        let tableString = '';
        resultTwoDimArray.forEach((itemO, indexO) => {
            if (indexO === 0) {
                let trThString = '| ';
                let tableDividingString = '| ';
                itemO.forEach((itemT) => {
                    trThString += `${itemT} | `;
                    tableDividingString += '---- | ';
                });
                trThString = `${trThString.trim()}\n`;
                tableDividingString = `${tableDividingString.trim()}\n`;
                tableString += trThString;
                tableString += tableDividingString;
            } else {
                let trTdString = '| ';
                itemO.forEach((itemT) => {
                    trTdString += `${itemT} | `;
                });
                trTdString = `${trTdString.trim()}\n`;
                tableString += trTdString;
            }
        });
        textEditor.edit((editBuilder) => {
            editBuilder.insert(textEditor.selection.active, tableString);
        });
    } catch (error) {
        vscode.window.showInformationMessage('Please check whether the excel copied!');
        throw error;
    }
};
