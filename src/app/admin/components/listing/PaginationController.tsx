import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

interface PaginationControllerProps {
  pageIndex: number;
  pageCount: number;
  cursor: Dispatch<SetStateAction<number>>;
}

export default function PaginationController({
  pageIndex,
  pageCount,
  cursor,
}: PaginationControllerProps) {
  function previous() {
    if (pageIndex > 1) cursor((prev) => prev - 1);
  }

  function next() {
    cursor((prev) => prev + 1);
  }

  return (
    <footer className="my-5 flex items-center justify-between">
      <button
        className="btn btn-secondary btn-sm"
        onClick={previous}
        disabled={pageIndex === 1}
      >
        <ChevronLeftIcon className="size-5" />
        Anterior
      </button>
      <span>
        {pageIndex} / {pageCount}{" "}
      </span>
      <button
        className="btn btn-secondary btn-sm"
        onClick={next}
        disabled={pageIndex === pageCount}
      >
        Próxima
        <ChevronRightIcon className="size-5" />
      </button>
    </footer>
  );
}
