import React from "react";

const Result = ({ content }) => {
  const { results } = content;

  return (
    <div className="mx-auto max-w-screen-md bg-white p-10">
      <div className="flex justify-center p-5">
        <input
          type="button"
          value={results.btn}
          className="text-lg bg-emerald-400 px-4 py-2 rounded-lg m-2 max-w-full grow"
        />
      </div>
      <div>
        <div className="flex-col justify-center text-center text-xl">
          <p>{results.label}</p>
          <h3 className="text-3xl">The Tableau Master</h3>
          <p>Junior - Analytical - Wellpaid - Associate</p>
          <div className="h-40 w-40 bg-amber-400 rounded-full my-10 mx-auto"></div>
        </div>
        <div>
          <p className="text-xl my-5">3.5%{results.pp.percSame}</p>
          <p className="text-xl my-5">
            {results.pp.nthSame1}
            3rd most rare
            {results.pp.nthSame2}
          </p>
          <p className="text-xl my-5">{results.pp.learnMore}</p>
        </div>
        <div className="flex justify-center p-5">
          <input
            type="button"
            className="text-lg bg-emerald-400 px-4 py-2 rounded-lg m-2 max-w-full grow"
            value={results.btns.fullReport}
          />
          <input
            type="button"
            className="text-lg bg-emerald-400 px-4 py-2 rounded-lg m-2 max-w-full grow"
            value={results.btns.retake}
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
