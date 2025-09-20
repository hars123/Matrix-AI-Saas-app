import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 px-6 py-8">
      {/* Top: Logo + Links */}
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="text-center">
          <img src={assets.logo} alt="QuickAI Logo" className="w-32 sm:w-40 mx-auto" />
          <p className="mt-4 text-sm leading-relaxed max-w-md mx-auto">
            QuickAI Tool Manager helps you manage, create, and optimize all your AI tools in one place.
          </p>
        </div>

        {/* Links */}
       
      </div>

      {/* Bottom: Social + Copyright */}
      <div className="mt-8 flex flex-col items-center text-sm text-gray-500">
        <p className="text-center">© {new Date().getFullYear()} QuickAI Tool Manager. All rights reserved.</p>
        <div className="flex gap-4 mt-2 justify-center">
          <a href="https://github.com/hars123" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>
          <a href="https://www.linkedin.com/in/harshit1231/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
