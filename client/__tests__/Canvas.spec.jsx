import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import Canvas from "../src/components/Toolbar/Toolbar";

describe("Canvas", () => {
    
    test("should render toolbar", () => {
        const result = render(<Canvas />);
        expect(result.container).toMatchSnapshot();
    });
});
