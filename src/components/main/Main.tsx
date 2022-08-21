import { useEffect, useState } from "react";
import "./main.scss";

import spinner from "../generic/genericIcons/spinner.svg";
import TableMain from "./mainTable/TableMain";
import { CryptFromFetch } from "../../types";
import { useAppSelector } from "../../hooks";
import Button from "../generic/genericButton/Button";

export default function Main() {
  const tableData = useAppSelector((state) => state.mainPage);

  const [dataToShow, setDataToShow] = useState<Array<CryptFromFetch>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * 10;

    setDataToShow(tableData.slice(startIndex, startIndex + 10));
  }, [currentPage, tableData]);

  function nextPage() {
    currentPage !== Math.ceil(tableData.length / 10) &&
      setCurrentPage(+currentPage + 1);
  }

  function prevPage() {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  }

  function changePage(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!(e.target instanceof HTMLElement)) return;
    setCurrentPage(e.target.textContent ? +e.target.textContent : 1);
  }

  return (
    <main className="content main">
      <h2 className="title">All Cryptocurrency</h2>
      {!tableData.length ? (
        <img className="preloader__item" src={spinner} alt="spinner" />
      ) : (
        <div>
          <TableMain dataToShow={dataToShow} />

          <section className="pagination">
            <Button size="sm" type="next__prev" onClick={prevPage}>
              Prev
            </Button>
            {[...Array(Math.ceil(tableData.length / 10)).keys()].map(
              (page: number) => {
                return (
                  <Button
                    key={page}
                    size="sm"
                    type="pagination__item"
                    onClick={(e) => changePage(e)}
                    active={page + 1 === currentPage}
                  >
                    {page + 1}
                  </Button>
                );
              }
            )}
            <div className="current__page">{currentPage}</div>
            <Button size="sm" type="next__prev" onClick={nextPage}>
              Next
            </Button>
          </section>
        </div>
      )}
    </main>
  );
}
