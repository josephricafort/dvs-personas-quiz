import React from "react";

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

const Quiz = ({ content }) => {
  const { header, intro, quiz } = content;

  return (
    <div className="mx-auto max-w-screen-md bg-white pt-10 px-10 pb-5 border-b-2">
      <div>
        <h1 className="font-bold text-5xl mb-3">{header.title}</h1>
        <p className="text-2xl">{header.subtitle}</p>
        <p className="text-lg">{header.byline}</p>
      </div>
      <div className="my-10">
        <div>
          <p className="text-xl">{intro.p}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl">{quiz.qIntro}</h2>
        {quiz.qItems.map((qItem, qItemIdx) => {
          return (
            <div key={qItemIdx} className="my-10 last:mb-0">
              <h4 className="text-xl">
                <span>{qItemIdx + 1}. </span>
                {qItem.q}
              </h4>
              <div className="w-full mt-5">
                {qItem.table && <Table data={qItem.table} />}
              </div>
              <div className="flex justify-center pt-2 px-5">
                {qItem.a.map((an, anIdx) => (
                  <input
                    type="button"
                    key={anIdx}
                    value={an}
                    className="text-lg bg-emerald-400 px-4 py-2 rounded-lg m-2 grow"
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
