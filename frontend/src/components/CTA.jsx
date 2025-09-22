export default function CTA({ source, info, link, download, onClick }) {
  const Inner = (
    <>
      <div className="picto__container">{source}</div>
      <div className="infos__container">{info}</div>
    </>
  );

  // Cas avec callback (modale)
  if (typeof onClick === "function") {
    return (
      <div
        className="cta__container"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        {Inner}
      </div>
    );
  }

  // Cas avec lien
  return (
    <div className="cta__container">
      <a 
        href={link} {...(download ? { download } : {})} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {Inner}
      </a>
    </div>
  );
}
