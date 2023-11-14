import IPerson from "../types/IPerson";

const ALPHABET = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const MAX_NAME_LENGTH = 7;
const MAX_AGE = 90;
const TOTAL_PERSONS = 100;

interface IGenerateDataParams {
  howMany: number;
}

export const generatePersons = (params: IGenerateDataParams) => () =>
  new Promise<{ persons: IPerson[]; total: number }>((resolve, reject) => {
    setTimeout(() => {
      const generateRandomLetter = (): string =>
        ALPHABET[Math.ceil(Math.random() * ALPHABET.length - 1)];

      const generateRandomString = (length?: number) => {
        const numberOfLetters =
          length || Math.ceil(Math.random() * (length || MAX_NAME_LENGTH));
        return Array.from({ length: numberOfLetters })
          .map((_) => generateRandomLetter())
          .join("");
      };

      const generateRandomAge = (): number =>
        Math.ceil(Math.random() * MAX_AGE);

      const persons: IPerson[] = [];
      Array.from({ length: params.howMany }).forEach(() => {
        const person: IPerson = {
          id: generateRandomString(10),
          age: generateRandomAge(),
          firstName: generateRandomString(),
        };

        persons.push(person);
      });

      resolve({
        persons,
        total: TOTAL_PERSONS,
      });
    }, 2000);
  });
