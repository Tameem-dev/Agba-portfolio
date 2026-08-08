import { useEffect, useMemo, useRef, useState } from 'react';
import { FiCode } from 'react-icons/fi';
import styles from './Playground.module.css';

const DEFAULT_HTML = `<div class="card">
  <h1>Hello, I'm Agba Dev 👋</h1>
  <p>Edit any tab — this preview updates live.</p>
  <button id="btn">Click me</button>
</div>`;

const DEFAULT_CSS = `body {
  font-family: system-ui, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  background: #08090b;
  color: #eef0f2;
}
.card {
  text-align: center;
  padding: 2rem;
}
button {
  margin-top: 1rem;
  padding: 0.7rem 1.4rem;
  border-radius: 100px;
  border: none;
  background: linear-gradient(120deg, #3b82f6, #17e9a6);
  color: #08090b;
  font-weight: 600;
  cursor: pointer;
}`;

const DEFAULT_JS = `document.getElementById('btn').addEventListener('click', () => {
  document.querySelector('h1').textContent = 'You clicked it 🎉';
});`;

const TABS = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'js', label: 'JS' },
];

export default function Playground() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [activeTab, setActiveTab] = useState('html');
  const [srcDoc, setSrcDoc] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head><style>${css}</style></head>
          <body>
            ${html}
            <script>
              try { ${js} } catch (e) { console.error(e); }
            </script>
          </body>
        </html>
      `);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [html, css, js]);

  const values = useMemo(() => ({ html, css, js }), [html, css, js]);
  const setters = { html: setHtml, css: setCss, js: setJs };

  return (
    <main className={styles.page}>
      <div className="container">
        <p className="eyebrow"><FiCode /> Playground</p>
        <h1 className={styles.title}>Try it live</h1>
        <p className={styles.sub}>
          A small HTML/CSS/JS sandbox — edit any tab, the preview updates as you type.
        </p>

        <div className={styles.workspace}>
          <div className={styles.editorPane}>
            <div className={styles.tabs}>
              {TABS.map((t) => (
                <button
                  key={t.key}
                  className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(t.key)}
                  data-cursor="hover"
                >
                  {t.label}
                </button>
              ))}
            </div>
            <textarea
              className={styles.editor}
              spellCheck={false}
              value={values[activeTab]}
              onChange={(e) => setters[activeTab](e.target.value)}
            />
          </div>

          <div className={styles.previewPane}>
            <div className={styles.previewBar}>Live preview</div>
            <iframe
              title="playground-preview"
              className={styles.iframe}
              sandbox="allow-scripts"
              srcDoc={srcDoc}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
