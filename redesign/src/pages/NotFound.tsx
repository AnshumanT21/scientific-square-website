import { Link } from 'react-router-dom';
import Page from '../components/Page';

export default function NotFound() {
  return (
    <Page className="grid min-h-[80vh] place-items-center bg-ink px-5 pt-24 text-center">
      <div>
        <p className="font-mono text-sm tracking-[0.2em] text-gold">ERROR 404 · NO SIGNAL</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">Sample not found.</h1>
        <p className="mt-4 text-white/60">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link to="/" className="btn btn-gold mt-10">
          Back to home
        </Link>
      </div>
    </Page>
  );
}
