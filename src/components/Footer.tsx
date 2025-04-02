function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 SolveIt. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a> | 
          <a href="/terms-of-service" className="text-blue-400 hover:underline"> Terms of Service</a>
        </p>
        <p>
          Follow us on 
          <a href="https://twitter.com/solveit" className="text-blue-400 hover:underline ml-1">Twitter</a>, 
          <a href="https://facebook.com/solveit" className="text-blue-400 hover:underline ml-1">Facebook</a>, and 
          <a href="https://linkedin.com/solveit" className="text-blue-400 hover:underline ml-1">LinkedIn</a>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;