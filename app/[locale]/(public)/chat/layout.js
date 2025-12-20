// app/layout.js
export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl">
        <body className="h-screen m-0 p-0 bg-gray-100">
        {children}
        </body>
        </html>
    );
}