"use client";

import { useMemo, useState } from "react";

type Project = {
  id: number;
  field: string;
  accent: string;
  title: string;
  summary: string;
  lead: string;
  affiliation: string;
  location: string;
  roles: string[];
  applicants: number;
  deadline: string;
  commitment: string;
  progress?: number;
};

const projects: Project[] = [
  {
    id: 1,
    field: "Neuroimaging",
    accent: "violet",
    title: "Mapping cerebrovascular burden in South Asian aging",
    summary: "Build a reproducible MRI marker pipeline and test associations with cognition using a harmonized, de-identified cohort.",
    lead: "Dr. Farzana Rahman",
    affiliation: "University of Toronto",
    location: "Toronto · Dhaka",
    roles: ["Imaging analyst", "Biostatistician", "Literature lead"],
    applicants: 11,
    deadline: "Closes Aug 24",
    commitment: "6–8 hrs/week",
    progress: 68,
  },
  {
    id: 2,
    field: "Computational Genomics",
    accent: "green",
    title: "Rare variant signals in early-onset dementia",
    summary: "Reanalyze an open sequencing dataset and create a Bangladesh-ready workflow for future locally collected samples.",
    lead: "Prof. Adnan Karim",
    affiliation: "University College London",
    location: "London · Chattogram",
    roles: ["Python analyst", "Genetics trainee", "Scientific writer"],
    applicants: 7,
    deadline: "Closes Aug 29",
    commitment: "5–7 hrs/week",
    progress: 42,
  },
  {
    id: 3,
    field: "Public Health",
    accent: "orange",
    title: "Sleep, stress, and cognitive health in university students",
    summary: "Develop a preregistered analysis and conference-ready abstract from a multi-campus behavioral health dataset.",
    lead: "Dr. Nusrat Jahan",
    affiliation: "BRAC University",
    location: "Dhaka",
    roles: ["R analyst", "Methods reviewer", "Visualization lead"],
    applicants: 16,
    deadline: "Closes Sep 02",
    commitment: "4–6 hrs/week",
    progress: 31,
  },
];

const navItems = [
  ["home", "Home", "⌂"],
  ["projects", "Projects", "◇"],
  ["people", "People", "◎"],
  ["library", "Library", "▤"],
  ["events", "Events", "◫"],
  ["data", "Data access", "⌁"],
  ["compute", "Compute", "▦"],
];

const people = [
  { initials: "FR", name: "Dr. Farzana Rahman", role: "Neuroimaging PI", place: "Toronto, Canada", skills: "MRI · Vascular aging · Mentoring", rating: "4.9", projects: 8 },
  { initials: "AK", name: "Prof. Adnan Karim", role: "Computational Geneticist", place: "London, UK", skills: "Genomics · Python · Rare variants", rating: "4.8", projects: 6 },
  { initials: "NJ", name: "Dr. Nusrat Jahan", role: "Public Health Researcher", place: "Dhaka, Bangladesh", skills: "Epidemiology · R · Student health", rating: "4.9", projects: 5 },
  { initials: "SM", name: "Samiul Morshed", role: "PhD Candidate", place: "Boston, USA", skills: "Machine learning · Imaging · Reproducibility", rating: "4.7", projects: 4 },
];

const libraryItems = [
  { type: "Continuation Pack", title: "Normative brain-volume curves for Bangladeshi adults", meta: "Updated 8 days ago · 14 artifacts", tag: "Neuroimaging" },
  { type: "Field Brief", title: "Dementia biomarkers: a 2026 evidence map", meta: "Living review · 47 key papers", tag: "Biomarkers" },
  { type: "Reproducible Workflow", title: "From DICOM to quality-controlled morphometry", meta: "Version 2.1 · Python + container", tag: "Methods" },
  { type: "Null Result", title: "Education-adjusted cognitive reserve model", meta: "Closed Term 1 · Data and code archived", tag: "Cognition" },
];

export default function Home() {
  const [active, setActive] = useState("home");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All fields");
  const [applied, setApplied] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([2]);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => projects.filter((project) => {
    const matchesField = filter === "All fields" || project.field === filter;
    const haystack = `${project.title} ${project.summary} ${project.roles.join(" ")}`.toLowerCase();
    return matchesField && haystack.includes(query.toLowerCase());
  }), [query, filter]);

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function apply(project: Project) {
    if (!applied.includes(project.id)) {
      setApplied([...applied, project.id]);
      flash(`Application started for “${project.title}”`);
    }
  }

  function toggleSaved(id: number) {
    setSaved(saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]);
  }

  const title = active === "home" ? "Good morning, Rafi" : navItems.find(([key]) => key === active)?.[1] || "BAIRE";

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setActive("home")} aria-label="BAIRE home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span><strong>BAIRE</strong><small>Research Commons</small></span>
        </button>

        <nav aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map(([key, label, icon]) => (
            <button key={key} className={active === key ? "nav-item active" : "nav-item"} onClick={() => setActive(key)}>
              <span>{icon}</span>{label}
              {key === "projects" && <em>12</em>}
            </button>
          ))}
        </nav>

        <div className="term-card">
          <div className="term-top"><span>Term 2 · 2026</span><strong>Week 7/16</strong></div>
          <div className="term-track"><i /></div>
          <p>Research Forum in 63 days</p>
        </div>

        <button className="profile-mini" onClick={() => flash("Profile opened") }>
          <span className="avatar">RH</span>
          <span><strong>Rafi Hasan</strong><small>Contributor · Dhaka</small></span>
          <b>•••</b>
        </button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Bangladesh ↔ Global research network</p>
            <h1>{title}</h1>
          </div>
          <div className="top-actions">
            <label className="global-search">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people, projects, topics…" aria-label="Search" />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button" onClick={() => flash("No new notifications")} aria-label="Notifications">♢<i /></button>
            <button className="primary-button" onClick={() => flash("Project proposal workspace opened")}>+ Propose a project</button>
          </div>
        </header>

        {active === "home" && (
          <div className="page-grid">
            <section className="main-column">
              <div className="mission-banner">
                <div>
                  <span className="pill light">TERM 2 IS LIVE</span>
                  <h2>Research without borders.<br />Progress without restarting.</h2>
                  <p>Join Bangladesh’s next generation of researchers and diaspora mentors to answer important questions—one focused project at a time.</p>
                  <div className="banner-actions">
                    <button onClick={() => setActive("projects")}>Explore open projects <span>→</span></button>
                    <button className="text-button" onClick={() => flash("Mission overview opened")}>See how BAIRE works</button>
                  </div>
                </div>
                <div className="network-orbit" aria-hidden="true">
                  <span className="orbit o1" /><span className="orbit o2" /><span className="orbit o3" />
                  <span className="node n1">Dhaka</span><span className="node n2">Boston</span><span className="node n3">London</span><span className="node n4">Toronto</span>
                  <b>BAIRE<small>commons</small></b>
                </div>
              </div>

              <div className="section-heading">
                <div><p className="eyebrow">Matched to your profile</p><h2>Projects looking for you</h2></div>
                <button onClick={() => setActive("projects")}>View all 12 <span>→</span></button>
              </div>

              <div className="project-list">
                {projects.slice(0, 2).map((project) => (
                  <ProjectCard key={project.id} project={project} applied={applied.includes(project.id)} saved={saved.includes(project.id)} onApply={() => apply(project)} onSave={() => toggleSaved(project.id)} />
                ))}
              </div>

              <div className="continuity-strip">
                <span className="continuity-icon">↗</span>
                <div><p className="eyebrow">The BAIRE difference</p><h3>Every project leaves the next team further ahead.</h3><p>Protocols, code, figures, null results, lessons, and next questions become a versioned Continuation Pack.</p></div>
                <button onClick={() => setActive("library")}>Explore the library</button>
              </div>
            </section>

            <aside className="right-column">
              <div className="panel profile-strength">
                <div className="panel-title"><h3>Your research profile</h3><button onClick={() => setActive("people")}>Edit</button></div>
                <div className="strength-row"><div className="score-ring">82<small>%</small></div><div><strong>Strong profile</strong><p>Add one methods badge to stand out.</p></div></div>
                <button className="outline-button" onClick={() => flash("Training catalog opened")}>Earn a methods badge <span>→</span></button>
              </div>

              <div className="panel">
                <div className="panel-title"><h3>My active project</h3><button onClick={() => setActive("projects")}>Open</button></div>
                <span className="status-chip">ON TRACK</span>
                <h4>White matter signals and vascular risk</h4>
                <div className="milestone"><span><b>Milestone 4 of 8</b><em>57%</em></span><div><i /></div></div>
                <div className="deadline-row"><span className="date-box"><b>21</b><small>AUG</small></span><div><p>Next deliverable</p><strong>Preliminary figures + QC note</strong></div></div>
                <button className="dark-button" onClick={() => flash("Project workspace opened")}>Go to workspace <span>→</span></button>
              </div>

              <div className="panel">
                <div className="panel-title"><h3>Coming up</h3><button onClick={() => setActive("events")}>All events</button></div>
                <Event date="19" month="AUG" title="Guest lecture: Building cohorts that last" meta="Prof. Mina Hossain · 8:00 PM BST" color="violet" />
                <Event date="25" month="AUG" title="Methods clinic: Reproducible MRI" meta="Open office hour · 7:30 PM BST" color="green" />
                <Event date="04" month="SEP" title="Term 2 midpoint review" meta="For all active project teams" color="orange" />
              </div>
            </aside>
          </div>
        )}

        {active === "projects" && (
          <section className="content-page">
            <div className="page-intro"><div><p className="eyebrow">Term 2 · Applications open</p><h2>Find your next research team</h2><p>Four-month computational projects with clear roles, real mentorship, and work you can show.</p></div><div className="stat-pair"><span><b>12</b> open projects</span><span><b>37</b> roles available</span></div></div>
            <div className="filter-row">
              {["All fields", "Neuroimaging", "Computational Genomics", "Public Health"].map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
            <div className="project-grid">
              {filtered.map((project) => <ProjectCard key={project.id} project={project} applied={applied.includes(project.id)} saved={saved.includes(project.id)} onApply={() => apply(project)} onSave={() => toggleSaved(project.id)} />)}
            </div>
          </section>
        )}

        {active === "people" && (
          <section className="content-page">
            <div className="page-intro"><div><p className="eyebrow">People network</p><h2>Meet collaborators across borders</h2><p>Verified researchers, mentors, specialists, and emerging talent connected by shared interests.</p></div><button className="primary-button" onClick={() => flash("Your profile is ready to edit")}>Complete my profile</button></div>
            <div className="people-grid">{people.map((person) => <article className="person-card" key={person.name}><span className="large-avatar">{person.initials}</span><span className="verified">✓</span><h3>{person.name}</h3><p>{person.role}</p><small>{person.place}</small><div className="skill-line">{person.skills}</div><footer><span>★ {person.rating}</span><span>{person.projects} projects</span></footer><button onClick={() => flash(`Viewing ${person.name}`)}>View profile</button></article>)}</div>
          </section>
        )}

        {active === "library" && (
          <section className="content-page">
            <div className="page-intro"><div><p className="eyebrow">Research Continuity Library</p><h2>Start where the last team finished</h2><p>Searchable, versioned knowledge from every completed BAIRE project—including what did not work.</p></div><div className="library-count"><b>126</b><span>reusable research assets</span></div></div>
            <div className="library-grid">{libraryItems.map((item, index) => <article className="library-card" key={item.title}><div className={`doc-cover cover-${index + 1}`}><span>BAIRE / {item.type}</span><b>{String(index + 1).padStart(2, "0")}</b></div><div><span className="tag">{item.tag}</span><p>{item.type}</p><h3>{item.title}</h3><small>{item.meta}</small><button onClick={() => flash(`Opening “${item.title}”`)}>Open record <span>→</span></button></div></article>)}</div>
          </section>
        )}

        {active === "events" && <SimplePage eyebrow="Learning & community" title="Three terms. One shared stage." text="Workshops, guest lectures, methods clinics, and the BAIRE Research Forum keep every project connected to a wider learning community." cards={["Guest lecture · Building cohorts that last", "Methods clinic · Reproducible MRI", "Term 2 midpoint review", "BAIRE Research Forum · November 2026"]} onOpen={flash} />}
        {active === "data" && <SimplePage eyebrow="Governed research data" title="Discover data. Request responsibly." text="Browse dataset descriptions and feasibility counts, then submit a project-linked request for the minimum data you need. Membership never means automatic access." cards={["Bangladesh Healthy Aging Pilot", "Neuroimaging Quality Registry", "Cognitive & Lifestyle Measures", "Open international reference datasets"]} onOpen={flash} />}
        {active === "compute" && <SimplePage eyebrow="BAIRE Computational Core" title="Power for questions that matter." text="Approved projects receive transparent CPU, GPU, and storage allocations with reproducible environments and fair-share scheduling." cards={["My allocation · 840 GPU-hours remaining", "Active jobs · 3 running, 1 queued", "Environments · MRI, genomics, statistics", "Request additional project compute"]} onOpen={flash} />}
      </section>

      {notice && <div className="toast" role="status"><span>✓</span>{notice}</div>}
    </main>
  );
}

function ProjectCard({ project, applied, saved, onApply, onSave }: { project: Project; applied: boolean; saved: boolean; onApply: () => void; onSave: () => void }) {
  return (
    <article className="project-card">
      <div className="project-top"><span className={`field-dot ${project.accent}`} /><span className="field-name">{project.field}</span><button onClick={onSave} aria-label={saved ? "Remove bookmark" : "Save project"}>{saved ? "◆" : "◇"}</button></div>
      <h3>{project.title}</h3><p>{project.summary}</p>
      <div className="lead-row"><span className="avatar small">{project.lead.split(" ").slice(-2).map((part) => part[0]).join("")}</span><div><strong>{project.lead}</strong><small>{project.affiliation} · {project.location}</small></div></div>
      <div className="role-wrap">{project.roles.map((role) => <span key={role}>{role}</span>)}</div>
      <footer><div><span>◷ {project.commitment}</span><span>◎ {project.applicants} applicants</span></div><button className={applied ? "applied" : ""} onClick={onApply}>{applied ? "Application started ✓" : "View & apply →"}</button></footer>
    </article>
  );
}

function Event({ date, month, title, meta, color }: { date: string; month: string; title: string; meta: string; color: string }) {
  return <div className="event-row"><span className={`event-date ${color}`}><b>{date}</b><small>{month}</small></span><div><strong>{title}</strong><p>{meta}</p></div></div>;
}

function SimplePage({ eyebrow, title, text, cards, onOpen }: { eyebrow: string; title: string; text: string; cards: string[]; onOpen: (message: string) => void }) {
  return <section className="content-page"><div className="page-intro"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div></div><div className="simple-grid">{cards.map((card, index) => <button key={card} onClick={() => onOpen(`${card} opened`)}><span>{String(index + 1).padStart(2, "0")}</span><h3>{card}</h3><p>Open details, requirements, activity, and next actions.</p><b>Explore →</b></button>)}</div></section>;
}
