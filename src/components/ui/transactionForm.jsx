import { useState } from "react";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
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

const categories = [
  "Food",
  "Transport",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Salary",
  "Allowance",
  "Other",
];

const selectClassName =
  "h-8 w-full rounded-2xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30";

export default function TransactionForm({
  initialValues,
  onSubmit,
  onCancel,
  legend = "Transaction",
  description = "Log an expense or income entry.",
  submitLabel = "Save transaction",
}) {
  const [form, setForm] = useState(() => ({
    ...initialValues,
  }));

  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.description.trim()) {
      nextErrors.description =
        "Enter a description.";
    }

    const amount = Number(form.amount);

    if (
      !form.amount ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      nextErrors.amount =
        "Enter an amount greater than 0.";
    }

    if (!form.category) {
      nextErrors.category =
        "Choose a category.";
    }

    if (!form.date) {
      nextErrors.date = "Choose a date.";
    }

    if (
      form.type !== "income" &&
      form.type !== "expense"
    ) {
      nextErrors.type =
        "Choose a transaction type.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldSet>
        <FieldLegend>{legend}</FieldLegend>

        <FieldDescription>
          {description}
        </FieldDescription>

        <FieldGroup>
          <Field data-invalid={!!errors.description}>
            <FieldLabel htmlFor="description">
              Description
            </FieldLabel>

            <Input
              id="description"
              placeholder="e.g. Grab ride"
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              aria-invalid={!!errors.description}
            />

            {errors.description && (
              <FieldError>
                {errors.description}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.amount}>
            <FieldLabel htmlFor="amount">
              Amount (₱)
            </FieldLabel>

            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={(event) =>
                updateField(
                  "amount",
                  event.target.value
                )
              }
              aria-invalid={!!errors.amount}
            />

            {errors.amount && (
              <FieldError>
                {errors.amount}
              </FieldError>
            )}
          </Field>

          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="type">
                Type
              </FieldLabel>

              <FieldDescription>
                Is this money in or money out?
              </FieldDescription>
            </FieldContent>

            <select
              id="type"
              className={selectClassName}
              value={form.type}
              onChange={(event) =>
                updateField(
                  "type",
                  event.target.value
                )
              }
            >
              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>
            </select>
          </Field>

          <Field data-invalid={!!errors.category}>
            <FieldLabel htmlFor="category">
              Category
            </FieldLabel>

            <select
              id="category"
              className={selectClassName}
              value={form.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value
                )
              }
              aria-invalid={!!errors.category}
            >
              <option value="" disabled>
                Choose category
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <FieldError>
                {errors.category}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.date}>
            <FieldLabel htmlFor="date">
              Date
            </FieldLabel>

            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(event) =>
                updateField(
                  "date",
                  event.target.value
                )
              }
              aria-invalid={!!errors.date}
            />

            {errors.date && (
              <FieldError>
                {errors.date}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        <div className="flex justify-end gap-3 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
            >
              Cancel
            </button>
          )}

          <Button type="submit" size="sm">
            {submitLabel}
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}