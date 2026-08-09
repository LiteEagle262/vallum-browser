import { describe, expect, it } from "vitest";
import {
  VallumRenderRef as CoreRenderRef,
  createVallumClient as createCoreClient,
} from "@vallum/client";
import { VallumRenderRef, createVallumClient } from "./index";

describe("@vallum/browser module entry", () => {
  it("exposes the framework-neutral public API", () => {
    expect(createVallumClient).toEqual(expect.any(Function));
    expect(VallumRenderRef).toEqual(expect.any(Function));
    expect(VallumRenderRef).toBe(CoreRenderRef);
    expect(createVallumClient).toBe(createCoreClient);
  });
});
