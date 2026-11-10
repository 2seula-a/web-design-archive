export default function Contact() {
  return (
    <section className="content-page page-enter">
      <p className="eyebrow">GET IN TOUCH</p>
      <h1>
        Let’s make something
        <br />
        thoughtful together.
      </h1>
      <div className="contact-list">
        <div>
          <span>Email</span>
          <p>
            <a href="mailto:본인이메일주소">seula2025@gmail.com</a>
          </p>
        </div>

        <div>
          <span>GitHub</span>
          <p>
            <a
              href="https://github.com/2seula-a"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/2seula-a
            </a>
          </p>
        </div>

        <div>
          <span>이력서</span>
          <p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              추후 업로드예정
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
