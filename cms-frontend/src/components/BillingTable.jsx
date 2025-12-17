import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function BillingTable() {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();
  const isLargeScreen = window.innerWidth >= 800;


  useEffect(() => {
    fetch("https://test-billing-zpdr.onrender.com/api/billing")
      .then((res) => res.json())
      .then((data) => setRowData(data));
  }, []);

  const deleteClient = async (id) => {
    if (!window.confirm("Delete this billing record?")) return;

    await fetch(`https://test-billing-zpdr.onrender.com/api/billing/${id}`, {
      method: "DELETE",
    });

    setRowData((prev) => prev.filter((item) => item._id !== id));
  };

  // Nested grid columns (per client)
  const detailColumnDefs = useMemo(() => [
    { field: "service", headerName: "Service", enableRowGroup: true, flex: isLargeScreen ? 1 : undefined, },
    { field: "location", headerName: "Location", enableRowGroup: true, flex: isLargeScreen ? 1 : undefined, },
    { field: "amount", headerName: "Amount (€)", aggFunc: "sum", flex: isLargeScreen ? 1 : undefined, },
    { field: "date", headerName: "Date", flex: isLargeScreen ? 1 : undefined, },
  ], []);

  const columnDefs = [
    {
      field: "customer",
      filter: true,
      headerName: "Customer",
       width: window.innerWidth / 2,
      cellRenderer: "agGroupCellRenderer", 
    },
    {
      headerName: "Actions",
       width: window.innerWidth / 2,
      cellRenderer: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/update/${params.data._id}`)}
            className="px-2  bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Update
          </button>
          <button
            onClick={() => deleteClient(params.data._id)}
            className="px-2 bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mt-40">
      <h1 className="text-3xl sm:text-5xl mb-5 mx-5">
        Billing Table <span className="text-zinc-300 text-sm md:text-xl">per client</span>
      </h1>

      <div
        className="ag-theme-quartz rounded-xl shadow-sm bg-green-50"
        style={{ height: "70vh", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
          masterDetail={true} // enables nested grid
          detailCellRendererParams={{
            detailGridOptions: {
              columnDefs: detailColumnDefs,
              defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true,
              },
              animateRows: true,
              rowGroupPanelShow: "always", // allows drag & drop grouping per client
              groupDisplayType: "multipleColumns",
            },
            getDetailRowData: (params) => {
              // Filter data for this client
              params.successCallback(
                rowData.filter((r) => r.customer === params.data.customer)
              );
            },
          }}
          animateRows
        />
      </div>
    </div>
  );
}
