import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

interface Props<T> {
  elementName: string;
  elementPluralName: string;
  all: T[];
  selected: number[];
  setSelected: (selected: number[]) => void;
}

function ReportSelectElement<T>({
  elementName,
  elementPluralName,
  all,
  selected,
  setSelected,
}: Props<T>) {
  const [inputName, setInputName] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleDeleteItem = (itemId: number) => {
    setSelected(selected.filter((id) => id !== itemId));
  };

  const handleAddItem = (itemId: number) => {
    setSelected([...selected, itemId]);
  };

  const itemsUnselected = useMemo(() => {
    return all.filter((item) => !selected.includes((item as any).id));
  }, [all, selected]);

  const itemsFiltered = useMemo(() => {
    return itemsUnselected.filter((item) =>
      (item as any).name
        .toLocaleLowerCase()
        .includes(inputName.toLocaleLowerCase())
    );
  }, [itemsUnselected, inputName]);

  return (
    <>
      <div className="py-1">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <div className="flex">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowSearch(!showSearch);
                }}
                className="mr-2 inline-flex items-center justify-center w-1/2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Filtrar {elementPluralName}
              </button>
              {selected.length === 0 && (
                <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-900 dark:text-gray-300">
                  No hay {elementPluralName} seleccionados
                </span>
              )}
              {selected.map((itemId) => (
                <span
                  key={itemId}
                  id="badge-dismiss-default"
                  className="inline-flex items-center px-2 py-1 my-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-100"
                >
                  {(all.find((item) => (item as any).id == itemId) as any).name}
                  <button
                    onClick={() => handleDeleteItem(itemId)}
                    type="button"
                    className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-100"
                    data-dismiss-target="#badge-dismiss-default"
                    aria-label="Remove"
                  >
                    <svg
                      className="w-2 h-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
          {showSearch && (
            <div className="col-span-4">
              <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                Filtrar nuevos {elementPluralName}
              </label>

              {itemsUnselected.length == 0 && (
                <p className="text-red-500 text-base italic">
                  No hay nuevos {elementPluralName} disponibles para filtrar
                </p>
              )}
              {itemsUnselected.length >= 1 && (
                <>
                  <input
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={"Buscar " + elementPluralName}
                  />
                  {itemsFiltered.length >= 1 && (
                    <p className="text-gray-500 mt-2 text-base italic">
                      Selecciona el {elementName} que quieres filtrar
                    </p>
                  )}
                  <div className="rounded-md mt-2 max-h-40 overflow-x-hidden overflow-y-auto border-blue-200 border w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 bg-gray-100 dark:bg-gray-900">
                    {itemsFiltered.length === 0 && (
                      <span className="w-full italic inline-flex px-2 py-1 me-2 text-sm text-gray-800 dark:text-gray-300">
                        No hay {elementPluralName} con ese nombre
                      </span>
                    )}
                    {itemsFiltered.map((item) => (
                      <span
                        onClick={() => handleAddItem((item as any).id)}
                        key={(item as any).id}
                        className="w-full inline-flex px-2 py-1 me-2 text-sm font-medium text-gray-800 dark:text-gray-300 cursor-pointer"
                      >
                        {(item as any).name}
                        <FontAwesomeIcon
                          icon="plus"
                          className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-auto"
                        />
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default ReportSelectElement;
