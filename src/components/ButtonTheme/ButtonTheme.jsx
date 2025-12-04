import { useContext } from "react";
import "./ButtonTheme.css";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ButtonTheme() {
  const { dark, changeTheme } = useContext(ThemeContext);

  return (
    <button className="theme-btn" onClick={changeTheme}>
      {dark ? <Moon color="white" /> : <Sun color="orange" />}
    </button>
  );
}
