import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import $ from 'jquery'
import { JsxElement } from 'typescript';
import { RenderParameters } from 'pdfjs-dist/types/src/display/api';
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
function App() {
  const [page, setPage] = useState<any>(undefined)
  const openPDF = async () => {
    const fileEle = document.getElementById("file_upload") as HTMLInputElement
    if (!fileEle || !fileEle.files) return;
    if (fileEle.files.length === 0) {
      console.log("file is empty")
      return;
    }
    const file: File = fileEle.files[0]
    const base64 = await file.arrayBuffer()
    //const binaryData = atob(base64);
    const loadingTask = pdfjsLib.getDocument({data: base64});
      loadingTask.promise.then(function(pdf: any) {
      console.log('PDF loaded');
    
      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page: any) {
        setPage(page);
        console.log('Page loaded');
        
        var scale = 1.5;
        var viewport = page.getViewport({scale: scale});

        // Prepare canvas using PDF page dimensions
        // eslint-disable-next-line testing-library/no-node-access
        var canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) return;
        var context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext: RenderParameters = {
          canvasContext: context,
          viewport: viewport
        };
        // eslint-disable-next-line testing-library/render-result-naming-convention
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
    });
  }, function(reason: any) {
      console.error(reason);
  })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Upload a pdf for marking up
        </p>
        <Button id="file_upload" type="file" text="Upload pdf" onClick={openPDF} onChange={openPDF}></Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <canvas id="canvas"></canvas>
      </header>
    </div>
  );
}
async function getBase64(file: File): Promise<string> {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise(res => {
    reader.onload = function () {
      if (reader.result)
        res(reader.result as string)
    };
    reader.onerror = function (error) {
      res("")
    };
  })
}
export default App;
