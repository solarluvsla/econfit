const copy = {
  title: "\uD568\uAED8 \uBC30\uC6B0\uB294 \uAE08\uC735 \uCEE4\uBBA4\uB2C8\uD2F0",
  description:
    "\uC2E4\uC2DC\uAC04 \uC9C8\uBB38, \uD22C\uC790 \uD6C4\uAE30, \uC624\uB298\uC758 \uACBD\uC81C \uC774\uC288\uB97C \uD55C \uD654\uBA74\uC5D0\uC11C \uBAA8\uC544\uBCF4\uB294 \uC784\uC2DC \uD0ED\uC785\uB2C8\uB2E4.",
  topicTitle: "\uC778\uAE30 \uD1A0\uD53D",
  topicMeta: "\uC784\uC2DC \uCF58\uD150\uCE20",
  topics: [
    "#\uCD08\uBCF4\uC7AC\uD14C\uD06C",
    "#\uC624\uB298\uC758\uB274\uC2A4",
    "#\uC608\uC801\uAE08\uBE44\uAD50",
    "#\uC8FC\uB9B0\uC774\uC9C8\uBB38",
  ],
  posts: [
    {
      title: "\uC624\uB298 KOSPI \uBC18\uB4F1, \uC9C0\uAE08 \uB4E4\uC5B4\uAC00\uB3C4 \uB420\uAE4C\uC694?",
      body: "\uC2DC\uC7A5 \uD750\uB984\uC744 \uC27D\uAC8C \uC815\uB9AC\uD55C \uC694\uC57D\uACFC \uB313\uAE00 \uD1A0\uB860 \uC601\uC5ED\uC774 \uB4E4\uC5B4\uC62C \uC790\uB9AC\uC785\uB2C8\uB2E4.",
    },
    {
      title: "\uC801\uAE08 \uB9CC\uAE30\uAE08 \uC5B4\uB514\uC5D0 \uAD74\uB9AC\uB294 \uAC8C \uC88B\uC744\uAE4C\uC694?",
      body: "\uC9C8\uBB38 \uCE74\uB4DC, \uB2F5\uBCC0 \uC218, \uC88B\uC544\uC694 \uC218 \uAC19\uC740 \uCEE4\uBBA4\uB2C8\uD2F0 \uBA54\uD0C0 \uC815\uBCF4\uB97C \uBD99\uC77C \uC218 \uC788\uC5B4\uC694.",
    },
  ],
}

export default function CommunityPage() {
  return (
    <div className="page-screen community-screen">
      <header className="community-screen-hero">
        <span className="community-screen-badge">COMMUNITY</span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </header>

      <section className="community-screen-card">
        <div className="community-screen-card-head">
          <strong>{copy.topicTitle}</strong>
          <span>{copy.topicMeta}</span>
        </div>
        <div className="community-screen-chip-list">
          {copy.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>

      <section className="community-screen-list">
        {copy.posts.map((post) => (
          <article key={post.title} className="community-screen-post">
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
