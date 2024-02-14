import React from "react";
import { useTable } from "react-table";

const PlayList = ({data}) =>{
    const columns = [
        { Header: '#', accessor: 'index' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Artist(s)', accessor: 'artist' },
        { Header: 'Album', accessor: 'album' },
    ];

    const tableInstance = useTable({
        data, 
        columns
    });

    return(
        <table className="mt-4 w-full table-auto border-collapse border border-gray-300">
            <thead>
                {tableInstance.getHeaderGroups().map((headerGroup) =>{
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        className="px-4 py-2 text-left border border-gray-300"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                })}
            </thead>
            <tbody>
                {
                    tableInstance.rows.map((row)=> (
                        <tr key={row.id}>
                            {row.cells.map((cell) => (
                            <td key={cell.id} className="px-4 py-2 border border-gray-300">
                                {cell.render('Cell')}
                            </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default PlayList;