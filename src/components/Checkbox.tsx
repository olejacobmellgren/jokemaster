type CheckboxProps = {
  name: string;
  checked: boolean;
  onChange: () => void;
};

function Checkbox({ name, checked, onChange }: CheckboxProps) {
  return (
    <>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {name}
      </label>
    </>
  );
}

export default Checkbox;
