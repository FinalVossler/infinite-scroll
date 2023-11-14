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

export const PAGE_SIZE = 20;

const TestComponent = () => {
  //#region Local state
  const [persons, setPersons] = React.useState<IPerson[]>([]);
  //#endregion Local state

  //#region Hooks
  const { query, loading: personsLoading } = useQuery();
  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    handleGetPersons({ startIndex: 0, stopIndex: PAGE_SIZE - 1 });
  }, []);
  //#endregion Effects

  //#region Listeners
  const handleGetPersons = async (
    page: IPage
  ): Promise<{ items: IPerson[]; total: number }> => {
    const { persons: newPersons, total: totalPersons } = await query(
      generatePersons({ howMany: PAGE_SIZE })
    );
    setPersons([...persons, ...newPersons].slice(0, totalPersons));

    // Not necessary. Just for contract respecting purposes.
    return { items: newPersons, total: totalPersons };
  };
  //#endregion Listeners

  //#region View
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h1 className="title">Virtual scroll consumer</h1>
        <InfiniteScroll
          data={persons}
          height={650}
          render={Person as FunctionComponent<IRenderItemProps<IDataWithId>>}
          getData={handleGetPersons}
          loading={personsLoading}
          theme={theme}
          pageSize={PAGE_SIZE}
        />
      </div>
    </ThemeProvider>
  );
  //#endregion View
};

export default TestComponent;
