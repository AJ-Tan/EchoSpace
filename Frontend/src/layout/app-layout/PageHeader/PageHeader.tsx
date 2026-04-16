import { useState } from "react";
import SearchInput from "../../../components/Inputs/SearchInput/SearchInput";
import PrimaryButton1 from "../../../components/Buttons/PrimaryButton/PrimaryButton1";
import "./pageHeaderStyle.css";

function PageHeader() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <header className="page-header">
      <div className="page-logo">
        <span>EchoSpace</span>
      </div>
      <SearchInput
        state={[searchInput, setSearchInput]}
        placeholder={"Find Anything"}
      />
      <PrimaryButton1>Login</PrimaryButton1>
    </header>
  );
}

export default PageHeader;
