import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Table from './Table'; 

const DownloadTableAsPDF = () => {
    const tableRef = useRef(null);

    const handleDownloadPDF = () => {
        const input = tableRef.current;

        html2canvas(input).then((canvas) => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // Width of A4 size in mm (approx. 8.27 inches)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('test_raport.pdf');
        });
    };

    return (
        <>
            
            <Table ref={tableRef} />
            
            
        </>
    );
};

export default DownloadTableAsPDF;
