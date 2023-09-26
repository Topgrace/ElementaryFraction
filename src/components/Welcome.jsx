import Sammy from "../img/sammy.jpeg"


export default function Welcome() {
  return (
  <>
  <div className="wrapper">
  <h1>초등 분수</h1>
  <h2>개념<small>이</small> 먼저<small>다</small>!</h2>
  <img src={Sammy} alt="Sammy Image" width={200} height={200} />
  </div>
  </>
  );
  }