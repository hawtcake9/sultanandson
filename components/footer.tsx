export function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-16 sm:py-20">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">S&S</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Sultan and Sons</span>
            </div>
            <p className="text-sm text-gray-700">Advanced solar inverter systems for modern energy independence.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Product</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="/products" className="hover:text-gray-900 transition-colors">
                  Products
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Company</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-900 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/resources" className="hover:text-gray-900 transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="/" className="hover:text-gray-900 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-900 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-900 transition-colors">
                  Warranty
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">
          <p>&copy; 2025 Sultan and Sons. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="https://www.tiktok.com/@sultanandsonsengineering?_r=1&_t=ZS-93JIggCXJiS" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
              TikTok
            </a>
            <a href="https://www.facebook.com/share/1AcA4EJkVm/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
              Facebook
            </a>
            <a href="https://www.instagram.com/sultanandsonsengineering?igsh=eHRkaTgwdDdudWdx" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
