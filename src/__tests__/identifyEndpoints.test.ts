import { identifyEndpoints } from "../identifyEndpoints";

describe("identifyEndpoints", () => {
    it('returns only the final squares of a pieces possible trajectories', () => {
        const endpoints = identifyEndpoints('bishop', [
            "c1",
            "d2",
            "h2",
            "e3",
            "g3",
            "f4",
            "e5",
            "g5",
            "d6",
            "h6",
            "c7",
            "b8"
          ])
        expect(endpoints).toEqual(expect.arrayContaining(["b8", "h6", "c1", "h2"]))
    })
})