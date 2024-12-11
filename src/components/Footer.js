function Footer({ children }) {
    return (
        <div className="p-2 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ position: 'fixed', bottom: 0, width: "100%", paddingTop: '1rem' }} >
            {children}
        </div>
    );
}

export default Footer;