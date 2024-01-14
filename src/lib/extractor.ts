import PDFParser from 'pdf2json';

export const extractFirstUsefulPage = async (file: File) => {
    console.log(file)
    return new Promise(async (resolve, reject) => {
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", errData => reject(errData));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            const foundPage = pdfData.Pages.find(page => {
                const pageText = page.Texts.map((text: any) => decodeURIComponent(text.R[0].T)).join('');

                return pageText.toLowerCase().includes("totale bolletta") || pageText.toLowerCase().includes("totale fattura") || pageText.toLowerCase().includes("quanto devo pagare");
            });
            const text = foundPage?.Texts.map(text => {
                const textContent = text.R.map(r => r.T).join('');
                return textContent;
            });
            resolve(text);
        });
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        pdfParser.parseBuffer(buffer);
    });
}