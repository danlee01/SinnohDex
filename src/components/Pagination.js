import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
 
    const createPage = (number) => {
        if (number === currentPage) {
            return ((
                <li key={number} className="page-item active">
                    <a onClick={() => paginate(number)} href="!#" className="page-link">
                        {number}
                    </a>
                </li>
            ))
        } else {
            return (
                <li key={number} className="page-item ">
                    <a onClick={() => paginate(number)} href="#" className="page-link">
                        {number}
                    </a>
                </li>
            )
        }
    }

    return (
        <nav>
            <ul className="pagination justify-content-center" >
                {pageNumbers.map(number => (
                        createPage(number)
                    ))}
            </ul>
        </nav>
    );
}

export default Pagination;