import React from "react";
import Loading from "react-loading";

import { IRenderItemProps } from "./types/IRenderItemProps";

import useStyles from "./infiniteScroll.styles";
import IDataWithId from "./types/IDataWithId";
import ITheme from "../../types/ITheme";

const DEFAULT_HEIGHT = 800;
const DEFAULT_PAGE_SIZE = 10;

export interface IInfiniteScrollProps<T extends IDataWithId> {
  data: T[];
  getData: (page: IPage) => Promise<{ items: T[]; total: number }>;
  render: React.FunctionComponent<IRenderItemProps<T>>;
  height?: number;
  loading?: boolean;
  theme: ITheme;
  pageSize?: number;
}

function InfiniteScroll<T extends IDataWithId>(props: IInfiniteScrollProps<T>) {
  //#region Hooks
  const startIndexRef = React.useRef<number>(0);
  const totalRef = React.useRef<number | undefined>(undefined);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const styles = useStyles({ theme: props.theme });
  //#endregion Hooks

  //#region Listeners
  const handleCheckScroll = async () => {
    const scrollContainer = containerRef.current;

    if (scrollContainer) {
      // Check if the user has reached the bottom while scrolling
      const isAtBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop ===
        scrollContainer.clientHeight;

      if (isAtBottom) {
        if (
          !props.loading &&
          (!totalRef.current || props.data.length < totalRef.current)
        ) {
          startIndexRef.current += props.pageSize || DEFAULT_PAGE_SIZE;
          const { total } = await props.getData({
            startIndex: startIndexRef.current,
            stopIndex:
              startIndexRef.current + (props.pageSize || DEFAULT_PAGE_SIZE) - 1,
          });

          totalRef.current = total;
        }
      }
    }
  };
  //#region Listeners

  //#region View
  return (
    <React.Fragment>
      <div
        ref={containerRef}
        className={styles.infiniteScrollContainer}
        style={{ height: props.height ?? DEFAULT_HEIGHT }}
        onScroll={handleCheckScroll}
        data-cy="infiniteScrollContainer"
      >
        {props.data.map((item, index) => {
          return (
            <div key={item.id} className={styles.itemContainer}>
              <props.render
                key={item.id}
                index={index}
                item={item}
                theme={props.theme}
              />
            </div>
          );
        })}
      </div>
      {props.loading && (
        <div
          className={styles.loadingContainer}
          data-cy="infiniteScrollLoading"
        >
          <Loading color={props.theme.darkerPrimary} />
        </div>
      )}
    </React.Fragment>
  );
  //#endregion View
}

export default React.memo(InfiniteScroll);
