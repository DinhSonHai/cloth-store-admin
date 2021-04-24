import React from 'react';
import Pagination from 'react-paginating';
// import PropTypes from 'prop-types';

import { FirstPage, Prev, Next, LastPage } from '../../assets/icons';
import './styles.scss';

PaginationComponent.propTypes = {

};

function PaginationComponent({ currentPage, setCurrentPage, total }) {
  const handlePageChange = (page, e) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Pagination
        total={50}
        // limit={limit}
        pageCount={5}
        currentPage={currentPage}
      >
        {({
          pages,
          currentPage,
          hasNextPage,
          hasPreviousPage,
          previousPage,
          nextPage,
          totalPages,
          getPageItemProps
        }) => (
          <div className="page">
            <button
              {...getPageItemProps({
                pageValue: 1,
                onPageChange: handlePageChange,
                className: "first-page"
              })}
            >
              <FirstPage />
            </button>

            {hasPreviousPage && (
              <button
                {...getPageItemProps({
                  pageValue: previousPage,
                  onPageChange: handlePageChange,
                  className: "prev"
                })}
              >
                <Prev />
              </button>
            )}

            {pages.map(page => {
              // let activePage = { backgroundColor: "var(--white)", width: "32px", height: "32px" };
              // if (currentPage === page) {
              //   activePage = { backgroundColor: "#ffa15f", width: "32px", height: "32px", color: "var(--white)" };
              // }
              return (
                <button
                  {...getPageItemProps({
                    pageValue: page,
                    key: page,
                    // style: activePage,
                    onPageChange: handlePageChange,
                    className: currentPage === page ? "page__item page__item--active" : "page__item"
                  })}
                >
                  {page}
                </button>
              );
            })}

            {hasNextPage && (
              <button
                {...getPageItemProps({
                  pageValue: nextPage,
                  onPageChange: handlePageChange,
                  className: "next"
                })}
              >
                <Next />
              </button>
            )}

            <button
              {...getPageItemProps({
                pageValue: totalPages,
                onPageChange: handlePageChange,
                className: "last-page"
              })}
            >
              <LastPage />
            </button>
          </div>
        )}
      </Pagination>
    </div>
  );
}

export default PaginationComponent;