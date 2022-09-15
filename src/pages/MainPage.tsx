import { useEffect, useState } from "react";
import "../components/main/main.scss";

import TableMain from "../components/main/mainTable/TableMain";
import Button from "../components/generic/button/Button";

import { useQuery } from "@apollo/client";
import { GET_ALL_CRYPTS, GET_PAGES_AMOUNT } from "../lib/query/crypt";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ButtonSizes, ButtonTypes } from "../types";

export default function MainPage() {
  const pageWidth = document.documentElement.scrollWidth;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);

  const {
    data: allCrypts,
    loading,
    error,
  } = useQuery(GET_ALL_CRYPTS, {
    variables: {
      limit: 10,
      offset: offset,
    },
  });

  const { data: pagesAmount, loading: pagesLoading } =
    useQuery(GET_PAGES_AMOUNT);

  useEffect(() => {
    setOffset((currentPage - 1) * 10);
  }, [currentPage]);

  function nextPage() {
    currentPage !== Math.ceil(pagesAmount?.getPagesAmount / 10) &&
      setCurrentPage(+currentPage + 1);
  }

  function prevPage() {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  }

  function changePage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!(e.target instanceof HTMLElement)) return;
    setCurrentPage(e.target.textContent ? +e.target.textContent : 1);
  }

  return (
    <main className="content main">
      <h2 className="title">All Cryptocurrency</h2>
      {!loading && allCrypts?.getAllCrypts.length ? (
        <TableMain dataToShow={allCrypts?.getAllCrypts} />
      ) : (
        <div className="skeleton__table">
          <div className="crypts-header">
            <p className="rank crypts-header__item">Rank</p>
            <p className="name crypts-header__item adaptive">Name</p>
            <p className="symbol crypts-header__item">Symbol</p>
            <p className="price crypts-header__item">Price</p>
            <p className="change crypts-header__item">Change (24h)</p>
            <p className="add crypts-header__item">Add to Wallet</p>
          </div>
          {[...Array(10).keys()].map((line) => (
            <div className="crypts__line" key={line}>
              <Skeleton className="skeleton" width={20} height={20} />
              {pageWidth > 640 && (
                <Skeleton className="skeleton" width={170} height={20} />
              )}
              <Skeleton
                className="skeleton"
                width={pageWidth > 640 ? 50 : 30}
                height={20}
              />
              <Skeleton
                className="skeleton"
                width={pageWidth > 640 ? 150 : 100}
                height={20}
              />
              <Skeleton
                className="skeleton"
                width={pageWidth > 640 ? 110 : 60}
                height={20}
              />
              <Skeleton
                className="skeleton"
                width={pageWidth > 640 ? 72 : 52}
                height={pageWidth > 640 ? 44 : 34}
              />
            </div>
          ))}
        </div>
      )}

      {!pagesLoading ? (
        <section className="pagination">
          <Button
            type="button"
            size={ButtonSizes.size_sm}
            buttonType={ButtonTypes.button_slide}
            onClick={prevPage}
          >
            Prev
          </Button>
          {[
            ...Array(Math.ceil(pagesAmount?.getPagesAmount / 10) || 10).keys(),
          ].map((page: number) => {
            return (
              <Button
                type="button"
                key={page}
                size={ButtonSizes.size_sm}
                buttonType={ButtonTypes.button_pagination}
                onClick={(e) => changePage(e)}
                active={page + 1 === currentPage}
              >
                {page + 1}
              </Button>
            );
          })}
          <div className="current__page">{currentPage}</div>
          <Button
            type="button"
            size={ButtonSizes.size_sm}
            buttonType={ButtonTypes.button_slide}
            onClick={nextPage}
          >
            Next
          </Button>
        </section>
      ) : (
        <div className="pagination">
          {[...Array(pageWidth > 640 ? 12 : 3).keys()].map((page: number) => (
            <Skeleton
              key={page}
              className="skeleton-pagination"
              width={40}
              height={40}
            />
          ))}
        </div>
      )}
    </main>
  );
}
