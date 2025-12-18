import { useMemo, useEffect, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useNavigate } from 'react-router-dom';

export default function BillingTable() {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://test-billing-zpdr.onrender.com/api/billing")
      .then((res) => res.json())
      .then((data) => setRowData(data));
  }, []);

  const deleteClient = async (id) => {
    if (!window.confirm("Delete this billing record?")) return;
    await fetch(`https://test-billing-zpdr.onrender.com/api/billing/${id}`, { method: "DELETE" });
    setRowData((prev) => prev.filter((item) => item._id !== id));
  };

  const columns = useMemo(() => [
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'service', header: 'Service' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'amount', header: 'Amount (€)', type: 'number' },
    { accessorKey: 'date', header: 'Date' },
    {
      header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/update/${row.original._id}`)}
            className="bg-emerald-500 text-white px-2 py-1 rounded text-xs"
          >
            Update
          </button>
          <button 
            onClick={() => deleteClient(row.original._id)}
            className="bg-rose-500 text-white px-2 py-1 rounded text-xs"
          >
            Delete
          </button>
        </div>
      ),
    },
  ], [navigate]);

  const table = useMantineReactTable({
    columns,
    data: rowData,
    enableGrouping: true,         
    enableColumnDragging: true,   
    renderTopToolbarCustomActions: () => (
      <span className="text-sm text-gray-500 italic">
        Tip: Drag columns to reorder or click (⋮) to Group by field
      </span>
    ),

    initialState: { 
      density: 'compact',
    },
  });

  return (
   <div className="w-full mt-34 sm:p-4 p-1 sm:mt-40 ">
  {/* Header */}
        <h1 className="text-3xl sm:text-5xl mb-5  mx-5">Billings Table <span className="text-zinc-300 text-sm md:text-xl">at this moment</span></h1>
      <MantineReactTable table={table} />
    </div>
  );
}