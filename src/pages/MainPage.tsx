import { useEffect, useState } from "react";
import "../components/main/main.scss";

import spinner from "../components/generic/icons/spinner.svg";
import TableMain from "../components/main/mainTable/TableMain";
import Button from "../components/generic/button/Button";

import { useQuery } from "@apollo/client";
import { GET_ALL_CRYPTS, GET_PAGES_AMOUNT } from "../lib/query/crypt";

export default function MainPage() {
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
    currentPage !== Math.ceil(pagesAmount.getPagesAmount / 10) &&
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
      {loading || pagesLoading ? (
        <img className="preloader__item" src={spinner} alt="spinner" />
      ) : (
        <div>
          <TableMain dataToShow={allCrypts.getAllCrypts} />

          <section className="pagination">
            <Button size="size_sm" buttonType="button_slide" onClick={prevPage}>
              Prev
            </Button>
            {[...Array(Math.ceil(pagesAmount.getPagesAmount / 10)).keys()].map(
              (page: number) => {
                return (
                  <Button
                    key={page}
                    size="size_sm"
                    buttonType="button_pagination"
                    onClick={(e) => changePage(e)}
                    active={page + 1 === currentPage}
                  >
                    {page + 1}
                  </Button>
                );
              }
            )}
            <div className="current__page">{currentPage}</div>
            <Button size="size_sm" buttonType="button_slide" onClick={nextPage}>
              Next
            </Button>
          </section>
        </div>
      )}
    </main>
  );
}
