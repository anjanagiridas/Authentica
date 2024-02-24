console.log("hello")
const userName = document.getElementById("name");
const eventname = document.getElementById("ename");
const orgName = document.getElementById("oname");
const posName = document.getElementById("pos");
const date = document.getElementById("date");
const sign = document.getElementById("sign");

const submit = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;


submit.addEventListener("click", () => {
    const nameval = userName.value;
    const enameval = eventname.value;
    const orgnameval = orgName.value;
    const posnameval = posName.value;
    const dateval = date.value;
    const signv = sign.value;

    

    if (nameval.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(nameval, enameval,orgnameval,posnameval,dateval,signv);
    } else {
        userName.reportValidity();
    }
});
const generatePDF = async (nameval, enameval, orgnameval,posnameval,dateval,signv) => {
    const existingPdfBytes = await fetch("Certificate.pdf").then((res) =>
        res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);


    //get font
    const fontBytes = await fetch("Sanchez-Regular.ttf").then((res) =>
        res.arrayBuffer()
    );
    // Embed our custom font in the document
    const SanChezFont = await pdfDoc.embedFont(fontBytes);
    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Draw a string of text diagonally across the first page
    firstPage.drawText(nameval, {
        x: 330,
        y: 270,
        size: 20,
        font: SanChezFont,
        color:rgb(0.2, 0.2, 0.2),
    });
    firstPage.drawText(posnameval, {
        x: 116,
        y: 240,
        size: 20,
        font: SanChezFont,
        color: rgb(0.2, 0.2, 0.2),
    });
  
    firstPage.drawText(orgnameval, {
        x: 116,
        y: 210,
        size: 20,
        font: SanChezFont,  
        color: rgb(0.2, 0.2, 0.2),
    });
     
    firstPage.drawText(enameval, {
        x: 300,
        y: 240,
        size: 20,
        font: SanChezFont,
        color: rgb(0.2, 0.2, 0.2),
    });
    firstPage.drawText(dateval, {
        x: 430,
        y: 210,
        size: 20,
        font: SanChezFont,
        color: rgb(0.2, 0.2, 0.2),
    });
    firstPage.drawText(signv, {
        x: 100,
        y: 100,
        size: 20,
        font: SanChezFont,
        color: rgb(0.2, 0.2, 0.2),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(pdfDataUri, "newcertificate.pdf")
};