import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Dashboard from "./Dashboard";

vi.mock("recharts", () => ({
  CartesianGrid: () => null,
  Line: () => null,
  LineChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ReferenceLine: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null,
}));

describe("Dashboard relay simulation", () => {
  it("toggles between recovered-failure and normal operation states", () => {
    render(<Dashboard navOffset="" />);

    expect(screen.getByText("Relay failure recovered")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "RESET ALL NODES" }));

    expect(screen.getByText("All nodes online")).toBeInTheDocument();
    expect(screen.getByText(/Normal route active/)).toBeInTheDocument();
  });

  it("updates the selected demonstration trial", () => {
    render(<Dashboard navOffset="" />);
    fireEvent.change(screen.getByLabelText("Select demonstration trial"), { target: { value: "10" } });
    expect(screen.getByText("Demo data — Trial #10")).toBeInTheDocument();
  });
});
