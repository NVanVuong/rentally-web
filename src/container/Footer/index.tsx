const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div className="flex w-full items-center justify-start border-t border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-700 sm:px-6 md:px-10 xl:px-28">
            <span>© {currentYear} Rentally, Inc</span>
        </div>
    )
}

export default Footer
