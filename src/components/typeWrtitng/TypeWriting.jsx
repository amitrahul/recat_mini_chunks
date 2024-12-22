import { useEffect, useState } from "react";

const TypeWriting = () => {
  const [userText, setUserText] = useState("");
  const [finalTextValue, setFinalTextValue] = useState("");
  const [isShow, setIsShow] = useState(false);
  let intervalid = "";
  const handleUserInput = (e) => {
    setUserText(e.target.value);
  };

  const handleTextResult = () => {
    /**
     * * isShow, is used to handle not generate writing effect multple times on same text.
     */
    if (isShow) return;
    if (userText.length > 0) {
      setIsShow(true);
      let i = -1;
      intervalid = setInterval(() => {
        i++;
        if (i === userText.length - 1) clearInterval(intervalid);
        setFinalTextValue((prevText) => prevText + userText[i]);
      }, 500);
    }
  };

  const handleResetResult = () => {
    setIsShow(false);
    setUserText("");
    setFinalTextValue("");
    clearInterval(intervalid);
  };
  /*
   * whenever component is unmounted,then we have to clear the timer.
   * so used the useEffect here.
   */

  useEffect(() => {
    clearInterval(intervalid);
  });

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="enter text here"
          value={userText}
          onChange={handleUserInput}
        />
        <button onClick={handleTextResult}>Generate writing Effect</button>
        <button onClick={handleResetResult}>Reset</button>
      </div>
      <p>Text value : {finalTextValue?.toUpperCase()} </p>
    </>
  );
};

export default TypeWriting;
