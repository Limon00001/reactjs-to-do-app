const Navbar = () => {
    return (
        <nav className="py-6 md:py-8 md:px-[5rem] fixed top-0 w-full !bg-[#191D26] z-50">
            <div className="container mx-auto flex flex-col justify-between gap-x-6">
                {/* <!-- Logo --> */}
                {/* <img className="h-[45px]" src="./assets/lws-logo-en.svg" alt="Lws" /> */}
                <p className="text-xl">Task </p>
                <p className="text-[#F5BF42] text-2xl font-bold">Application</p>
                {/* <!-- Logo Ends --> */}
            </div>
        </nav>
    )
}

export default Navbar