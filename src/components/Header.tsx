import { useState, useEffect } from 'react';
import '../assets/Header.css';

type CheckboxProps = {
  name: string;
  checked: boolean;
  onChange: () => void;
};

function Checkbox({ name, checked, onChange }: CheckboxProps) {
  return (
    <>
      <label>
        <input 
        type="checkbox"
        checked={checked}
        onChange={onChange}
        />
        {name}
      </label>
    </>
  )
}

function Header() {
  const [dropdown, setDropdown] = useState(false);

  const [programming, setProgramming] = useState(false);
  const [pun, setPun] = useState(false);
  const [spooky, setSpooky] = useState(false);
  const [christmas, setChristmas] = useState(false);

  useEffect(() => {
    localStorage.setItem("Category", getCategory())
  }, [dropdown])

  function handleDropdown() {
    setDropdown(!dropdown);
  }
  
  function handleCheck({checked, setChecked}: any) {
    setProgramming(false);
    setPun(false);
    setSpooky(false);
    setChristmas(false);
    setChecked(!checked);
    setDropdown(false);
  }

  function getCategory() {
    if (programming) {
      return "Programming";
    } else if (pun) {
      return "Pun";
    } else if (spooky) {
      return "Spooky";
    } else if (christmas) {
      return "Christmas";
    } else {
      return "Category";
    }
  }

  return (
    <>
      <div className="Header">
        <div>
          <button className="DropdownButton" onClick={handleDropdown}>{getCategory()}</button>
        </div>
        {dropdown ? 
          <div className="Dropdown">
            <Checkbox name="Programming" checked={programming} onChange={() => handleCheck({ checked: programming, setChecked: setProgramming })}/>
            <Checkbox name="Pun" checked={pun} onChange={() => handleCheck({ checked: pun, setChecked: setPun })}/>
            <Checkbox name="Spooky" checked={spooky} onChange={() => handleCheck({ checked: spooky, setChecked: setSpooky })}/>
            <Checkbox name="Christmas" checked={christmas} onChange={() => handleCheck({ checked: christmas, setChecked: setChristmas })}/>
          </div> : null}
        <p>
          JOKEMASTER-3000
        </p>
        <button className="DarkmodeButton">DarkMode</button>
      </div>
    </>
  )
}

export default Header;