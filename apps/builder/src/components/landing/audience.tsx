const audience = [
  {
    tag: "NGOs",
    title: "Grassroots & community organizations",
    body: "Small teams, often volunteer-run, who need a credible site up before a grant deadline — not a design project.",
  },
  {
    tag: "FAITH-BASED",
    title: "Churches & ministries",
    body: "Sermon archives, event calendars, and giving — built for a congregation that mostly browses on a phone.",
  },
  {
    tag: "EDUCATION",
    title: "Schools & scholarship programs",
    body: "Admissions information, programs, and a donor and alumni giving page that doesn't look like an afterthought.",
  },
  {
    tag: "FOUNDATIONS",
    title: "Community & grant-making foundations",
    body: "Transparency pages, board and team profiles, and impact reporting built for the scrutiny funders bring.",
  },
];

export function AudienceSection() {
  return (
    <section className="section wrap" id="audience">
      <span className="section-label">Who it&rsquo;s for</span>
      <h2>Built around how your organization actually works.</h2>
      <div className="audience">
        {audience.map((item) => (
          <div key={item.tag} className="audience-item">
            <div className="tag">{item.tag}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}