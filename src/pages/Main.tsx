import { useEffect, useState } from "react";
import "../components/main/main.scss";

import spinner from "../components/generic/icons/spinner.svg";
import TableMain from "../components/main/mainTable/TableMain";
import { CryptFromFetch } from "../types";
import Button from "../components/generic/button/Button";

import { useQuery } from "@apollo/client";
import { GET_ALL_CRYPTS } from "../lib/query/crypt";

export default function Main({ loading }: { loading: boolean }) {
  const { data, error } = useQuery(GET_ALL_CRYPTS);

  const [dataToShow, setDataToShow] = useState<Array<CryptFromFetch>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * 10;

    !loading &&
      setDataToShow(data.getAllCrypts.slice(startIndex, startIndex + 10));
  }, [currentPage, data, loading]);

  function nextPage() {
    currentPage !== Math.ceil(data.getAllCrypts.length / 10) &&
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
      {loading ? (
        <img className="preloader__item" src={spinner} alt="spinner" />
      ) : (
        <div>
          <TableMain dataToShow={dataToShow} />

          <section className="pagination">
            <Button size="sm" buttonType="next__prev" onClick={prevPage}>
              Prev
            </Button>
            {[...Array(Math.ceil(data.getAllCrypts.length / 10)).keys()].map(
              (page: number) => {
                return (
                  <Button
                    key={page}
                    size="sm"
                    buttonType="pagination__item"
                    onClick={(e) => changePage(e)}
                    active={page + 1 === currentPage}
                  >
                    {page + 1}
                  </Button>
                );
              }
            )}
            <div className="current__page">{currentPage}</div>
            <Button size="sm" buttonType="next__prev" onClick={nextPage}>
              Next
            </Button>
          </section>
        </div>
      )}
    </main>
  );
}
