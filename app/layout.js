import "./style/globals.css";

export default function RootLayout({ children }) {
  return (
    <html  lang="th">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
