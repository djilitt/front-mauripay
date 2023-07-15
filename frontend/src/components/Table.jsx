import React from 'react';

const Table = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>John Doe</td>
                    <td>25</td>
                    <td>USA</td>
                </tr>
                <tr>
                    <td>Jane Smith</td>
                    <td>30</td>
                    <td>Canada</td>
                </tr>
                {/* Add more rows as needed */}
            </tbody>
        </table>
    );
};

export default Table;
