import Welcome from "../components/Welcome";
import HeaderLogged from "../components/HeaderLogged";

export default function Home() {
  return (
    <div>
      <HeaderLogged />
      <Welcome />
    </div>
  );
}