import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export const PasswordGenerator = ({}: {}) => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [upperCaseChecked, setUpperCaseChecked] = useState(true);
  const [lowerCaseChecked, setLowerCaseChecked] = useState(true);
  const [numberChecked, setNumberChecked] = useState(true);
  const [symbolChecked, setSymbolChecked] = useState(true);
  const [securityPercent, setSecurityPercent] = useState(0);

  const generatePassword = () => {
    const lowercaseChars = "abcdefghjkmnpqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numberChars = "123456789";
    const symbolChars = "?!@&*()[]";

    let chars = "";
    if (upperCaseChecked) chars += upperCaseChars;
    if (lowerCaseChecked) chars += lowercaseChars;
    if (numberChecked) chars += numberChars;
    if (symbolChecked) chars += symbolChars;

    let newPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      newPassword += chars.charAt(randomNumber);
    }

    setPassword(newPassword);
    calculateQuality(newPassword);
  };

  const calculateQuality = (newPassword: string) => {
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false;
    let hasSymbol = false;

    for (let i = 0; i < newPassword.length; i++) {
      const char = newPassword.charAt(i);
      if (char.match(/[A-Z]/)) hasUpperCase = true;
      if (char.match(/[a-z]/)) hasLowerCase = true;
      if (char.match(/[0-9]/)) hasNumber = true;
      if (char.match(/[?!@&*()[\]]/)) hasSymbol = true;
    }

    let securityPercent = 0;
    if (hasUpperCase) securityPercent += 10;
    if (hasLowerCase) securityPercent += 10;
    if (hasNumber) securityPercent += 15;
    if (hasSymbol) securityPercent += 15;
    securityPercent += newPassword.length * 2;

    setSecurityPercent(Math.min(securityPercent, 100));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    passwordLength,
    upperCaseChecked,
    lowerCaseChecked,
    numberChecked,
    symbolChecked,
  ]);

  return (
    <>
      <section className="flex flex-col items-center  p-8">
        <h1 className="text-4xl font-bold">Password Generator</h1>
        <p className="text-2xl font-bold">Generate a random password</p>
      </section>

      <section className="rounded-t-lg bg-white shadow-lg text-black p-4">
        <input
          type="text"
          name="password"
          id="password"
          value={password}
          className="text-2xl cursor-default h-12 mr-6 pointer-events-none"
          readOnly
        />
        <button className="mr-4" onClick={copyToClipboard}>
          <ContentCopyIcon />
        </button>
        <button onClick={generatePassword}>
          <AutorenewIcon />
        </button>
      </section>
      <div
        className="w-full bg-gray-200 rounded-b-lg h-2.5 "
        style={
          securityPercent > 69
            ? { background: "#50c878 " }
            : securityPercent > 50
            ? { background: "#FBBF24" }
            : { background: "#EF4444" }
        }
      />
      <section className="w-full flex justify-between p-2 text-sm ">
        <p className="percentage">{securityPercent}%</p>
        <p className="description">
          {securityPercent > 69
            ? "Good"
            : securityPercent > 50
            ? "Medium"
            : "Weak"}
        </p>
      </section>

      <section className="flex flex-col items-center rounded-lg bg-white text-black px-6 pb-3">
        <h3
          className="
          text-2xl font-bold
          p-2
          border-b-2
          border-gray-300
          mb-4
        "
        >
          Customize
        </h3>
        <div className="flex w-fit ">
          <div className="flex flex-col items-center justify-center mr-10">
            <p>
              Size: <span id="password-length-text">{passwordLength}</span>
            </p>
            <input
              type="range"
              name="password-length"
              id="password-length"
              className="slider"
              value={passwordLength}
              min="12"
              max="24"
              onChange={(e) => {
                setPasswordLength(parseInt(e.target.value));
                generatePassword();
              }}
            />
          </div>
          <div className="flex flex-col   ">
            <div className="m-1 flex items-center">
              <input
                className="mr-2 w-5 h-5"
                type="checkbox"
                id="uppercase-check"
                checked={upperCaseChecked}
                onChange={() => setUpperCaseChecked(!upperCaseChecked)}
              />
              <span className="text">Uppercase</span>
            </div>

            <div className="m-1 flex items-center">
              <input
                className="mr-2 w-5 h-5"
                type="checkbox"
                id="uppercase-check"
                checked={lowerCaseChecked}
                onChange={() => setLowerCaseChecked(!lowerCaseChecked)}
              />
              <span className="text">Lowercase</span>
            </div>

            <div className="m-1 flex items-center">
              <input
                className="mr-2 w-5 h-5"
                type="checkbox"
                id="number-check"
                checked={numberChecked}
                onChange={() => setNumberChecked(!numberChecked)}
              />
              <span className="text">Numbers</span>
            </div>

            <div className="m-1 flex items-center">
              <input
                className="mr-2 w-5 h-5"
                type="checkbox"
                id="symbol-check"
                checked={symbolChecked}
                onChange={() => setSymbolChecked(!symbolChecked)}
              />
              <span className="text">Symbols</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
