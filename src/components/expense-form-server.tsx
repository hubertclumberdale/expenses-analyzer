"use client";
import React, { useState } from "react";
import { createExpenseAction } from "@/app/_action";
import { ExpenseClass } from "@/models/Expense";
import { Button, Form } from "react-bootstrap";

export default function ExpenseForm() {
  const [formData, setFormData] = useState<Omit<ExpenseClass, "_id" | "id">>({
    reference: 0,
    issuedDate: new Date(),
    fromDate: new Date(),
    toDate: new Date(),
    dueDate: new Date(),
    cost: 0,
    consumption: 0,
    activationCost: 0,
    totalCost: 0,
    paid: false,
    monthlyInstallments: 1,
    monthlyCost: 0,
    notes: "",
  });

  async function action(event: any) {
    event.preventDefault();

    const {
      reference,
      fromDate,
      toDate,
      cost,
      consumption,
      totalCost,
      monthlyCost,
    } = formData;
    if (
      !reference ||
      typeof name !== "string" ||
      !fromDate ||
      !toDate ||
      !cost ||
      !consumption
    ) {
      return;
    }

    await createExpenseAction({ expense: { ...formData }, path: "/" });
  }

  function handleChange(event: any) {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <Form onSubmit={action} className="flex items-center space-x-2 mb-4">
      <Form.Group className="mb-3" controlId="reference">
        <Form.Label>Reference</Form.Label>
        <Form.Control
          type="number"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
          className="border rounded px-2 py-1 flex-1"
          placeholder="Reference"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="fromDate">
        <Form.Label>From Date</Form.Label>
        <Form.Control
          type="date"
          name="fromDate"
          value={new Date(formData.fromDate).toISOString().split("T")[0]}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="From Date"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="toDate">
        <Form.Label>To Date</Form.Label>
        <Form.Control
          type="date"
          name="toDate"
          value={new Date(formData.toDate).toISOString().split("T")[0]}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="To Date"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="cost">
        <Form.Label>Cost</Form.Label>
        <Form.Control
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Cost"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="consumption">
        <Form.Label>Consumption</Form.Label>
        <Form.Control
          type="number"
          name="consumption"
          value={formData.consumption}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Consumption"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="activationCost">
        <Form.Label>Activation Cost</Form.Label>
        <Form.Control
          type="number"
          name="activationCost"
          value={formData.activationCost}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Activation Cost"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="totalCost">
        <Form.Label>Total Cost</Form.Label>
        <Form.Control
          type="number"
          name="totalCost"
          value={formData.totalCost}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Total Cost"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="paid">
        <Form.Check
          type="checkbox"
          label="Paid"
          name="paid"
          checked={formData.paid}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="monthlyInstallments">
        <Form.Label>Monthly Installments</Form.Label>
        <Form.Control
          type="number"
          name="monthlyInstallments"
          value={formData.monthlyInstallments}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Monthly Installments"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="monthlyCost">
        <Form.Label>Monthly Cost</Form.Label>
        <Form.Control
          type="number"
          name="monthlyCost"
          value={formData.monthlyCost}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Monthly Cost"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="notes">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Notes"
        />
      </Form.Group>

      <Button
        type="submit"
        className="px-4 py-1 text-white rounded bg-green-500"
      >
        Add
      </Button>
    </Form>
  );
}
