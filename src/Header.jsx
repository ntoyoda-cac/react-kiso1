import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">掲示板</h1>
        <h3 className="header-link">
          <Link to="/threads/new">スレッドをたてる</Link>
        </h3>
      </div>
    </header>
  )
}

export default Header
