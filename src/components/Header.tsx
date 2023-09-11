import { useState } from 'react';
import '../assets/Header.css';
import { useCategory } from './CategoryContext'; // Importing useCategory hook

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
  const { changeCategory } = useCategory(); // Getting changeCategory from the context

  
  const [dropdown, setDropdown] = useState(false);
  
  const [programming, setProgramming] = useState(false);
  const [pun, setPun] = useState(false);
  const [spooky, setSpooky] = useState(false);
  const [christmas, setChristmas] = useState(false);
  const [category, setCategory] = useState('')
  
  // a quick check to initiate the category to 'Category'
  if (!programming && category == '') {
    changeCategory('Category')
  }

  function handleDropdown() {
    setDropdown(!dropdown);
  }
  
  function handleCheck({checked, categoryType, setChecked}: any) {
    setProgramming(false);
    setPun(false);
    setSpooky(false);
    setChristmas(false);
    setChecked(!checked);
    setCategory(categoryType)

    setDropdown(false);

    const wasProgramming = programming == true && categoryType == 'Programming';
    const wasPun = pun == true && categoryType == 'Pun';
    const wasSpooky = spooky == true && categoryType == 'Spooky';
    const wasChristmas = christmas == true && categoryType == 'Christmas';

    // checks if the user unchecked a category - if so, set category to 'Category'.
    if (wasProgramming || wasPun || wasSpooky || wasChristmas) {
      changeCategory('Category');
    } else {
      changeCategory(categoryType);
    }
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
            <Checkbox name="Programming" checked={programming} onChange={() => handleCheck({ checked: programming, categoryType: 'Programming', setChecked: setProgramming })}/>
            <Checkbox name="Pun" checked={pun} onChange={() => handleCheck({ checked: pun, categoryType: 'Pun', setChecked: setPun })}/>
            <Checkbox name="Spooky" checked={spooky} onChange={() => handleCheck({ checked: spooky, categoryType: 'Spooky', setChecked: setSpooky })}/>
            <Checkbox name="Christmas" checked={christmas} onChange={() => handleCheck({ checked: christmas, categoryType: 'Christmas', setChecked: setChristmas })}/>
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