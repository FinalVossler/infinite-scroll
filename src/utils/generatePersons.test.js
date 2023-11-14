import "jest";

import { generatePersons } from "./generatePersons";

describe("generate persons", () => {
  it("should generate persons", async () => {
    const generatePersonsCall = generatePersons({ howMany: 10 });

    const { persons } = await generatePersonsCall();

    expect(persons).not.empty;
    expect(persons[0].firstName.length).toBeGreaterThan(0);
    expect(persons[0].age).toBeGreaterThan(0);
    expect(persons[0].id.length).toBeGreaterThan(0);
  });
});
