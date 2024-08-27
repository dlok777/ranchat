
export default function Footer() {
  return (
    <footer className="text-gray-700 body-font">
        <div className="bg-gray-200">
          <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2024 Team PTGIM —
              <a href="https://github.com/orgs/PTGym/dashboard" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">PTgim</a>
            </p>
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
              © 2024 Team PTGIM —
              <a href="https://github.com/orgs/PTGym/dashboard" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">PTgim</a>
              
            </span>
          </div>
          <div className="container mx-auto pb-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
              Developed by Team PTGIM
            </span>
          </div>
        </div>
      </footer>
  )
}