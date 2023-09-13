import React, { useState } from 'react';
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
  const [Dropdown, setDropdown] = useState(false);

  const [Programming, setProgramming] = React.useState(false);
  const [Misc, setMisc] = React.useState(false);
  const [Dark, setDark] = React.useState(false);
  const [Pun, setPun] = React.useState(false);
  const [Spooky, setSpooky] = React.useState(false);
  const [Christmas, setChristmas] = React.useState(false);

  function handleDropdown() {
    // const dropdownButton = document.querySelector(".DropdownButton") as HTMLElement;
    setDropdown(!Dropdown);
    // if (Dropdown) {
    //   dropdownButton.classList.remove("shadowed");
    // }
  }
  
  function handleCheck({checked, setChecked}: any) {
    setProgramming(false);
    setMisc(false);
    setDark(false);
    setPun(false);
    setSpooky(false);
    setChristmas(false);
    setChecked(!checked);
    handleDropdown();
  }

  function getCategory() {
    if (Programming) {
      return "Programming";
    } else if (Misc) {
      return "Misc";
    } else if (Dark) {
      return "Dark";
    } else if (Pun) {
      return "Pun";
    } else if (Spooky) {
      return "Spooky";
    } else if (Christmas) {
      return "Christmas";
    } else {
      return "Category";
    }
  }

  return (
    <>
      <div className="Header">
        <div className="DropdownButtonWrapper">
          <button className="DropdownButton" onClick={handleDropdown}><label className="DdBlabel">{getCategory()}</label><i className="arrow"></i></button>
          {Dropdown ? 
          <div className="Dropdown">
            <Checkbox name="Programming" checked={Programming} onChange={() => handleCheck({ checked: Programming, setChecked: setProgramming })}/>
            <Checkbox name="Misc" checked={Misc} onChange={() => handleCheck({ checked: Misc, setChecked: setMisc })}/>
            <Checkbox name="Dark" checked={Dark} onChange={() => handleCheck({ checked: Dark, setChecked: setDark })}/>
            <Checkbox name="Pun" checked={Pun} onChange={() => handleCheck({ checked: Pun, setChecked: setPun })}/>
            <Checkbox name="Spooky" checked={Spooky} onChange={() => handleCheck({ checked: Spooky, setChecked: setSpooky })}/>
            <Checkbox name="Christmas" checked={Christmas} onChange={() => handleCheck({ checked: Christmas, setChecked: setChristmas })}/>
          </div> : null}
        </div>
        <div className="Logo">
          <p>JOKEMASTER-3000</p>
        </div>
        <button className="DarkmodeButton">DarkMode</button>
      </div>
    </>
  )
}

export default Header;