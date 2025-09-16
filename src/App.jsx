import "./index.css";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
    // const [count, setCount] = useState(0);

    return (
        <>
            <div className="App">
                <h1 className="text-3xl font-bold underline text-center">
                    Hello world!
                </h1>
                <h2 className="text-2xl font-bold underline text-center">
                    Edit <code>src/App.jsx</code> and save to test HMR Edit{" "}
                    <code>src/App.jsx</code> and save to test HMR
                </h2>
                <p className="text-2xl font-black text-center text-blue-600">
                    Vẫn phải có một file css mới đc :))
                </p>
                <div className="card">
                    {/* <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button> */}
                </div>
                <p className="read-the-docs text-center">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </>
    );
}

export default App;
