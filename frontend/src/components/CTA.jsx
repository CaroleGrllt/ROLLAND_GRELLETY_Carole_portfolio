
export default function CTA({ source, info, link, download}) {
    return (
        <div className="cta__container">
            <a href={link} {...(download ? { download } : {})}>
                <div className="picto__container">
                    {source}
                </div>
                <div className="infos__container">
                    {info}
                </div>
            </a>
        </div>
    )
}