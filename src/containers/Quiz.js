import React from "react";

const Button = ({ value, setValue, stateValue, isDisabled }) => {
  const handleClick = (e) => {
    setValue(e.target.value);
  };

  const styles = {
    backgroundColor:
      value === stateValue ? "rgb(16 185 129)" : "rgb(110 231 183)",
    color: value === stateValue ? "rgb(255 255 255)" : "rgb(0 0 0)",
    fontWeight: value === stateValue ? "700" : "500",
    opacity: isDisabled ? 0.5 : 1,
  };

  return (
    <input
      type="button"
      value={value}
      className="grow text-lg bg-emerald-400 px-4 py-2 rounded-lg m-2 cursor-pointer opacity-100 hover:opacity-80 w-full md:w-max"
      onClick={handleClick}
      style={styles}
      disabled={isDisabled}
    />
  );
};

const Table = ({ data }) => {
  const { headers, rows } = data;
  return (
    <table className="w-full border-y-2 text-lg">
      <thead>
        <tr className="border-y-2">
          {headers.map((header, headerIdx) => (
            <th key={headerIdx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, cellIdx) => (
              <td className="text-center" key={cellIdx}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Quiz = ({ content, data, methods }) => {
  const { header, intro, quiz } = content;
  const { mainIndicators, isResultsComplete, isResultsShown } = data;

  return (
    <div className="mx-auto max-w-screen-md bg-white border-b-2 p-10">
      <div className="text-center">
        <div className="">
          <img
            src={require("../assets/images/cover.png")}
            className="mb-10 px-10 pt-0"
          />
        </div>
        <h1 className="font-bold text-5xl mb-3">{header.title}</h1>
        <p className="text-2xl mb-5">{header.subtitle}</p>
        <p className="text-lg ">{header.byline}</p>
      </div>
      <div className="my-10">
        <div>
          <p className="text-lg">{intro.p}</p>
        </div>
      </div>
      <div>
        <h2 className="text-lg">{quiz.qIntro}</h2>
        {quiz.qItems.map((qItem, qItemIdx) => {
          return (
            <div key={qItemIdx} className="my-10 last:mb-0">
              <h4 className="text-lg">
                <span>{qItemIdx + 1}. </span>
                {qItem.q}
              </h4>
              <div className="w-full mt-5">
                {qItem.table && <Table data={qItem.table} />}
              </div>
              <div className="flex-wrap md:flex justify-center pt-2 px-5">
                {qItem.a.map((an, anIdx) => (
                  <Button
                    key={anIdx}
                    value={an}
                    setValue={methods[qItemIdx]}
                    stateValue={mainIndicators[qItemIdx]}
                    isDisabled={isResultsComplete && isResultsShown}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
