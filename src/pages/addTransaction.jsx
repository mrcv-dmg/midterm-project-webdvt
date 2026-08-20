import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

const categories = ["Food", "Transport", "Utilities", "Income", "Other"];

const initialForm = {
  description: "",
  amount: "",
  category: "",
  type: "expense",
  date: "",
};

const selectClassName =
  "h-8 w-full rounded-2xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30";

export default function AddTransaction() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.description.trim()) nextErrors.description = "Enter a description.";
    if (!form.amount || Number(form.amount) <= 0)
      nextErrors.amount = "Enter an amount greater than 0.";
    if (!form.category) nextErrors.category = "Choose a category.";
    if (!form.date) nextErrors.date = "Choose a date.";
    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    console.log("New transaction:", form);
    setForm(initialForm);
    navigate("/");
  }

  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Navbar />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto mt-15 max-w-xl rounded-[min(var(--radius-4xl),24px)] border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <FieldSet>
          <FieldLegend>New transaction</FieldLegend>
          <FieldDescription>Log an expense or income entry.</FieldDescription>

          <FieldGroup>
            <Field data-invalid={!!errors.description}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                placeholder="e.g. Grab ride"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                aria-invalid={!!errors.description}
              />
              {errors.description && <FieldError>{errors.description}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.amount}>
              <FieldLabel htmlFor="amount">Amount (₱)</FieldLabel>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => updateField("amount", e.target.value)}
                aria-invalid={!!errors.amount}
              />
              {errors.amount && <FieldError>{errors.amount}</FieldError>}
            </Field>

            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <FieldDescription>Is this money in or money out?</FieldDescription>
              </FieldContent>
              <select
                id="type"
                className={selectClassName}
                value={form.type}
                onChange={(e) => updateField("type", e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </Field>

            <Field data-invalid={!!errors.category}>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <select
                id="category"
                className={selectClassName}
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                aria-invalid={!!errors.category}
              >
                <option value="" disabled>
                  Choose category
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && <FieldError>{errors.category}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.date}>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                aria-invalid={!!errors.date}
              />
              {errors.date && <FieldError>{errors.date}</FieldError>}
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-3 pt-2">
            <NavLink to="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Cancel
            </NavLink>
            <Button type="submit" size="sm">
              Save transaction
            </Button>
          </div>
        </FieldSet>
      </form>
    </main>
  );
}