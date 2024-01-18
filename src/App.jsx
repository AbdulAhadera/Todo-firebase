
import Navbar from './Navbar.jsx';
import Router from './Router.jsx'
import { BrowserRouter } from 'react-router-dom';
const App = () => {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div>
          <Router />
        </div>
      </>
    </BrowserRouter>
  );
};
export default App