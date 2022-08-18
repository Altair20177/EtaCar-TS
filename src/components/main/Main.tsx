import { useEffect, useState } from "react";
import "./main.scss";

import spinner from "../generic/Spinner2.svg";
import Table from "./main-table/Table";
import { CryptFromFetch } from "../../types";
import { useAppSelector } from "../../hooks";

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
          <Table dataToShow={dataToShow} />

          <section className="pagination">
            <div className="pagination-item" onClick={prevPage}>
              <p className="pagination-item__inner">Prev</p>
            </div>
            {[...Array(Math.ceil(tableData.length / 10)).keys()].map(
              (page: number) => {
                return (
                  <div
                    key={page}
                    className={`pagination-item page_number ${
                      page + 1 === currentPage ? "active" : ""
                    }`}
                    onClick={(e) => changePage(e)}
                  >
                    <p className="pagination-item__inner">{page + 1}</p>
                  </div>
                );
              }
            )}
            <div className="current__page">{currentPage}</div>
            <div className="pagination-item" onClick={nextPage}>
              <p className="pagination-item__inner">Next</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
