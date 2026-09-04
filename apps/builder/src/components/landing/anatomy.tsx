const rows = [
  {
    tag: "HOMEPAGE",
    title: "Hero & mission",
    body: (
      <>
        A homepage that opens with who you are and what you do — not a stock
        photo and a &ldquo;Welcome to our website.&rdquo;{" "}
        <span className="example">&ldquo;Building stronger communities, together&rdquo;</span>{" "}
        is a real example from a template, not a placeholder you have to replace.
      </>
    ),
  },
  {
    tag: "PROGRAMS",
    title: "What you do",
    body: (
      <>
        A structured grid for your programs and services, so funders and
        volunteers can see the shape of your work at a glance, not buried in a
        paragraph.
      </>
    ),
  },
  {
    tag: "IMPACT",
    title: "Results, in numbers",
    body: (
      <>
        Stats blocks built for outcomes —{" "}
        <span className="example">communities served</span>,{" "}
        <span className="example">wells built</span>,{" "}
        <span className="example">scholarships awarded</span> — the kind of
        specificity that makes a funder trust a report.
      </>
    ),
  },
  {
    tag: "DONATE",
    title: "Give, on-site",
    body: (
      <>
        One-time and recurring donations, processed on your own site — never a
        redirect to a third-party page that makes a donor second-guess
        themselves.
      </>
    ),
  },
  {
    tag: "GET INVOLVED",
    title: "Volunteers & events",
    body: (
      <>
        A structured volunteer signup and an events calendar, so
        &ldquo;get involved&rdquo; is an actual form, not a WhatsApp number lost
        in your bio.
      </>
    ),
  },
];

export function AnatomySection() {
  return (
    <section className="anatomy" id="anatomy">
      <div className="wrap">
        <span className="section-label">What you get</span>
        <h2>Every page an organization actually needs, built in.</h2>
        <p className="anatomy-intro">
          Instead of a blank canvas, OrgSites starts you with the structure your
          site already needs — you fill in what&rsquo;s there rather than invent it
          from scratch.
        </p>

        <div className="anatomy-rows">
          {rows.map((row) => (
            <div key={row.tag} className="anatomy-row">
              <div className="anatomy-row-label">
                <div className="tag">{row.tag}</div>
                <h3>{row.title}</h3>
              </div>
              <div className="anatomy-row-content">
                <p>{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}