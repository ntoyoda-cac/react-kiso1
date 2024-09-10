import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>掲示板</h1>
        <h3 style={{ textAlign: 'right', textDecoration: 'underline' }}>
          <Link to="/threads/new" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            新規スレッドをたてる
          </Link>
        </h3>
      </div>
    </header>
  )
}

export default Header
