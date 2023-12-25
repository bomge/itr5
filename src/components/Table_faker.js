import * as React from "react";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";

import { CSVLink } from "react-csv";

import { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

import seedrandom from "seedrandom";

import {
  addRandomCharacter,
  deepClone,
  deleteRandomCharacter,
  swapRandomCharacters,
  alphabet,
} from "../utils/util";
import { genFaker, changeFakerSeed } from "../service/genFaker";
import {columnsTH,regionOptions,colums,regions} from '../constants/constants'


seedrandom(1, { global: true });

let initArr = genFaker(10, regions[0].locale);
export default function InfiniteLoadingGrid() {
  const [loading, setLoading] = useState(false);
  const [loadedRows, setLoadedRows] = useState(initArr);
  const [initData, setInitData] = useState(initArr);


  const mounted = useRef(true);

  const loadNewRows = async (newRowLength) => {
    setLoading(true);
    const newData = genFaker(newRowLength, region, loadedRows.length);

    if (mounted.current) {
      setLoading(false);
      setLoadedRows(loadedRows.concat(newData));
      setInitData(initData.concat(newData));
    }
  };

  const handleOnRowsScrollEnd = (params) => {
    loadNewRows(10);
  };

  useEffect(() => {
    return () => {
      mounted.current = true;
    };
  }, []);

  const [region, setRegion] = useState(regions[0].locale);
  const [errorRate, setErrorRate] = useState(1);
  const [randomSeed, setRandomSeed] = useState(1);


  function genErrors() {
    const wholeNumber = Math.floor(errorRate);
    const fractionalPart = errorRate - wholeNumber;

    const applyErrors = (row) => {
      for (
        let i = 0;
        i < wholeNumber ||
        (fractionalPart > 0 && Math.random() < fractionalPart);
        i++
      ) {
        const randomIndex = Math.floor(Math.random() * colums.length);
        const randColumn = colums[randomIndex];
        const type = Math.floor(Math.random() * 3);
        if (type === 0) {
          row[randColumn] = deleteRandomCharacter(row[randColumn]);
        } else if (type === 1) {
          row[randColumn] = addRandomCharacter(row[randColumn], alphabet);
        } else {
          row[randColumn] = swapRandomCharacters(row[randColumn]);
        }
      }

      return row;
    };

    const clonedRows = deepClone(initData); // Deep clone the array
    const updatedRows = clonedRows.map((row) => applyErrors(row));


    setLoadedRows(updatedRows);

   
  }

  useEffect(() => {
    seedrandom(randomSeed, { global: true });
    genErrors();
  }, [errorRate, initData]);

  useEffect(() => {
    changeFakerSeed(randomSeed);
    seedrandom(randomSeed, { global: true });
    let arr = genFaker(20, region);
    setLoadedRows(arr);
    setInitData(arr);
  }, [region, randomSeed]);

  function generateRandomSeed() {
    let randSeed = Math.floor(Math.random() * 8999999 + 1000000);
    seedrandom(randSeed, { global: true });
    changeFakerSeed(randSeed);
    setRandomSeed(randSeed);
  }

  const csvData = [
    ["ID", "Identifier", "Name", "Adres", "Phone"],
    ...loadedRows.map(({ id, name, identifier, address, phone }) => [
      id,
      identifier,
      address,
      name,
      phone,
    ]),
  ];

  const header = () => (
    <div className="flex items-center justify-between bg-slate-200 max-h-12">
      <div className="flex items-center">
        <span className="mr-2">Region:</span>
        <div className="mt-3 mb-3">
          <Dropdown
            className="border border-black px-2 h-10 text-sm min-w-52"
            panelClassName="w-48"
            value={region}
            options={regionOptions}
            onChange={(e) => setRegion(e.value)}
            placeholder="Select Region"
          />
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-4">Errors:</span>
        <Slider
          panelClassName="border border-black"
          className="border-black border w-24 mr-5"
          value={errorRate}
          min={0}
          max={10}
          step={0.25}
          onChange={(e) => {
            setErrorRate(e.value);
            changeFakerSeed(e.value);
            seedrandom(randomSeed, { global: true });
          }}
        />
        <InputNumber
          maxFractionDigits={2}
          max={1000}
          min={0}
          className="w-24"
          inputClassName="border border-black black w-24"
          value={errorRate}
          onValueChange={(e) => {
            setErrorRate(e.value);
            changeFakerSeed(e.value);
            seedrandom(randomSeed, { global: true });
          }}
        />
      </div>
      <div className="flex items-center">
        <span className="mr-2">Seed:</span>
        <InputNumber
          format={false}
          className="w-24"
          inputClassName="border border-black black w-24"
          value={randomSeed}
          onChange={(e) => {
            setRandomSeed(e.value);
            changeFakerSeed(e.value);
            seedrandom(e.value, { global: true });
          }}
        />
        <Button
          icon={
            <FontAwesomeIcon icon={faShuffle} style={{ color: "#3b71ce" }} />
          }
          className="p-button p-button-text border border-black mr-0"
          onClick={() => generateRandomSeed()}
        />
      </div>
      <CSVLink
        className="bg-blue-400 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
        filename="task5.csv"
        data={csvData}
      >
        Export to CSV
      </CSVLink>
    </div>
  );

  
  return (
    <div style={{ height: "91vh", width: "100wh" }}>
      <div className="mb-4">{header()}</div>

      <DataGridPro
        columns={columnsTH}
        rows={loadedRows}
        loading={loading}
        onRowsScrollEnd={handleOnRowsScrollEnd}
        className=""
        col
        disableColumnMenu
        sx={{
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.columnHeader}`]: {
            "background-color": "rgb(243 244 246)",
          },
        }}
      />
    </div>
  );
}
