import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full bg-gray-50 border-t border-gray-200 text-gray-600">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-300/30 pb-10">
        {/* Logo + description */}
        <div className="md:max-w-sm">
          <img src={assets.logo} alt="logo" className="w-36 sm:w-44" />
          <p className="mt-6 text-sm leading-relaxed">
            QuickAI Tool Manager helps you manage, create, and optimize all your AI tools in one place.
            From text generation to image editing, streamline your AI workflow with ease.
          </p>
        </div>

        {/* Links + Newsletter */}
        <div className="flex-1 flex flex-wrap md:flex-nowrap items-start md:justify-end gap-12">
          {/* Product Links */}
          <div>
            <h2 className="font-semibold mb-5 text-gray-900">Product</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-primary">AI Tools</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
              <li><a href="#" className="hover:text-primary">Community</a></li>
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h2 className="font-semibold mb-5 text-gray-900">Resources</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
              <li><a href="#" className="hover:text-primary">Support</a></li>
              <li><a href="#" className="hover:text-primary">Terms & Privacy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1 min-w-[220px]">
            <h2 className="font-semibold text-gray-900 mb-5">Stay Updated</h2>
            <p className="text-sm">
              Get the latest AI insights, new features, and updates directly in your inbox.
            </p>
            <div className="flex items-center gap-2 pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-400/40 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full h-10 rounded px-3 text-sm"
              />
              <button className="bg-primary px-4 h-10 text-white rounded text-sm font-medium hover:bg-primary/90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="pt-6 pb-8 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-gray-500">
        <p>© {new Date().getFullYear()} QuickAI Tool Manager. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-primary">Twitter</a>
          <a href="#" className="hover:text-primary">LinkedIn</a>
          <a href="#" className="hover:text-primary">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
