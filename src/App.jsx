import "./tailwind.css";
import About from "./components/About";
import Home from "./components/Home";
import { auth } from "./../firebase-config";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  const [currentList, setCurrentList] = useState("defaultBluthumbProblems");
  const [listLoading, setListLoading] = useState(false);
  const [percentages, setPercentages] = useState([0, 0, 0]);
  const [user, setUser] = useState(null);
  const [savedDarkMode] = useState(localStorage.getItem("dark_Mode"));
  const [darkMode, setDarkMode] = useState(
    savedDarkMode ? Boolean(JSON.parse(savedDarkMode)) : false
  );

  useEffect(() => {
    const storedDarkMode = JSON.parse(window.localStorage.getItem("dark_Mode"));
    if (darkMode !== null) {
      setDarkMode(storedDarkMode);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setCurrentList("bluthumb300");
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootLayout
            currentList={currentList}
            setCurrentList={setCurrentList}
            setListLoading={setListLoading}
            user={user}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      >
        <Route
          index
          element={
            <div>
              <Home
                currentList={currentList}
                setCurrentList={setCurrentList}
                listLoading={listLoading}
                percentages={percentages}
                setPercentages={setPercentages}
                user={user}
                darkMode={darkMode}
              />
            </div>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />
      </Route>
    </Routes>
  );
}

export default App;
