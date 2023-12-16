import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import InvoiceGrid from "./InvoiceGrid";
import "./index.css";

// Initial state
const defaultValue = {
  qty: 0,
  price: 0,
  discountPercent: 0,
  discount: 0,
  taxPercent: 0,
  tax: 0,
  totalPrice: 0,
};

const InvoiceForm = () => {
  const [submit, setSubmit] = useState([]);
  const [formState, setFormState] = useState({
    ...defaultValue,
  });

  const calculateDiscount = () => {
    return (formState.qty * formState.price * formState.discountPercent) / 100;
  };

  const calculateTax = () => {
    return (formState.qty * formState.price * formState.taxPercent) / 100;
  };

  const calculateTotalPrice = () => {
    const discount = calculateDiscount();
    const tax = calculateTax();
    return formState.qty * formState.price - discount + tax;
  };

  const updateItem = (index) => {
    const itemToEdit = submit[index];
    setFormState({
      qty: itemToEdit.qty,
      price: itemToEdit.price,
      discountPercent: itemToEdit.discountPercent,
      taxPercent: itemToEdit.taxPercent,
      index, // Add index property to formState for tracking the edited item
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedItem = {
      qty: formState.qty,
      price: formState.price,
      discountPercent: formState.discountPercent,
      discount: calculateDiscount(),
      taxPercent: formState.taxPercent,
      tax: calculateTax(),
      totalPrice: calculateTotalPrice(),
    };

    // Check if formState already has an index property
    if (formState.hasOwnProperty("index")) {
      // If yes, update the existing item in the submit array
      setSubmit((prevSubmit) => {
        const updatedSubmit = [...prevSubmit];
        updatedSubmit[formState.index] = submittedItem;
        return updatedSubmit;
      });
    } else {
      // If no, add the new item to the submit array
      setSubmit((prevSubmit) => [...prevSubmit, submittedItem]);
    }

    setFormState({
      ...defaultValue,
    });
  };

  function reverseWords(s) {
    let reversedString = "";
    let word = "";

    for (let i = s.length - 1; i >= 0; i--) {
      if (s[i] !== " ") {
        word = s[i] + word;
      } else if (word.length > 0) {
        reversedString += (reversedString.length > 0 ? " " : "") + word;
        word = "";
      }
    }

    if (word.length > 0) {
      reversedString += (reversedString.length > 0 ? " " : "") + word;
    }

    return reversedString;
  }

  const input1 = "the sky is blue";
  const output1 = reverseWords(input1);
  console.log(output1);

  const input2 = "  hello world  ";
  const output2 = reverseWords(input2);
  console.log(output2);

  return (
    <>
      <Box className="invoice-form-container">
        <form className="form-container">
          <TextField
            label="Qty"
            type="number"
            value={formState.qty}
            onChange={(e) =>
              setFormState({ ...formState, qty: e.target.value })
            }
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Price"
            type="number"
            value={formState.price}
            onChange={(e) =>
              setFormState({ ...formState, price: e.target.value })
            }
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Discount %"
            type="number"
            value={formState.discountPercent}
            onChange={(e) =>
              setFormState({ ...formState, discountPercent: e.target.value })
            }
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Tax %"
            type="number"
            value={formState.taxPercent}
            onChange={(e) =>
              setFormState({ ...formState, taxPercent: e.target.value })
            }
            sx={{ marginBottom: "10px" }}
          />
          <Box className="total-price">
            <strong>Total Price:</strong> {calculateTotalPrice()}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ width: "120px", alignSelf: "center" }}
          >
            Submit
          </Button>
        </form>
      </Box>

      {/* Display table component */}
      <Box className="invoice-grid-container">
        <InvoiceGrid submitData={submit} handleEdit={updateItem} />
      </Box>
    </>
  );
};

export default InvoiceForm;
