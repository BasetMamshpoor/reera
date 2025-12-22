// app/layout.js
export default function RootLayout({ children }) {
    return (
        <html dir="rtl">
        <body className="h-screen m-0 p-0 bg-surface">
        {children}
        </body>
        </html>
    );
}