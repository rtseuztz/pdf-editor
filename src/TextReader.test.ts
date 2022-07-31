import { exec } from "child_process";
import { removeText } from "./TextReader";

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker//`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
test('reads pdf text from a page', async () => {
    const response = await fetch('http://localhost:3001/2022 Resume.pdf');
    
    //const body = response.json();
    const blob = await new Response(await response.blob());
    expect(response.status === 200).toBeTruthy();

    expect(blob === undefined).toBeFalsy();
    const buff = await blob.arrayBuffer()

    const loadingTask = pdfjsLib.getDocument({data: buff});
    loadingTask.promise.then( (pdf: any) => {
        pdf.getPage(1).then(function(page: any) {
            let textContent = "";
            page.getTextContent().then( (textObj: any) => {
                expect(Object.keys(textObj).length > 0).toBeTruthy();
            })
        })
    })
});

test('executing 64', async () => {

    const result = await removeText("2022 Resume.pdf");
    expect(result).toBe("worked");
})