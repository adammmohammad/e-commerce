import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// unmount rendered components after every test
afterEach(() => cleanup());
