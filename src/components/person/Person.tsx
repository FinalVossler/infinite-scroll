import React from "react";

import IPerson from "../../types/IPerson";
import { IRenderItemProps } from "../infiniteScroll/types/IRenderItemProps";

import useStyles from "./person.styles";

const Person: React.FunctionComponent<IRenderItemProps<IPerson>> = (
  props: IRenderItemProps<IPerson>
) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div data-cy="person" className={styles.personContainer}>
      <span>Firstname: {props.item.firstName}</span>
      <span>Age: {props.item.age}</span>
    </div>
  );
};

export default Person;
