import React from 'react';

const TableComponent = ({ data }) => {
    return (
        <table className="table table-centered mb-0">
            <thead className="table-dark">
                <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, idx) => (
                            <td key={idx}>{value.toString()}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
