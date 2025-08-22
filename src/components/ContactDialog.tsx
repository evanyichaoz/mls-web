"use client";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setValidationError("");
    if (!form.name) {
      setValidationError("Name is required.");
      setLoading(false);
      return;
    }
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", phone: "", email: "" });
      } else {
        setError(data.error || t('failed.send'));
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => { onClose(); setSuccess(false); setError(""); }}>
        <DialogTitle>{t('contact.us')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t('name')}
          name="name"
          fullWidth
          variant="standard"
          value={form.name}
          required
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label={t('phone')}
          name="phone"
          fullWidth
          variant="standard"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label={t('email')}
          name="email"
          fullWidth
          variant="standard"
          value={form.email}
          onChange={handleChange}
        />
        {validationError && <div style={{ color: "red", marginTop: 8 }}>{validationError}</div>}
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 8 }}>{t('message.sent')}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>{t('cancel')}</Button>
        <Button onClick={handleSubmit} disabled={loading || !form.name || (!form.phone && !form.email)}>
          {loading ? "Sending..." : t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactDialog;