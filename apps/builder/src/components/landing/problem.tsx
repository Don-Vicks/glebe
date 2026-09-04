const ProblemIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="9" stroke="#B98A2E" strokeWidth="1.6" />
    <path d="M11 6.5V11.5L14 13.5" stroke="#B98A2E" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const problems = [
  {
    title: "No time to design a site structure.",
    body: "Most organizations don't have a developer, or the hours to figure out what pages they even need.",
  },
  {
    title: "Donations redirect off-site, or don't work at all.",
    body: "Local payment methods are often missing entirely, and third-party donate buttons undermine trust right when it matters most.",
  },
  {
    title: "No way to show real impact.",
    body: "Funders want to see outcomes and transparency — most organizations have no structured way to present either.",
  },
];

export function ProblemSection() {
  return (
    <section className="section wrap">
      <div className="split">
        <div>
          <span className="section-label">The problem</span>
          <h2>Generic builders make you design a website from nothing.</h2>
        </div>
        <div className="section-body">
          <p>
            Wix, Squarespace, and WordPress treat a nonprofit the same as an
            online store or a portfolio — a blank canvas, and it&rsquo;s on you to
            figure out what pages an organization needs, how a donation flow
            should work, and how to make any of it look credible to a funder.
          </p>
          <div className="problem-list">
            {problems.map((problem) => (
              <div key={problem.title} className="problem-item">
                <ProblemIcon />
                <div>
                  <strong>{problem.title}</strong>
                  <p>{problem.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}