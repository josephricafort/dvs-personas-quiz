import "./index.css";

import Quiz from "./containers/Quiz";
import Result from "./containers/Result";
import content from "./content/content.json";

function App() {
  return (
    <div className="bg-slate-200 pt-20">
      <Quiz content={content} />
      <Result content={content} />
    </div>
  );
}

export default App;
