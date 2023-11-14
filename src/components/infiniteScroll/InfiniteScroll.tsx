import React from "react";
import Loading from "react-loading";

import { IRenderItemProps } from "./types/IRenderItemProps";

import useStyles from "./infiniteScroll.styles";
import IDataWithId from "./types/IDataWithId";
import ITheme from "../../types/ITheme";

const DEFAULT_HEIGHT = 800;
const DEFAULT_PAGE_SIZE = 10;
const ITEM_MARGIN = 1;
const DEFAULT_ITEM_HEIGHT = 20;

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
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  const [itemHeight, setItemHeight] =
    React.useState<number>(DEFAULT_ITEM_HEIGHT);

  //#region Hooks
  const containerRef = React.useRef<HTMLDivElement>(null);
  const startIndexRef = React.useRef<number>(0);
  const totalRef = React.useRef<number>(0);
  const firstItemRef = React.useRef<HTMLDivElement>(null);
  const styles = useStyles({ theme: props.theme });
  //#endregion Hooks

  //#region Listeners
  const handleCheckScroll = async () => {
    const scrollContainer = containerRef.current;

    if (scrollContainer) {
      setScrollTop(scrollContainer.scrollTop);
    }

    if (scrollContainer) {
      // Check if the user has reached the bottom while scrolling
      const isAtBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop <=
        scrollContainer.clientHeight +
          ((props.height || DEFAULT_HEIGHT) * 20) / 100;
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
  //#endregion Listeners

  //#region Effects
  React.useEffect(() => {
    if (firstItemRef.current) {
      setItemHeight(firstItemRef.current.clientHeight);
    }
  }, [props.data]);
  //#endregion Effects

  //#region View
  let startItemIndex = Math.max(
    Math.floor(scrollTop / itemHeight) - ITEM_MARGIN,
    0
  );

  const offsetY = startItemIndex * itemHeight;

  let stopItemIndex =
    startItemIndex + Math.floor((props.height || DEFAULT_HEIGHT) / itemHeight);
  stopItemIndex = Math.min(props.data.length - 1, stopItemIndex) + ITEM_MARGIN;
  return (
    <React.Fragment>
      <div
        ref={containerRef}
        className={styles.infiniteScrollContainer}
        style={{ height: props.height ?? DEFAULT_HEIGHT }}
        onScroll={handleCheckScroll}
        data-cy="infiniteScrollContainer"
      >
        <div
          className={styles.totalContentContainer}
          style={{
            height: itemHeight * (props.data.length + 1),
          }}
        >
          <div
            style={{
              // Keep moving our list down as we keep scrolling
              willChange: "transform",
              transform: `translateY(${offsetY}px)`,
            }}
          >
            {props.data.length >= startItemIndex &&
              props.data[startItemIndex] && (
                <div ref={firstItemRef} className={styles.itemContainer}>
                  <props.render
                    key={props.data[startItemIndex].id}
                    index={props.data[startItemIndex].id}
                    item={props.data[startItemIndex]}
                    theme={props.theme}
                  />
                </div>
              )}
            {props.data
              .slice(startItemIndex + 1, stopItemIndex + 1)
              .map((item) => {
                return (
                  <div key={item.id} className={styles.itemContainer}>
                    <props.render
                      key={item.id}
                      index={item.id}
                      item={item}
                      theme={props.theme}
                    />
                  </div>
                );
              })}
          </div>
        </div>
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
