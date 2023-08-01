// import React, { useRef } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import Table from './Table'; 

// 'jjjj';

// const DownloadTableAsPDF = () => {
//     const tableRef = useRef(null);

//     const handleDownloadPDF = () => {
//         const input = tableRef.current;

//         html2canvas(input).then((canvas) => {
//             const pdf = new jsPDF();
//             const imgData = canvas.toDataURL('image/png');
//             const imgWidth = 210; // Width of A4 size in mm (approx. 8.27 inches)
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;

//             pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//             pdf.save('test_raport.pdf');
//         });
//     };

//     return (
//         <>

//             <Table ref={tableRef} />


//         </>
//     );
// };

// export default DownloadTableAsPDF;


import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Table from './Table';

// Replace this with your Table component

const DownloadTableAsPDF = () => {
    const tableRef = useRef(null);


    const captureTablePage = async (tableRef, pageNumber) => {
        const input = tableRef.current;
        const tableClone = input.cloneNode(true);

        // Calculate the translateY value to move the table for pagination
        const translateY = -pageNumber * input.clientHeight;

        tableClone.style.transform = `translateY(${translateY}px)`;
        document.body.appendChild(tableClone);

        const canvas = await html2canvas(tableClone);
        document.body.removeChild(tableClone);

        return canvas;
    };


    const handleDownloadPDF = async () => {
        const pdf = new jsPDF();
        const pageCount = 3; // Set the number of pages based on your table's content

        for (let pageNumber = 0; pageNumber < pageCount; pageNumber++) {
            const canvas = await captureTablePage(tableRef, pageNumber);

            if (pageNumber !== 0) {
                pdf.addPage();
            }

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // Width of A4 size in mm (approx. 8.27 inches)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }

        pdf.save('test_report.pdf');
    };

    return (
        <>
            <button onClick={handleDownloadPDF}>Download PDF</button>
            <Table ref={tableRef} />
        </>
    );
};

export default DownloadTableAsPDF;
