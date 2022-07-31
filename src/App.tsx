import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import $ from 'jquery'
import { JsxElement } from 'typescript';
import { RenderParameters } from 'pdfjs-dist/types/src/display/api';
import gs from 'ghostscript-node'
import * as pdfReader from './TextReader'
//const TextLayerBuilder = require('pdfjs-dist/legacy/build/types/web/text_layer_builder')
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker//`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
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
    const buff = await file.arrayBuffer()
    //const binaryData = atob(base64);
    pdfReader.renderPdf(buff);
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
        <div id="text-layer" className="textLayer"></div>
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
