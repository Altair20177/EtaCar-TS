import { useEffect, useState } from "react";
import "../components/main/main.scss";

import spinner from "../components/generic/icons/spinner.svg";
import TableMain from "../components/main/mainTable/TableMain";
import { CryptFromFetch } from "../types";
import Button from "../components/generic/button/Button";

import { useQuery } from "@apollo/client";
import { GET_ALL_CRYPTS } from "../lib/query/crypt";

export default function MainPage() {
  const [offset, setOffset] = useState<number>(0);

  const { data, loading, error } = useQuery(GET_ALL_CRYPTS, {
    variables: {
      limit: 10,
      offset: offset,
    },
  });

  const [dataToShow, setDataToShow] = useState<Array<CryptFromFetch>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    !loading && setDataToShow(data.getAllCrypts);

    setOffset((currentPage - 1) * 10);
  }, [currentPage, loading, data]);

  function nextPage() {
    currentPage !== 10 && setCurrentPage(+currentPage + 1);
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
            <Button size="size_sm" buttonType="button_slide" onClick={prevPage}>
              Prev
            </Button>
            {[...Array(10).keys()].map((page: number) => {
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
            })}
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
