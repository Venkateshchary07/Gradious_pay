import './SelectMenu.css';
import { useNavigate } from "react-router-dom";

function SelectMenu({ label, options }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selected = options.find(o => o.text === e.target.value);
    if (selected && selected.path){
      navigate(selected.path);
    }
  };

  return (
    <div className="select-wrapper">
      <select className="custom-select" onChange={handleChange}>
        <option className="option-label">{label}</option>

        {options.map((item, index) => (
          <option key={index} value={item.text}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectMenu;
