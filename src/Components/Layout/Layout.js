import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MatrixBackground from '../MatrixBackground/Matrix';

function Layout({ children }) {
  return (
    <>
      <MatrixBackground />
      <Navbar />
      <main style={{
        position: 'relative',
        zIndex: 1,
        minHeight: 'calc(100vh - var(--nav-height))',
        paddingTop: 'var(--nav-height)',
      }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
