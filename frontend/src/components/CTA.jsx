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
      <button
        type="button"
        className="cta__container"
        onClick={onClick}
      >
        {Inner}
      </button>
    );
  }

  // Cas avec lien
  return (
    <a
      href={link}
      {...(download ? { download } : {})}
      target="_blank"
      rel="noopener noreferrer"
      className="cta__container"
    >
      {Inner}
    </a>
  );
}
