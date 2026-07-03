export default function Marquee() {
  const items = ['Editorial', 'Avant-Garde', 'Street Couture', 'Indian Heritage', 'Gen-Z Aesthetic', 'Creative Direction', 'Storytelling', 'Fashion Design'];
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        <div className="marquee-content">
          {doubled.map((item, i) => (
            <span key={i}>
              {item}
              <span className="dot-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
