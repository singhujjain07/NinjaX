import React, { useState } from 'react'
import CompilerNavbar from '../components/Layout/CompilerNavbar'
import Editor from "@monaco-editor/react";
import spinner from '../spinner.svg'
import Split from 'react-split';
import { fetchFromAPI } from '../utils/fetchFromApi';
import { useLocation } from 'react-router-dom';
import '../styles/Compiler.css'

// Save a reference to the original ResizeObserver
const OriginalResizeObserver = window.ResizeObserver;

// Create a new ResizeObserver constructor
window.ResizeObserver = function (callback) {
  const wrappedCallback = (entries, observer) => {
    window.requestAnimationFrame(() => {
      callback(entries, observer);
    });
  };

  // Create an instance of the original ResizeObserver
  // with the wrapped callback
  return new OriginalResizeObserver(wrappedCallback);
};

// Copy over static methods, if any
for (let staticMethod in OriginalResizeObserver) {
  if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
    window.ResizeObserver[staticMethod] = OriginalResizeObserver[staticMethod];
  }
}

const Compiler = () => {
  // State variable to set users source code
  const location = useLocation();
  const [userCode, setUserCode] = useState(location.state?.c.content?location.state?.c.content:'');
  // State variable to set editors default language
  const [userLang, setUserLang] = useState("python3");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);

  // State variable to set users input
  const [userInput, setUserInput] = useState(null);

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize
  }
  // const [error, setError] = useState('');

  function handleSubmit() {
    setLoading(true);
    fetchFromAPI({ lang: userLang, code: userCode, input: userInput }).then((data) => setUserOutput(data.output)).then(() => setLoading(false))
  }

  function clearOutput() {
    setUserOutput("");
  }

  // Function to handle file input change from Navbar
  const handleFileInputChange = (contents) => {
    setUserCode(contents); // Set the file contents in the state
  };
  return (
    <div className='compiler_app'>
      <CompilerNavbar
        userLang={userLang} setUserLang={setUserLang}
        userTheme={userTheme} setUserTheme={setUserTheme}
        content={userCode}
        c={location.state?.c}
        fontSize={fontSize} setFontSize={setFontSize}
        onFileInputChange={handleFileInputChange}
      />
      <div className="compiler_main m-2">
        <Split className='split' minSize={0}>
          <div className="compiler_left_container me-2">
            <Editor
              options={options}
              height="80vh"
              width="100%"
              theme={userTheme}
              language={userLang}
              defaultLanguage="python"
              defaultValue="# Enter your code here"
              value={userCode}
              onChange={(value) => { setUserCode(value) }}
            />
            <button className="btn run-btn mt-3" onClick={() => handleSubmit()}>
              Run
            </button>
          </div>
          <div className="compiler_right_container ms-2">
            <div>
              <h4>Input:</h4>
              <div className="input-box">
                <textarea id="code-inp" onChange=
                  {(e) => setUserInput(e.target.value)}>
                </textarea>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h4>Output:</h4>
              {loading ? (
                <div className="spinner-box">
                  <img src={spinner} alt="Loading..." />
                </div>
              ) : (
                <div className="output-box">
                  <pre>{userOutput}</pre>
                </div>
              )}
            </div>

            <button onClick={() => { clearOutput() }}
              className="clear-btn btn btn-primary mt-3">
              Clear
            </button>
          </div>
        </Split>
      </div>

    </div>
  )
}

export default Compiler