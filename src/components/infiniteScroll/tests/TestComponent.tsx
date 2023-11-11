import React, { FunctionComponent } from "react";
import { ThemeProvider } from "react-jss";

import InfiniteScroll from "../InfiniteScroll";
import Person from "../../person";

import IPerson from "../../../types/IPerson";
import { IRenderItemProps } from "../types/IRenderItemProps";
import IDataWithId from "../types/IDataWithId";
import { theme } from "../../../types/ITheme";

import { generatePersons } from "../../../utils/generatePersons";
import useQuery from "../../../hooks/useQuery";

const TestComponent = () => {
  //#region Local state
  const [persons, setPersons] = React.useState<IPerson[]>([]);
  //#endregion Local state

  //#region Hooks
  const { query, loading: personsLoading } = useQuery();
  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    handleGetPersons();
  }, []);
  //#endregion Effects

  //#region Listeners
  const handleGetPersons = async (): Promise<IPerson[]> => {
    const newPersons: IPerson[] = await query(generatePersons({ howMany: 10 }));
    setPersons([...persons, ...newPersons]);

    // Not necessary. Just for contract respecting purposes.
    return newPersons;
  };
  //#endregion Listeners

  //#region View
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h1 className="title">Infinite scroll consumer</h1>
        <InfiniteScroll
          data={persons}
          height={650}
          render={Person as FunctionComponent<IRenderItemProps<IDataWithId>>}
          getData={handleGetPersons}
          loading={personsLoading}
          theme={theme}
        />
      </div>
    </ThemeProvider>
  );
  //#endregion View
};

export default TestComponent;
