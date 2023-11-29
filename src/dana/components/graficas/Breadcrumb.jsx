import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-gray-600 font-light" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2">/</span>
            )}
            <span className={index === items.length - 1 ? 'font-semibold' : ''}>
              {item.text}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
