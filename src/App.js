import { useEffect, useState } from "react";
import { toTitleCase, getRank } from "./utils";
import "./index.css";

import Quiz from "./containers/Quiz";
import Result from "./containers/Result";
import content from "./content/content.json";

function App() {
  const [personasData, setPersonasData] = useState([
    {
      experience: "",
      roleType: "",
      incomeGroup: "",
      commitment: "",
      personaName: "",
    },
  ]);

  const [persona, setPersona] = useState({
    id: "",
    name: "",
    percent: 0,
    rank: "",
    rarity: "",
  });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Less than 6 years OR More than 6 years
  const [experience, setExperience] = useState("");
  // More analytical OR More creative
  const [role, setRole] = useState("");
  // Less than USD 81K OR More than USD 18K
  const [incomeGp, setIncomeGp] = useState("");
  // More as an Associate OR More as an Independent
  const [commitment, setCommitment] = useState("");

  const [isResultsShown, setIsResultsShown] = useState(false);

  const expFct = experience === "Less than 6 years" ? "junior" : "senior";
  const roleFct = role === "More analytical" ? "analytical" : "creative";
  const incFct = incomeGp === "Less than USD 81K" ? "humblypaid" : "wellpaid";
  const comFct =
    commitment === "More as an Associate" ? "associate" : "independent";

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/josephricafort/dataviz-state-2021-entry/main/data/processed/tribe_tally.json"
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setPersonasData(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const id = [expFct, roleFct, incFct, comFct]
    .map((fct) => toTitleCase(fct))
    .join(" - ");

  const personaIndex = personasData.findIndex(
    ({ experience, roleType, incomeGroup, commitment }) => {
      return (
        experience === expFct &&
        roleType === roleFct &&
        incomeGroup === incFct &&
        commitment === comFct
      );
    }
  );

  const nRank =
    personaIndex + 1 > 8 ? 17 - (personaIndex + 1) : personaIndex + 1;

  const rarity = personaIndex + 1 > 8 ? "rarest" : "most common";

  useEffect(() => {
    if (personaIndex !== -1) {
      setPersona({
        id,
        name: personasData[personaIndex].personaName,
        percent: personasData[personaIndex].nPerc,
        rank: getRank(nRank),
        rarity,
      });
    }
  }, [personasData, experience, role, incomeGp, commitment]);

  const mainIndicators = [experience, role, incomeGp, commitment];
  const isResultsComplete = mainIndicators.every((d) => d !== "");

  const handleReset = () => {
    setExperience("");
    setRole("");
    setIncomeGp("");
    setCommitment("");
    setIsResultsShown(false);
  };

  const quizProps = {
    data: { mainIndicators, isResultsComplete, isResultsShown },
    methods: [setExperience, setRole, setIncomeGp, setCommitment],
  };
  const resultsProps = {
    data: { persona, mainIndicators, isResultsComplete, isResultsShown },
    methods: { setIsResultsShown, handleReset },
  };

  return (
    <div className="bg-slate-200 pt-20">
      <Quiz content={content} {...quizProps} />
      <Result content={content} {...resultsProps} />
    </div>
  );
}

export default App;
