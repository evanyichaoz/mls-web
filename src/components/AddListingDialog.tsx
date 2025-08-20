"use client";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface AddListingDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialFormState = {
  mlsNum: "",
  address: "",
  city: "",
  province: "ON",
  postCode: "",
  bedRoom: "",
  bathRoom: "",
  parking: "",
  photo: "",
  status: 1, // 1 for sale, 2 for sold
};

const AddListingDialog: React.FC<AddListingDialogProps> = ({ open, onClose }) => {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const { currentUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCloseDialog = () => {
    onClose();
    setError("");
    setJsonInput("");
    setForm(initialFormState);
  };

  const handleParseAndFill = () => {
    setError("");
    if (!jsonInput.trim()) {
      setError("Please paste JSON data into the text area.");
      return;
    }
    try {
      const parsedData = JSON.parse(jsonInput);
      setForm({
        mlsNum: parsedData.mlsNum ?? "",
        address: parsedData.address ?? "",
        city: parsedData.city ?? "",
        province: parsedData.province ?? "ON",
        postCode: parsedData.postCode ?? "",
        bedRoom: parsedData.bedRoom ?? "",
        bathRoom: parsedData.washRoom ?? parsedData.bathRoom ?? "",
        parking: parsedData.parking ?? "",
        photo: parsedData.photo ?? "",
        status: parsedData.status ?? 1,
      });
      setJsonInput(""); // Clear the input after successful parsing
    } catch (e) {
      setError("Invalid JSON format. Please check the data and try again.");
      console.error("JSON parsing error:", e);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (!currentUser) {
      setError("You must be logged in to perform this action.");
      setLoading(false);
      return;
    }

    if (!form.mlsNum || !form.address || !form.city) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Listing added successfully!");
        handleCloseDialog();
        window.location.reload(); // 刷新页面以看到新数据
      } else {
        setError(data.error || "Failed to add listing.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>Add New Listing</DialogTitle>
      <DialogContent>
        <TextField
          label="Paste Listing JSON here"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          margin="normal"
          placeholder={'{\n  "address": "123 Main St",\n  "city": "Toronto",\n  ...\n}'}
        />
        <Button onClick={handleParseAndFill} variant="contained" sx={{ mb: 2 }}>
          Parse & Fill Form
        </Button>
        <TextField margin="dense" label="MLS Number" name="mlsNum" fullWidth variant="standard" value={form.mlsNum} onChange={handleChange} required />
        <TextField margin="dense" label="Address" name="address" fullWidth variant="standard" value={form.address} onChange={handleChange} required />
        <TextField margin="dense" label="City" name="city" fullWidth variant="standard" value={form.city} onChange={handleChange} required />
        <TextField margin="dense" label="Province" name="province" fullWidth variant="standard" value={form.province} onChange={handleChange} />
        <TextField margin="dense" label="Postal Code" name="postCode" fullWidth variant="standard" value={form.postCode} onChange={handleChange} />
        <TextField margin="dense" label="Bedrooms" name="bedRoom" fullWidth variant="standard" value={form.bedRoom} onChange={handleChange} />
        <TextField margin="dense" label="Bathrooms" name="bathRoom" fullWidth variant="standard" value={form.bathRoom} onChange={handleChange} />
        <TextField margin="dense" label="Parking" name="parking" fullWidth variant="standard" value={form.parking} onChange={handleChange} />
        <TextField margin="dense" label="Photo URL" name="photo" fullWidth variant="standard" value={form.photo} onChange={handleChange} />
        <FormControl fullWidth margin="dense" variant="standard">
          <InputLabel id="status-label">Status</InputLabel>
          <Select labelId="status-label" name="status" value={form.status} onChange={handleChange} label="Status">
            <MenuItem value={1}>For Sale</MenuItem>
            <MenuItem value={2}>Sold</MenuItem>
          </Select>
        </FormControl>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Listing"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddListingDialog;
