import React, { useState, useEffect } from "react";

const Result = ({ content, data, methods }) => {
  const { results } = content;
  const { persona, mainIndFct, isResultsComplete, isResultsShown } = data;
  const { setIsResultsShown, handleReset } = methods;
  const [expFct, roleFct, incFct, comFct] = mainIndFct;

  const [resultsBtnVal, setResultsBtnVal] = useState(results.btn.completeShow);

  const getResultBtnStyles = {
    opacity: isResultsComplete ? 1 : 0.5,
    color: isResultsComplete ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
  };

  useEffect(() => {
    setResultsBtnVal(results.btn.completeShow);
  }, [isResultsComplete]);

  const handleShowClick = () => {
    if (isResultsComplete) {
      setIsResultsShown(!isResultsShown);
      if (isResultsShown) setResultsBtnVal(results.btn.completeShow);
      else setResultsBtnVal(results.btn.completeHide);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md bg-white p-10">
      <div className="flex justify-center p-5">
        <input
          type="button"
          value={resultsBtnVal}
          className="text-lg bg-emerald-400 px-4 py-2 rounded-lg m-2 max-w-full grow cursor-pointer opacity-100 hover:opacity-80"
          style={getResultBtnStyles}
          onClick={handleShowClick}
          disabled={!isResultsComplete}
        />
      </div>
      {isResultsShown && (
        <div>
          <div className="flex-col justify-center text-center text-lg">
            <p className="mb-5">{results.label}</p>
            <div className="flex justify-center">
              <img
                src={require(`../assets/images/avatars/${expFct}-${roleFct}-${incFct}-${comFct}.png`)}
                className="h-52"
              />
            </div>
            <h3 className="text-3xl mt-3">{persona.name}</h3>
            <p>{persona.id}</p>
          </div>
          <div>
            <p className="text-lg my-5">
              <span className="font-bold">{persona.percent.toFixed(2)}%</span>
              {results.pp.percSame}
            </p>
            <p className="text-lg my-5">
              {results.pp.nthSame1}
              <span className="font-bold">
                {persona.rank} {persona.rarity}
              </span>
              {results.pp.nthSame2}
            </p>
          </div>
          <div className="flex-wrap justify-center">
            <h3 className="text-xl font-bold">{results.pp.charttools}:</h3>
            <img
              src={require(`../assets/images/charttools/charttools-${expFct}-${roleFct}-${incFct}-${comFct}.svg`)}
              className="mx-auto"
            />
            <h3 className="text-xl font-bold">{results.pp.chartindustry}:</h3>
            <img
              src={require(`../assets/images/chartindustry/chartindustry-${expFct}-${roleFct}-${incFct}-${comFct}.svg`)}
              className="mx-auto"
            />
          </div>
          <div>
            <p className="text-lg my-5">{results.pp.learnMore}</p>
          </div>
          <div className="flex justify-center p-5">
            <a
              href="https://dvs-persona-explainer.thelostkite.com/index.nb.html"
              className="grow"
            >
              <div className="grow max-w-full grow flex">
                <input
                  type="button"
                  className="text-lg bg-emerald-400 px-4 py-2 rounded-lg m-2 max-w-full grow cursor-pointer text-white font-bold opacity-100 hover:opacity-80"
                  value={results.btns.fullReport}
                />
              </div>
            </a>
            <input
              type="button"
              className="text-lg bg-emerald-300 px-4 py-2 rounded-lg m-2 max-w-full grow cursor-pointer opacity-100 hover:opacity-80"
              value={results.btns.retake}
              onClick={handleReset}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
