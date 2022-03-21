import React, { useState } from "react";
import { CSVLink } from "react-csv";
function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [show,setShow] = useState(false)
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = (event) => {
        const string = event.target.result;
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        const array = csvRows.map((i) => {
          const values = i.split(",");
          const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
          }, {});
          return obj;
        });
        setArray(array);
      };
      fileReader.readAsText(file);
    }
    setShow(true)
  };
  var records = [];
  for (let i = 0; i < array.length; i++) {
    var key = Object.keys(array[i]);
    let value = Object.values(array[i]);
    var ans = [];
    for (let j = 0; j < key.length; j++) {
      key[j].split(".").includes("myshopify")
        ? ans.push(value[j].split("/").reverse()[0])
        : ans.push(
            value[j]
              .replace("myshop.com", "myshopify.com")
              .split("/")
              .reverse()[0]
              .split("\r")[0]
          );
    }
    records.push(ans);
  }
  const headers = ["Name", "Myshopify Domain", "Domain", "thankfulKey"];
  return (
    <div style={{ margin: 30, textAlign: "center" }}>
      <form>
        <input type={"file"} onChange={handleOnChange} />
      </form>
      <br />
      <button
        onClick={(e) => {
          handleOnSubmit(e);
        }}
      >
        Submit
      </button>
      {show ? (
        <CSVLink data={records} headers={headers} filename={'test.csv'}>
          Click
        </CSVLink>
      ) : null}
      <br />
    </div>
  );
}

export default App;
