import { useEffect, useState } from "react";
import axios from "axios";
import { toTitleCase } from "./utils";
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

  const expFct = experience === "Less than 6 years" ? "junior" : "senior";
  const roleFct = role === "More analytical" ? "analytical" : "creative";
  const incFct = incomeGp === "Less than USD 81K" ? "humblypaid" : "wellpaid";
  const comFct =
    commitment === "More as an Associate" ? "associate" : "independent";

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/josephricafort/dataviz-state-2021-entry/main/01_exploration/data/processed/tribe_tally.json"
    )
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data);
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
  const matchPersona = personasData.filter((persona) => {
    const { experience, roleType, incomeGroup, commitment } = persona;

    return (
      experience === expFct &&
      roleType === roleFct &&
      incomeGroup === incFct &&
      commitment === comFct
    );
  });
  console.log(matchPersona);

  useEffect(() => {
    if (matchPersona) {
      setPersona({ id, name: matchPersona[0].personaName });
    }
  }, [personasData, experience, role, incomeGp, commitment]);

  const quizProps = {
    data: [experience, role, incomeGp, commitment],
    methods: [setExperience, setRole, setIncomeGp, setCommitment],
  };
  const resultsProps = {
    persona,
  };

  return (
    <div className="bg-slate-200 pt-20">
      <Quiz content={content} {...quizProps} />
      <Result content={content} {...resultsProps} />
    </div>
  );
}

export default App;
