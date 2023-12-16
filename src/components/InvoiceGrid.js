import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./index.css";

const InvoiceGrid = ({ submitData, handleEdit }) => {
  return (
    <>
      {submitData.length > 0 ? (
        <TableContainer>
          <Table
            style={{
              minWidth: 650,
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <TableHead style={{ backgroundColor: "#f2f2f2" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Discount %</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Discounted Price
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tax %</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tax Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submitData.map((invoice, index) => (
                <TableRow
                  key={index}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{invoice.qty}</TableCell>
                  <TableCell>{invoice.price}</TableCell>
                  <TableCell>{invoice.discountPercent}</TableCell>
                  <TableCell>{invoice.discount}</TableCell>
                  <TableCell>{invoice.taxPercent}</TableCell>
                  <TableCell>{invoice.tax}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {invoice.totalPrice} ₹
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >{` Please add data to see it on the table. `}</h3>
      )}
    </>
  );
};

export default InvoiceGrid;
