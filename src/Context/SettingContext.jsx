import { createContext, useContext, useState } from "react";

let settingContext = createContext();

export let GetSetting = () => useContext(settingContext);

export default function SettingProvider({ children }) {
  let [setting, setSetting] = useState({});
  let value = { setting };
  return (
    <settingContext.Provider value={value}>{children}</settingContext.Provider>
  );
}
