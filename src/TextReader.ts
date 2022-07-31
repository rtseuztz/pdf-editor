import { exec } from "child_process";

export function renderPdf(buff: ArrayBuffer): void {
    var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending: any = null,
    scale = 1,
    canvas = document.getElementById('canvas') as HTMLCanvasElement,
    ctx = canvas.getContext('2d');
    const loadingTask = pdfjsLib.getDocument({data: buff});
    loadingTask.promise.then(function(pdf: any) {
      console.log('PDF loaded');
      // Fetch the first page
    const page = pdf.getPage(pageNum).then( (page: any) => {

      var viewport = page.getViewport({scale: scale});
      canvas.height = viewport.height;
      canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        pdfjsLib.renderPage(pageNumPending);
        pageNumPending = null;
      }
    }).then(function() {
      // Returns a promise, on resolving it will return text contents of the page
      return page.getTextContent();
    }).then(function(textContent: any) {

      // Assign CSS to the textLayer element
      var textLayer = document.querySelector(".textLayer") as HTMLElement;

      textLayer.style.left = canvas.offsetLeft + 'px';
      textLayer.style.top = canvas.offsetTop + 'px';
      textLayer.style.height = canvas.offsetHeight + 'px';
      textLayer.style.width = canvas.offsetWidth + 'px';

      // Pass the data to the method for rendering of text over the pdf canvas.
      pdfjsLib.renderTextLayer({
        textContent: textContent,
        container: textLayer,
        viewport: viewport,
        textDivs: []
      });
    });
	});
  }, function(reason: any) {
      console.error(reason);
  })
    //return [];
}
export async function removeTextFromFile(fileBytes:ArrayBuffer) {

}
export async function removeText(fileName:String) {
  console.log("before exec");
  const gsRunner = exec(`gswin64 -o public/no-more-texts.pdf -sDEVICE=pdfwrite -dFILTERTEXT  "public/${fileName}"`);
  console.log("after exec");
  const retFunc = async () => {
      return new Promise(res => {
      gsRunner.on("close", (r) => {
          res("worked")
        })
        gsRunner.on("error", (err) => {
          res("err");
        })
      })
  }
  return await retFunc();
}