import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        {/* Logo + description */}
        <div className="md:max-w-96">
         <img src= {assets.logo} alt="logo" className='w-32 sm:w-44 '/>
          <p className="mt-6 text-sm">
            Quick AI helps you create, enhance, and optimize your content with
            powerful AI-driven tools. Whether it’s text, images, or workflows,
            we make AI simple and accessible for everyone.
          </p>
        </div>

        {/* Links + Newsletter */}
        <div className="flex-1 flex items-start md:justify-end gap-20">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
            <div className="text-sm space-y-2">
              <p>The latest AI news, tips, and resources, sent to your inbox weekly.</p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                />
                <button className="bg-primary w-24 h-9 text-white rounded cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2024 © QuickAI.All Right Reserved.
      </p>
    </footer>
  );
}
