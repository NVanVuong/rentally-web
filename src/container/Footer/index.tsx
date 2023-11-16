const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div className="mt-8 flex w-full items-center justify-start border-t border-gray-200 bg-gray-50 px-28 py-6 text-sm text-gray-700">
            © {currentYear} Rentally, Inc
        </div>
    )
}

export default Footer
