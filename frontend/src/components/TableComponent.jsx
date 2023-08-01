import React from 'react';

const TableComponent = ({ data }) => {
    
    if (!data || data.length === 0) {
        return <div>No data exists.</div>;
    }

    // Define a mapping of column names to new names
    const columnMapping = {
        // repExcepte
        repExcepte: 'Expected Reponse', // Change 'name' to 'Full Name'
    };

    // Filter the column keys to exclude
    const excludedColumns = ['id', 'created_at', 'updated_at'];
    const columnKeys = Object.keys(data[0]).filter((key) => !excludedColumns.includes(key));

    return (
        <div className="table-responsive">
            <table className="table table-centered mb-0">
                <thead className="table-dark">
                    <tr>
                        {columnKeys.map((key) => (
                            <th key={key}>{columnMapping[key] || key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columnKeys.map((key, idx) => (
                                <td key={idx}>{row[key] !== null ? row[key].toString() : 'N/A'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
