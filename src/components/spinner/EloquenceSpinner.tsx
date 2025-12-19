import "./loader.css";
export default function EloquenceCircleLoader() {
  const letters = "ELOQUENCE".split("");

  return (
    <div className="loader">
      {letters.map((letter, i) => (
        <span key={i} style={{ transform: `rotate(${i * 36}deg)` }}>
          {letter}
        </span>
      ))}
    </div>
  );
}
